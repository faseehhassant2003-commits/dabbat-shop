import axios from "axios";

// Points at the Spring Boot backend. Set VITE_API_URL in .env for prod.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dabbat-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
