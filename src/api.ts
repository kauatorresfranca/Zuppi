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
  console.log("CSRF Token found:", csrfToken); // Debug
  if (
    csrfToken &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(
      config.method?.toUpperCase() || ""
    )
  ) {
    config.headers["X-CSRFToken"] = csrfToken;
    console.log("X-CSRFToken header set:", config.headers["X-CSRFToken"]); // Debug
  } else {
    console.log("No CSRF Token or not a POST/PUT/DELETE/PATCH request");
  }
  return config;
});

export { api };