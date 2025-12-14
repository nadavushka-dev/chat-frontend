import { AxiosResponse } from "axios";
import api from "../../axios/interceptors";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from "../../models/user.model";

async function loginApi(
  request: LoginRequest,
): Promise<AxiosResponse<AuthResponse>> {
  const response = await api.post("users/login", request);
  return response;
}

async function signupApi(
  request: SignupRequest,
): Promise<AxiosResponse<AuthResponse>> {
  const response = await api.post("users/signup", request);
  return response;
}

export { loginApi, signupApi };
