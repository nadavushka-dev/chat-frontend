import { InternalAxiosRequestConfig } from "axios";
import { getStoreState } from "../store/storeAccessors";
import { decodeJWT } from "../store/utils/jwt-decoder";
import { refreshTokenApi } from "../api/calls/user";

const SECOND = 1000;
const TIME_BUFFER = SECOND * 30;

let refreshPromise: Promise<string> | null = null;

export async function handleJwt(config: InternalAxiosRequestConfig) {
  if (config.url === "auth/refresh-token") return config;

  let jwt = getStoreState().user.jwt;
  if (jwt) {
    if (isTokenExpired(jwt)) {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const { data } = await refreshTokenApi();
            return data.jwt;
          } finally {
            refreshPromise = null;
          }
        })();
      }
      jwt = await refreshPromise;
    }

    config.headers.Authorization = `Bearer ${jwt}`;
  }
}

function isTokenExpired(jwt: string): boolean {
  const payload = decodeJWT(jwt);
  if (payload.exp * 1000 < Date.now() + TIME_BUFFER) {
    return true;
  }
  return false;
}
