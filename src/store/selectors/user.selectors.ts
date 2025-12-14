import { RootState } from "..";

const isAuth = (state: RootState) => !!state.user.jwt;
const username = (state: RootState) => state.user.user.username;
const user = (state: RootState) => state.user.user;

export const userSelectors = { isAuth, username, user };
