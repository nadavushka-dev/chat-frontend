import { User } from "../store/slices/user.slice";

export type RoomList = Room[];
export type Room = {
  id: number;
  name: string;
  createdAt: Date;
  createBy: number;
};

export type Message = {
  senderId: number;
  roomId: number;
  body: string;
  sentAt?: string;
  sender?: { name: string };
};

export type GetRoomMessagesRequest = { roomId: number };
export type GetRoomMessagesResponse = Message[];

export type GetRoomParticipantsRequest = { roomId: number };
export type GetRoomParticipantsResponse = ({ name: string } & Pick<
  User,
  "id"
>)[];

export type CreateRoomRequest = {
  name: string;
  createBy: number;
};
export type CreateRoomResponse = {
  id: number;
  name: string;
  createdAt: Date;
  createBy: number;
};
