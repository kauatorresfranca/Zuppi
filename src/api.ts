import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Cria a instância do Axios com o URL base e com a opção de enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Variável para armazenar o token CSRF obtido.
let csrfToken: string | null = null;
// Uma Promise que resolve quando o token é obtido. Isto evita múltiplas chamadas.
let csrfPromise: Promise<void> | null = null;

// Função assíncrona para obter o token CSRF do backend.
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get<{ csrfToken: string }>(
      `${API_URL}/api/get_csrf_token/`,
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    csrfToken = response.data.csrfToken;
    console.log("CSRF token obtido:", csrfToken);
  } catch (err) {
    console.error("Erro ao obter o token CSRF:", err);
    // Em caso de falha, é importante permitir que o resto da aplicação continue
    // a carregar, para que o erro possa ser tratado no componente.
    throw new Error("Não foi possível obter o token CSRF.");
  }
};

// Funçao para inicializar a API. Deve ser chamada uma única vez.
export const initializeApi = async () => {
  // Se a promise já existe, significa que o token já está a ser obtido.
  if (csrfPromise) {
    await csrfPromise;
    return;
  }
  // Cria a promise e armazena-a para que não seja chamada novamente.
  csrfPromise = fetchCsrfToken();
  await csrfPromise;
};

// Interceptor do Axios para adicionar o token a todas as requisições, depois de ele ter sido obtido.
api.interceptors.request.use(async (config) => {
  // Garante que a requisição só avança depois do token ter sido obtido.
  await csrfPromise;

  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  } else {
    // Se o token não estiver disponível, o pedido irá falhar.
    console.error("Token CSRF não disponível. O pedido pode falhar.");
  }

  return config;
});

// Exporta as funções necessárias.
export const clearCsrfToken = () => {
  csrfToken = null;
  csrfPromise = null;
};

export { api };