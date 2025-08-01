import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Cria a instância do Axios com o URL base.
// `withCredentials` é crucial para enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

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

// Interceptor do Axios para adicionar o token a todos os pedidos que modificam dados.
// Este é o único código necessário para lidar com o CSRF.
api.interceptors.request.use((config) => {
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

// Exporta a instância da API.
export { api };