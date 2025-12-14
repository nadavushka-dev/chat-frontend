import { useCallback } from "react";
import { useAppDispatch } from "../store";
import { chatActions } from "../store/slices/chat.slice";
import { SE, So } from "./socket";
import { Message } from "../models/rooms.model";

const useSocket = () => {
  const dispatch = useAppDispatch();

  const connectSocket = useCallback(() => {
    So.getSocket().on(SE.CONNECT, () => {
      console.log("connected");
    });

    So.getSocket().on(SE.ONLINE_USERS, (users: Set<number>) => {
      let ids: number[] = [];
      users.forEach((id) => ids.push(id));
      dispatch(chatActions.addOnlineUsers(ids));
    });

    So.getSocket().on(SE.USER_ONLINE, (id, username) => {
      dispatch(chatActions.addOnlineUsers([id]));
      dispatch(chatActions.addParticipant({ id, username }));
    });

    So.getSocket().on(SE.USER_OFFLINE, (id) => {
      dispatch(chatActions.removeOnlineUser(id));
    });

    So.getSocket().on(SE.DELIVER, (message) => {
      dispatch(chatActions.addMessage(message));
    });
  }, []);

  const joinRoom = useCallback((id: number, onSuccess?: () => void) => {
    So.getSocket().emit(SE.JOIN_ROOM, id);
    dispatch(chatActions.join({ id }));
    onSuccess && onSuccess();
  }, []);

  const leaveRoom = useCallback((id: number) => {
    So.getSocket().emit(SE.LEAVE_ROOM, id);
    dispatch(chatActions.clearMessages());
    dispatch(chatActions.leave());
  }, []);

  const switchRooms = useCallback(
    (oldRoomId: number, newRoomId: number, onJoinSuccess?: () => void) => {
      leaveRoom(oldRoomId);
      joinRoom(newRoomId, onJoinSuccess);
    },
    [leaveRoom, joinRoom],
  );

  const sendMessage = useCallback((message: Message) => {
    So.getSocket().emit(SE.MSG, message);
    dispatch(chatActions.addMessage(message));
  }, []);

  const disconnectSocket = useCallback(() => {
    So.getSocket().off(SE.DELIVER);
    So.getSocket().disconnect();
  }, []);

  return {
    disconnectSocket,
    joinRoom,
    leaveRoom,
    switchRooms,
    sendMessage,
    connectSocket,
  };
};

export default useSocket;
