import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Função utilitária para obter o valor de um cookie.
const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split(";")
    .find((row) => row.trim().startsWith(name + "="));
  return cookieValue ? cookieValue.split("=")[1] : null;
};

// Cria a instância do Axios com o URL base e com a opção de enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Promise para garantir que a API é inicializada apenas uma vez.
let initPromise: Promise<void> | null = null;

// Função para inicializar a API.
export const initializeApi = async (): Promise<void> => {
  // Se já está a inicializar, aguarda a Promise
  if (initPromise) {
    return initPromise;
  }

  // Cria a Promise para inicialização
  initPromise = new Promise((resolve, reject) => {
    (async () => {
      try {
        // Faz um pedido GET simples para forçar o backend a definir o cookie csrftoken.
        // A resposta deste endpoint não importa, o que importa é o cookie.
        await api.get("get_csrf_token/");
        console.log("Cookie CSRF obtido com sucesso.");
        resolve();
      } catch (err) {
        console.error("Falha ao obter o cookie CSRF:", err);
        reject(err);
      }
    })();
  });

  return initPromise;
};

// Interceptor do Axios para adicionar o token a todos os pedidos que modificam dados.
api.interceptors.request.use((config) => {
  // Obtém o token CSRF diretamente do cookie antes de cada pedido.
  const csrfToken = getCookie("csrftoken");

  // Adiciona o token CSRF ao cabeçalho para todos os métodos "inseguros" (POST, PUT, DELETE, PATCH).
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