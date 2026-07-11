import axios from "axios";
import store from "../store/index";
import { logout } from "../store/auth-slice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthEndpoint =
      error.config.url.includes("/auth/") ||
      error.config.url.includes("/change-password");
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && !isAuthEndpoint) {
      localStorage.removeItem("token");
      store.dispatch(logout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
