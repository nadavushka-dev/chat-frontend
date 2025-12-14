import { RootState } from "..";

const messages = (state: RootState) => state.chat.messages;
const selectoedRoom = (state: RootState) =>
  state.chat.rooms?.find((room) => room.id === state.chat.currnetRoomId);
const rooms = (state: RootState) => state.chat.rooms;
const participants = (state: RootState) => state.chat.currentRoomParticipants;
const onlineUsers = (state: RootState) => state.chat.onlineUsers;

export const chatSelectors = {
  messages,
  selectoedRoom,
  rooms,
  participants,
  onlineUsers,
};
