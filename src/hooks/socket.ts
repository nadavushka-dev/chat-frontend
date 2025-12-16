import { io, Socket } from "socket.io-client";
import { getStoreState } from "../store/storeAccessors";

export const enum SE {
  CONNECT = "connect",
  CONNECTION = "connection",
  DISCONNECT = "disconnect",
  DELIVER = "deliver",
  JOIN_ROOM = "join_room",
  ROOM_CREATED = "room_created",
  LEAVE_ROOM = "leave_room",
  MSG = "msg",
  ERROR = "error",
  USER_ONLINE = "user_online",
  USER_OFFLINE = "user_offline",
  ONLINE_USERS = "online_users",
}

export class So {
  private static instance: Socket | null = null;

  private constructor() {}

  private static authUser() {
    return getStoreState().user.jwt;
  }

  public static getSocket() {
    if (!this.instance) {
      this.instance = io(import.meta.env.VITE_API_URL, {
        auth: { token: this.authUser() },
      });
    }
    return this.instance;
  }
}
