import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
});

// Interceptor para adicionar o token ANTES de cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    console.debug(`Requisição para ${config.method} ${config.url}, Headers:`, config.headers);
    return config;
  },
  (error) => {
    console.error("Erro no interceptor de requisição:", error);
    return Promise.reject(error);
  }
);

// Interceptor de resposta para lidar com 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Erro na requisição:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      // Opcional: Redirecionar para a página de login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };

// A função setAuthToken já não é necessária se você usar o interceptor acima
// mas se você preferir usá-la, garanta que ela é chamada após o login
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};
