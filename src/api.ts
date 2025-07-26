import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const response = await axios.get(
    "http://localhost:8000/api/get_csrf_token/",
    { withCredentials: true }
  );
  const csrfToken = response.data.csrfToken;
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export { api };
