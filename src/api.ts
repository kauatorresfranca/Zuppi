import axios from "axios";

// Ponto de entrada da API.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// A instância do Axios é criada sem interceptores.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

let csrfToken: string | null = null;
let initPromise: Promise<void> | null = null;

// Função para inicializar a API e obter o token CSRF.
export const initializeApi = async (): Promise<void> => {
  // Se a inicialização já estiver em andamento, espera que termine.
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Faz um pedido GET para obter o token CSRF explicitamente.
      const response = await api.get<{ csrfToken: string }>("get_csrf_token/");
      csrfToken = response.data.csrfToken;

      // Configura o interceptor do Axios APENAS DEPOIS de o token ser obtido.
      api.interceptors.request.use((config) => {
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

      console.log("API inicializada e token CSRF obtido com sucesso.");
    } catch (err) {
      console.error("Falha ao inicializar a API e obter o token CSRF:", err);
      throw new Error("Falha ao inicializar a API.");
    }
  })();

  return initPromise;
};

// Exporta a instância da API
export { api };