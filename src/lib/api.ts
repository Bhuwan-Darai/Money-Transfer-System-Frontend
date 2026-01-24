import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const API_BASE_URL = "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Auth API
export const authApi = {
  registerSuperAdmin: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post("/auth/register/super-admin", data);
    return response.data;
  },
};
