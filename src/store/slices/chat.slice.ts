import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import { Message, Room } from "../../models/rooms.model";
import { chatThunkActionsBuilder } from "../thunks/chat.thunk";
import { User } from "./user.slice";

export type ChatsState = {
  isLoading: boolean;
  messages: Message[];
  rooms: Room[];
  currnetRoomId?: number | null;
  currentRoomParticipants: ({ name: string } & Pick<User, "id">)[];
  onlineUsers: Record<number, boolean>;
};

const initialState: ChatsState = {
  isLoading: false,
  messages: [],
  currentRoomParticipants: [],
  onlineUsers: [],
  rooms: [],
};

const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    join: (state, action: PayloadAction<{ id: number }>) => {
      state.currnetRoomId = action.payload.id;
    },
    leave: (state) => {
      state.currnetRoomId = null;
    },
    addRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    addOnlineUsers: (state, action: PayloadAction<number[]>) => {
      action.payload.forEach((id) => (state.onlineUsers[id] = true));
    },
    removeOnlineUser: (state, action: PayloadAction<number>) => {
      delete state.onlineUsers[action.payload];
    },
    addParticipant: (
      state,
      action: PayloadAction<{ username: string; id: number }>,
    ) => {
      const { username, id } = action.payload;
      state.currentRoomParticipants.push({ id, name: username });
    },
  },
  extraReducers: chatThunkActionsBuilder,
});

export const chatActions = ChatsSlice.actions;

const chatsReducer: Reducer<ChatsState> = ChatsSlice.reducer;
export default chatsReducer;
