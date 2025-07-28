// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

// Armazenar o CSRF token em cache para evitar múltiplas requisições
let csrfToken: string | null = null;

api.interceptors.request.use(async (config) => {
  if (!csrfToken) {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/get_csrf_token/",
        {
          withCredentials: true,
        }
      );
      csrfToken = response.data.csrfToken;
      console.log("CSRF token obtido:", csrfToken);
    } catch (err) {
      console.error("Erro ao obter CSRF token:", err);
    }
  }
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// Função para limpar o CSRF token (e.g., após logout)
export const clearCsrfToken = () => {
  csrfToken = null;
};

export { api };
