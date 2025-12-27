import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { UserState } from "../../types/user.types";
import { loginThunk, loginThunkBuilder } from "./login.thunk";
import { signupThunk, signupThunkBuilder } from "./signup.thunk";
import {
  refreshTokenThunk,
  refreshTokenThunkBuilder,
} from "./refreshToken.thunk";

export const userThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<UserState>,
) => {
  loginThunkBuilder(builder);
  signupThunkBuilder(builder);
  refreshTokenThunkBuilder(builder);
};

export const userActions = {
  loginThunk,
  signupThunk,
  refreshTokenThunk,
};
