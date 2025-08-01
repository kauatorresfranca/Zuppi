import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

let csrfToken: string | null = null;
let initPromise: Promise<void> | null = null;

export const initializeApi = async (): Promise<void> => {
  if (initPromise) {
    return initPromise;
  }

  // Lógica de inicialização corrigida. Mais simples e funcional.
  initPromise = (async () => {
    try {
      const response = await api.get<{ csrfToken: string }>("get_csrf_token/");
      csrfToken = response.data.csrfToken;
      console.log("Token CSRF obtido com sucesso:", csrfToken);
    } catch (err) {
      console.error("Falha ao obter o token CSRF:", err);
      throw new Error("Não foi possível obter o token CSRF.");
    }
  })();

  return initPromise;
};

api.interceptors.request.use(async (config) => {
  await initPromise;

  if (
    csrfToken &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(
      config.method?.toUpperCase() || ""
    )
  ) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

export { api };