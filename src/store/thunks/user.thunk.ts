import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../slices/user.slice";
import {
  AuthResponse,
  LoginRequest,
  SignupRequest,
} from "../../models/user.model";
import { decodeJWT } from "../utils/jwt-decoder";
import { loginApi, signupApi } from "../../api/calls/user";
import { createApiThunk } from "../utils/apiThunk";

export const loginThunk = createApiThunk(
  "login",
  async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await loginApi(request);
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    return response.data;
  },
);

export const loginThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>,
) => {
  builder.addCase(loginThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(loginThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;

    const user = decodeJWT(response.jwt);
    state.jwt = response.jwt;
    state.user.email = user.email;
    state.user.username = user.username;
    state.user.id = user.userId;
  });
  builder.addCase(loginThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const signupThunk = createApiThunk(
  "signup",
  async (request: SignupRequest) => {
    const response = await signupApi(request);
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    return response.data;
  },
);

export const signupThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>,
) => {
  builder.addCase(signupThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(signupThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;

    const user = decodeJWT(response.jwt);
    state.jwt = response.jwt;
    state.user.email = user.email;
    state.user.username = user.username;
    state.user.id = user.userId;
  });
  builder.addCase(signupThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const userThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<UserState>,
) => {
  loginThunkBuilder(builder);
  signupThunkBuilder(builder);
};

export const userActions = {
  loginThunk,
  signupThunk,
};
