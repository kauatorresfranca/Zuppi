import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Armazenar o token CSRF em memória
let csrfToken: string | null = null;

export const setCsrfToken = (token: string) => {
  console.debug(`Armazenando CSRF token: ${token}`);
  csrfToken = token;
};

// Nova função para obter o token de forma assíncrona
const fetchCsrfTokenAndSetHeader = async () => {
  try {
    const response = await api.get("/get_csrf_token/");
    const newToken = response.data.csrfToken;
    if (newToken) {
      setCsrfToken(newToken);
      return newToken;
    }
  } catch (error) {
    console.error("Falha ao obter novo CSRF token:", error);
  }
  return null;
};

const getCookie = (name: string): string | null => {
  const cookieString = document.cookie;
  if (!cookieString) {
    console.warn("Nenhum cookie encontrado no navegador");
    return null;
  }
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (!cookie) continue;
    const [cookieName, cookieValue] = cookie.split("=");
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
  async (config) => {
    // Verificar se a requisição é segura e se precisa de um token
    const isModifyingMethod = ["POST", "PUT", "DELETE", "PATCH"].includes(
      config.method?.toUpperCase() || ""
    );

    if (isModifyingMethod) {
      // Priorizar o token CSRF em memória
      let token = csrfToken || getCookie("csrftoken");

      if (!token) {
        console.warn("CSRF token ausente, tentando obter um novo antes da requisição.");
        token = await fetchCsrfTokenAndSetHeader();
      }

      if (token) {
        console.debug(`Adicionando X-CSRFToken: ${token} para ${config.method} ${config.url}`);
        config.headers["X-CSRFToken"] = token;
      } else {
        console.error("Falha ao obter CSRF token. Requisição será enviada sem.");
      }
    } else {
      console.debug(`Requisição GET/HEAD. Nenhum CSRF token necessário para ${config.url}`);
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
      (error.response.data?.detail?.includes("CSRF") ||
        (typeof error.response.data === "string" && error.response.data.includes("CSRF")));

    if (isCsrfError && !originalRequest._retry) {
      console.warn("Erro 403 CSRF detectado, tentando obter e re-enviar com novo token.");
      originalRequest._retry = true;
      try {
        const newToken = await fetchCsrfTokenAndSetHeader();
        if (newToken) {
          originalRequest.headers["X-CSRFToken"] = newToken;
          return api(originalRequest);
        }
      } catch (retryError) {
        console.error("Falha ao tentar novamente a requisição após erro CSRF:", retryError);
      }
    }

    console.error("Erro na requisição:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { api };