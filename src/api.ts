import axios from "axios";

// Verificar se import.meta.env está disponível (Vite)
// E usar o fallback para localhost se VITE_API_URL não estiver definido
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Para depuração (temporário, remova depois de confirmar que funciona)
console.log(">>>> Valor final de API_URL no api.ts:", API_URL);

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

let csrfToken: string | null = null;
let isFetchingCsrfToken = false;

api.interceptors.request.use(async (config) => {
  if (!csrfToken && !isFetchingCsrfToken) {
    try {
      isFetchingCsrfToken = true;
      const response = await axios.get(`${API_URL}/api/get_csrf_token/`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      csrfToken = response.data.csrfToken;
      console.log("CSRF token obtido:", csrfToken);
    } catch (err) {
      console.error("Erro ao obter CSRF token:", err);
    } finally {
      isFetchingCsrfToken = false;
    }
  }
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  console.log("Request headers:", config.headers); // Log para depuração
  return config;
});

export const clearCsrfToken = () => {
  csrfToken = null;
  isFetchingCsrfToken = false;
};

export { api };
