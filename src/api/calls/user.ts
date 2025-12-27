import { AxiosResponse } from "axios";
import api, { AxiosCustomRequestConfig } from "../../axios/interceptors";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from "../../models/user.model";
import { getStoreStore } from "../../store/storeAccessors";

async function loginApi(
  request: LoginRequest,
): Promise<AxiosResponse<AuthResponse>> {
  const response = await api.post("auth/login", request);
  return response;
}

async function signupApi(
  request: SignupRequest,
): Promise<AxiosResponse<AuthResponse>> {
  const response = await api.post("auth/signup", request);
  return response;
}

async function refreshTokenApi(): Promise<AxiosResponse<AuthResponse>> {
  const config: AxiosCustomRequestConfig = {
    isRefreshToken: true,
  };
  const response = await api.get("auth/refresh-token", config);
  if (response.data.jwt) {
    localStorage.setItem("access_token", response.data.jwt);

    getStoreStore().dispatch({
      type: "user/restoreUser",
      payload: response.data.jwt,
    });
  }
  return response;
}

export { loginApi, signupApi, refreshTokenApi };
