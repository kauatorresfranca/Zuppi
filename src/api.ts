import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  console.debug(`Armazenando auth token: ${token ? '***' : 'null'}`);
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Initialize token from localStorage on module load
const storedToken = localStorage.getItem("authToken");
if (storedToken) {
  console.debug("Inicializando token do localStorage");
  setAuthToken(storedToken);
}

api.interceptors.request.use(
  (config) => {
    console.debug(`Requisição para ${config.method?.toUpperCase()} ${config.url}, Headers:`, config.headers, 'Payload:', config.data);
    return config;
  },
  (error) => {
    console.error("Erro no interceptor de requisição:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Erro na requisição:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      setAuthToken(null);
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);

export { api };