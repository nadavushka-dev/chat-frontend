import { Store } from "@reduxjs/toolkit";
import { RootState } from ".";

let getStore: () => Store<RootState>;

export const injectStore = (store: Store<RootState>) => {
  getStore = () => store;
};

export const getStoreState = () => getStore().getState();
