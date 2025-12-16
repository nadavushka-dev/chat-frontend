import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createApiThunk } from "../utils/apiThunk";
import {
  createRoomApi,
  getRoomMessagesApi,
  getRoomParticipantsApi,
  getRoomsApi,
} from "../../api/calls/room";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  GetRoomMessagesRequest,
  GetRoomMessagesResponse,
  GetRoomParticipantsRequest,
  GetRoomParticipantsResponse,
  RoomList,
} from "../../models/rooms.model";
import { ChatsState } from "../slices/chat.slice";

export const getRoomsThunk = createApiThunk(
  "getRooms",
  async (): Promise<RoomList> => {
    return (await getRoomsApi()).data;
  },
);

export const getRoomsThunkBuilder = (
  builder: ActionReducerMapBuilder<ChatsState>,
) => {
  builder.addCase(getRoomsThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getRoomsThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;
    state.rooms = response;
  });
  builder.addCase(getRoomsThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const getRoomMessagesThunk = createApiThunk(
  "getRoomsMessages",
  async (request: GetRoomMessagesRequest): Promise<GetRoomMessagesResponse> => {
    return (await getRoomMessagesApi(request)).data;
  },
);

export const getRoomMessagesThunkBuilder = (
  builder: ActionReducerMapBuilder<ChatsState>,
) => {
  builder.addCase(getRoomMessagesThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getRoomMessagesThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;
    state.messages = response;
  });
  builder.addCase(getRoomMessagesThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const getRoomParticipantsThunk = createApiThunk(
  "getRoomsParticipants",
  async (
    request: GetRoomParticipantsRequest,
  ): Promise<GetRoomParticipantsResponse> => {
    return (await getRoomParticipantsApi(request)).data;
  },
);

export const getRoomParticipantsThunkBuilder = (
  builder: ActionReducerMapBuilder<ChatsState>,
) => {
  builder.addCase(getRoomParticipantsThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(getRoomParticipantsThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;
    state.currentRoomParticipants = response;
  });
  builder.addCase(getRoomParticipantsThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const createRoomThunk = createApiThunk(
  "createRoom",
  async (request: CreateRoomRequest): Promise<CreateRoomResponse> => {
    return (await createRoomApi(request)).data;
  },
);

export const createRoomThunkBuilder = (
  builder: ActionReducerMapBuilder<ChatsState>,
) => {
  builder.addCase(createRoomThunk.pending, (state) => {
    state.isLoading = true;
  });
  builder.addCase(createRoomThunk.fulfilled, (state, action) => {
    state.isLoading = false;
    const response = action.payload;
    if (!response) return;
    // state.rooms.push(response);
  });
  builder.addCase(createRoomThunk.rejected, (state) => {
    state.isLoading = false;
  });
};

export const chatThunkActionsBuilder = (
  builder: ActionReducerMapBuilder<ChatsState>,
) => {
  getRoomsThunkBuilder(builder);
  getRoomMessagesThunkBuilder(builder);
  getRoomParticipantsThunkBuilder(builder);
  createRoomThunkBuilder(builder);
};

export const userActions = {
  getRoomsThunk,
  getRoomMessagesThunk,
  createRoomThunk,
};
