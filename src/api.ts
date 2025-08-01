import axios from "axios";

// Ponto de entrada da API.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Função utilitária para obter o valor de um cookie.
const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split(";")
    .find((row) => row.trim().startsWith(name + "="));
  return cookieValue ? cookieValue.trim().substring(name.length + 1) : null;
};

// Cria a instância do Axios com o URL base.
// `withCredentials` é crucial para enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Interceptor do Axios para adicionar o token CSRF a todos os pedidos que modificam dados.
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

// A aplicação já não precisa de uma chamada `initializeApi`.
// O Django define o cookie automaticamente no primeiro pedido,
// e o interceptor irá usá-lo depois de o login ser feito.

// Exporta a instância da API
export { api };