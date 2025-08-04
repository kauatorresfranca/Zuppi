import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_URL}/api/`,
  withCredentials: true,
});

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

api.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  if (
    csrfToken &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(config.method?.toUpperCase() || "")
  ) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 && error.response?.data?.error?.includes("CSRF")) {
      try {
        await api.get("/get_csrf_token/", { withCredentials: true });
        return api(error.config);
      } catch (csrfError) {
        console.error("Failed to refresh CSRF token:", csrfError);
      }
    }
    return Promise.reject(error);
  }
);

export { api };