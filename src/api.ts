import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Cria a instância do Axios com o URL base e com a opção de enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Variável para armazenar o token CSRF depois de obtido.
let csrfToken: string | null = null;
// Promise para garantir que a API é inicializada apenas uma vez.
let initPromise: Promise<void> | null = null;

// Função para inicializar a API.
export const initializeApi = async (): Promise<void> => {
  // Se já está a inicializar, aguarda a Promise
  if (initPromise) {
    return initPromise;
  }

  // Cria a Promise para inicialização
  initPromise = (async () => {
    try {
      // Faz um pedido GET para obter o token explicitamente.
      const response = await api.get<{ csrfToken: string }>("get_csrf_token/");
      csrfToken = response.data.csrfToken;
      console.log("Token CSRF obtido com sucesso:", csrfToken);
    } catch (err) {
      console.error("Falha ao obter o token CSRF:", err);
      // Lança o erro para que a aplicação não seja renderizada.
      throw new Error("Não foi possível obter o token CSRF.");
    }
  })();

  return initPromise;
};

// Interceptor do Axios para adicionar o token a todos os pedidos que modificam dados.
api.interceptors.request.use(async (config) => {
  // Aguarda a inicialização da API para garantir que o token já foi obtido.
  await initPromise;

  // Adiciona o token CSRF ao cabeçalho para todos os métodos "inseguros".
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

// Exporta a instância da API
export { api };