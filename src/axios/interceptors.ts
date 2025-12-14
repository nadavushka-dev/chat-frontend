import axios, { AxiosError } from "axios";
import { handleJwt } from "./utils";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 60,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  function (config) {
    handleJwt(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return handleResponseReject(error);
  },
);

function handleResponseReject(error: AxiosError) {
  return Promise.reject(error);
}

export default api;
