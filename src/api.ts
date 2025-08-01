import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Cria a instância do Axios com o URL base.
// O `withCredentials: true` é crucial para enviar cookies (como o do Django) entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Variável para armazenar o token CSRF depois de obtido.
let csrfToken: string | null = null;
// Promise para controlar a obtenção do token. Isto evita chamadas repetidas.
let csrfPromise: Promise<void> | null = null;

// Função assíncrona para obter o token CSRF.
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get<{ csrfToken: string }>(
      `${API_URL}/api/get_csrf_token/`,
      {
        withCredentials: true,
      }
    );
    csrfToken = response.data.csrfToken;
    console.log("CSRF token obtido:", csrfToken);
  } catch (err) {
    console.error("Erro ao obter o token CSRF:", err);
    throw new Error("Não foi possível obter o token CSRF.");
  }
};

// Funçao para inicializar a API. Deve ser chamada uma única vez no arranque.
export const initializeApi = async () => {
  if (csrfPromise) {
    await csrfPromise;
    return;
  }
  csrfPromise = fetchCsrfToken();
  await csrfPromise;
};

// Interceptor do Axios para adicionar o token a todos os pedidos que o requeiram.
api.interceptors.request.use(async (config) => {
  // Apenas adiciona o token a métodos que alteram dados.
  if (
    csrfToken &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")
  ) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

// Exporta a instância do Axios para ser usada em toda a aplicação.
export { api };