import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthResponse, SignupRequest } from "../../../models/user.model";
import { decodeJWT } from "../../utils/jwt-decoder";
import { signupApi } from "../../../api/calls/user";
import { createApiThunk } from "../../utils/apiThunk";
import { UserState } from "../../types/user.types";

export const signupThunk = createApiThunk(
  "signup",
  async (request: SignupRequest): Promise<AuthResponse> => {
    const response = await signupApi(request);
    if (response.data.jwt) {
      localStorage.setItem("access_token", response.data.jwt);
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
