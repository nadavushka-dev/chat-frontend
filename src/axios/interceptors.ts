import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { handleJwt } from "./utils";
import { refreshTokenApi } from "../api/calls/user";
import { getStoreStore } from "../store/storeAccessors";

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  isRefreshToken: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  async function (config) {
    if (!(config as AxiosCustomRequestConfig).isRefreshToken) {
      await handleJwt(config);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

let isRefresh = false;

let failedQueue: {
  originalRequest: InternalAxiosRequestConfig;
  resolve: Function;
  reject: Function;
}[] = [];
function processQueue(error: any) {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      handleJwt(item.originalRequest);
      item.resolve(api(item.originalRequest));
    }
  });
  failedQueue = [];
}

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (!(originalRequest as AxiosCustomRequestConfig).isRefreshToken) {
      if (error.response.status === 401) {
        if (!isRefresh) {
          isRefresh = true;
          const store = getStoreStore();
          try {
            await refreshTokenApi();
            processQueue(null);
            handleJwt(originalRequest);
            return api(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError);
            store.dispatch({
              type: "user/logout",
            });

            return Promise.reject(refreshError);
          } finally {
            isRefresh = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push({ originalRequest, resolve, reject });
          });
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
