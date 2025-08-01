import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Cria a instância do Axios com o URL base.
// `withCredentials` é crucial para enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// A Promise de inicialização para garantir que a API é inicializada apenas uma vez.
let initPromise: Promise<void> | null = null;

/**
 * Função utilitária para obter o valor de um cookie.
 * @param name O nome do cookie a ser procurado.
 * @returns O valor do cookie ou null se não for encontrado.
 */
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

/**
 * Inicializa a API, garantindo que o token CSRF está presente antes de qualquer pedido.
 * Esta função deve ser chamada e esperada no seu `main.tsx`.
 * @returns Uma Promise que resolve quando a API estiver pronta.
 */
export const initializeApi = async (): Promise<void> => {
  // Se a inicialização já estiver em andamento, esperamos por ela.
  if (initPromise) {
    return initPromise;
  }

  initPromise = (async () => {
    try {
      // Faz um pedido GET simples para forçar o backend a definir o cookie `csrftoken`.
      // Isto garante que o cookie estará disponível para o interceptor usar,
      // mesmo para o primeiro pedido de login.
      await api.get("get_csrf_token/");
      console.log("Cookie CSRF obtido com sucesso.");
    } catch (err) {
      console.error("Falha ao obter o cookie CSRF:", err);
      // Se a inicialização falhar, rejeitamos a Promise para impedir que a aplicação inicie.
      throw new Error("Não foi possível inicializar a API.");
    }
  })();

  return initPromise;
};

// Interceptor do Axios para adicionar o token a todos os pedidos que modificam dados.
// Este interceptor garante que o token mais recente do cookie seja sempre usado.
api.interceptors.request.use(async (config) => {
  // Espera que a inicialização esteja completa antes de prosseguir.
  // O bloco try...catch garante que o aplicativo não irá travar se a Promise
  // for rejeitada durante a inicialização.
  try {
    await initPromise;
  } catch (err) {
    // Se a inicialização falhou, não tente continuar.
    // Lançamos um novo erro para que a aplicação possa reagir.
    console.error("Interceptador: A inicialização da API falhou. Impedindo o pedido.");
    return Promise.reject(new Error("API não inicializada."));
  }
  
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