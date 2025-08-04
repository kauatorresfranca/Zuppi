import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

const getCookie = (name: string): string | null => {
  const cookieString = document.cookie;
  console.debug(`Conteúdo de document.cookie: "${cookieString}"`);
  if (!cookieString) {
    console.warn("Nenhum cookie encontrado no navegador");
    return null;
  }
  const cookies = cookieString.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName?.trim() === name) {
      const value = cookieValue ? decodeURIComponent(cookieValue) : null;
      console.debug(`Cookie ${name} encontrado: ${value}`);
      return value;
    }
  }
  console.warn(`Cookie ${name} não encontrado`);
  return null;
};

api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie("csrftoken");
    if (
      csrfToken &&
      ["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")
    ) {
      console.debug(`Adicionando X-CSRFToken: ${csrfToken} para ${config.method} ${config.url}`);
      config.headers["X-CSRFToken"] = csrfToken;
    } else if (!csrfToken) {
      console.warn("Nenhum CSRF token disponível para a requisição");
    }
    return config;
  },
  (error) => {
    console.error("Erro no interceptor de requisição:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isCsrfError =
      error.response?.status === 403 &&
      (error.response?.data?.detail?.includes("CSRF") ||
       error.response?.data?.error?.includes("CSRF") ||
       (typeof error.response?.data === "string" && error.response.data.includes("CSRF verification failed")));
    
    if (isCsrfError && !originalRequest._retry) {
      console.warn("Erro 403 CSRF detectado, tentando obter novo token");
      originalRequest._retry = true;
      try {
        const response = await api.get("/get_csrf_token/", { withCredentials: true });
        console.debug("Novo token CSRF obtido:", response.data.csrfToken);
        const csrfToken = getCookie("csrftoken") || response.data.csrfToken;
        if (csrfToken) {
          console.debug(`Novo CSRF token obtido: ${csrfToken}`);
          originalRequest.headers["X-CSRFToken"] = csrfToken;
        } else {
          console.error("Falha ao obter novo CSRF token");
          return Promise.reject(new Error("Não foi possível obter o token CSRF"));
        }
        return api(originalRequest);
      } catch (csrfError) {
        console.error("Falha ao obter novo CSRF token:", csrfError);
        return Promise.reject(csrfError);
      }
    }
    console.error("Erro na requisição:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { api };