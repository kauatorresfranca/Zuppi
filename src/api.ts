import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Função utilitária para obter o valor de um cookie.
// Esta versão é mais robusta e menos propensa a erros de formatação.
const getCookie = (name: string): string | null => {
  const cookieString = document.cookie;
  if (!cookieString) return null;
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(s => s.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

// Cria a instância do Axios com o URL base.
// `withCredentials` é crucial para enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Promise para garantir que a API é inicializada apenas uma vez.
let initPromise: Promise<void> | null = null;

// Função para inicializar a API.
export const initializeApi = async (): Promise<void> => {
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Faz um pedido GET simples para forçar o backend a definir o cookie csrftoken.
      // O valor retornado não é usado diretamente, pois o interceptor irá ler o cookie.
      await api.get("get_csrf_token/");
      console.log("Cookie CSRF obtido com sucesso.");
    } catch (err) {
      console.error("Falha ao obter o cookie CSRF:", err);
      throw new Error("Não foi possível inicializar a API.");
    }
  })();

  return initPromise;
};

// Interceptor do Axios para adicionar o token a todos os pedidos que modificam dados.
api.interceptors.request.use(async (config) => {
  // Obtém o token CSRF diretamente do cookie antes de cada pedido.
  const csrfToken = getCookie("csrftoken");

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