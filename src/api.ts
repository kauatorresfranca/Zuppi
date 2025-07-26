import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Função para obter o CSRF token
const getCsrfToken = async () => {
  const response = await fetch("http://localhost:8000/api/get_csrf_token/", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
};

// Intercepta requisições POST para incluir o CSRF token
api.interceptors.request.use(async (config) => {
  if (config.method?.toLowerCase() === "post") {
    const csrfToken = await getCsrfToken();
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export { api };
