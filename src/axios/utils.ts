import { InternalAxiosRequestConfig } from "axios";
import { getStoreState } from "../store/storeAccessors";

export function handleJwt(config: InternalAxiosRequestConfig) {
  const jwt = getStoreState().user.jwt;
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`;
  }
}
