import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export function createApiThunk<Returned, Arg = void>(
  typePrefix: string,
  payloadCreator: (arg: Arg) => Promise<Returned>,
) {
  return createAsyncThunk<Returned, Arg>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await payloadCreator(arg);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          return rejectWithValue(error.response.data);
        }
        throw error;
      }
    },
  );
}
