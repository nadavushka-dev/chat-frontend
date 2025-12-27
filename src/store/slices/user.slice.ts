import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { decodeJWT } from "../utils/jwt-decoder";
import { UserState } from "../types/user.types";
import { userThunkActionsBuilder } from "../thunks/user.thunk";

const initialState: UserState = {
  jwt: null,
  isLoading: false,
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    restoreUser(state, action: PayloadAction<string>) {
      const user = decodeJWT(action.payload);
      state.jwt = action.payload;
      state.user.email = user.email;
      state.user.username = user.username;
      state.user.id = user.userId;
    },
    logout(state) {
      state.jwt = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: userThunkActionsBuilder,
});

export const { logout, restoreUser } = userSlice.actions;
const userReducer: Reducer<UserState> = userSlice.reducer;
export default userReducer;
