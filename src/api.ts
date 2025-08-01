import axios from "axios";

// Ponto de entrada da API. Usa a variável de ambiente VITE_API_URL ou um fallback.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Função utilitária para obter o valor de um cookie.
const getCookie = (name: string): string | null => {
  const cookieValue = document.cookie
    .split(";")
    .find((row) => row.startsWith(name));
  return cookieValue ? cookieValue.split("=")[1] : null;
};

// Cria a instância do Axios com o URL base e com a opção de enviar cookies entre domínios.
const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

// Interceptor do Axios para adicionar o token a todas as requisições que modificam dados.
api.interceptors.request.use((config) => {
  // Obtém o token CSRF diretamente do cookie antes de cada pedido.
  const csrfToken = getCookie("csrftoken");

  // Adiciona o token CSRF ao cabeçalho para todos os métodos "inseguros" (POST, PUT, DELETE, PATCH).
  if (
    csrfToken &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")
  ) {
    config.headers["X-CSRFToken"] = csrfToken;
  }

  return config;
});

export { api };