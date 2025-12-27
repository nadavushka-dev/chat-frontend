import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthResponse, LoginRequest } from "../../../models/user.model";
import { decodeJWT } from "../../utils/jwt-decoder";
import { loginApi } from "../../../api/calls/user";
import { createApiThunk } from "../../utils/apiThunk";
import { UserState } from "../../types/user.types";

export const loginThunk = createApiThunk(
  "login",
  async (request: LoginRequest): Promise<AuthResponse> => {
    const response = await loginApi(request);
    if (response.data.jwt) {
      localStorage.setItem("access_token", response.data.jwt);
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
