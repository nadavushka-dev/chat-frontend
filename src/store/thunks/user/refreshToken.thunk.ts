import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AuthResponse } from "../../../models/user.model";
import { refreshTokenApi } from "../../../api/calls/user";
import { createApiThunk } from "../../utils/apiThunk";
import { UserState } from "../../types/user.types";

export const refreshTokenThunk = createApiThunk(
  "refreshToken",
  async (): Promise<AuthResponse> => {
    const response = await refreshTokenApi();
    return response.data;
  },
);

export const refreshTokenThunkBuilder = (
  builder: ActionReducerMapBuilder<UserState>,
) => {
  builder.addCase(refreshTokenThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;

    state.jwt = response.jwt;
  });
  builder.addCase(refreshTokenThunk.rejected, (state) => {
    state.isLoading = false;
  });
};
