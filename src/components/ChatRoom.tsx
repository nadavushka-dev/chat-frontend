import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import useSocket from "../hooks/useSocket";
import { chatSelectors } from "../store/selectors/chat.selectors";
import { useAppDispatch } from "../store";
import {
  getRoomMessagesThunk,
  getRoomParticipantsThunk,
} from "../store/thunks/chat/chat.thunk";

const ChatRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentRoom = useSelector(chatSelectors.selectoedRoom);

  const { leaveRoom } = useSocket();

  useEffect(() => {
    if (!currentRoom?.id) return;
    dispatch(getRoomMessagesThunk({ roomId: currentRoom?.id }));
    dispatch(getRoomParticipantsThunk({ roomId: currentRoom?.id }));
  }, [currentRoom?.id]);

  useEffect(() => {
    return () => {
      if (!currentRoom) return;
      leaveRoom(currentRoom.id);
    };
  }, []);

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2># {currentRoom?.name}</h2>
      </div>
      <MessageList />
      <MessageInput currentRoomId={currentRoom?.id} />
    </div>
  );
};

export default ChatRoom;
