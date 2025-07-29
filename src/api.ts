import axios from "axios";

// Verificar se process.env está disponível, caso contrário usar fallback
const API_URL =
  (typeof process !== "undefined" && process.env.REACT_APP_API_URL) ||
  "http://localhost:8000";

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
