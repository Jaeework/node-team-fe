import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ApiError } from "../types/api.types";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = import.meta.env.VITE_BACKEND;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    // eslint-disable-next-line no-console
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as RetryAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/refresh");
        sessionStorage.setItem("token", data.data.token);
        originalRequest.headers.authorization = `Bearer ${data.data.token}`;
        return api(originalRequest);
      } catch (error) {
        sessionStorage.removeItem("token");
        return Promise.reject({});
      }
    }
    const data = error.response?.data;
    const message = data?.message ?? error.message ?? "알 수 없는 오류";
    const isUserError = data?.isUserError ?? false;
    // eslint-disable-next-line no-console
    console.log("RESPONSE ERROR", error);
    return Promise.reject({ message, isUserError });
  },
);

export default api;
