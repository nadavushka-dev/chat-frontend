import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import chatsReducer from "./slices/chat.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatsReducer,
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
