import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { getRoomsThunk } from "../store/thunks/chat/chat.thunk";
import useSocket from "../hooks/useSocket";
import { chatSelectors } from "../store/selectors/chat.selectors";

const roomIcons: Record<string, string> = {
  general: "💬",
  random: "🎲",
  tech: "💻",
  gaming: "🎮",
  music: "🎵",
};

const RoomList: React.FC = () => {
  const dispatch = useAppDispatch();
  const rooms = useSelector(chatSelectors.rooms);
  const currentRoom = useSelector(chatSelectors.selectoedRoom);

  const { switchRooms } = useSocket();

  useEffect(() => {
    if (rooms?.length) return;
    dispatch(getRoomsThunk());
  }, [dispatch, rooms]);

  const handleJoinRoom = (roomId: number) => {
    switchRooms(currentRoom?.id!, roomId);
  };

  return (
    <div className="room-list">
      <h2>Channels</h2>
      <ul>
        {rooms?.map((room) => (
          <li
            key={room.id}
            onClick={() => handleJoinRoom(room.id)}
            className={currentRoom === room ? "active" : ""}
          >
            <span className="room-icon">{roomIcons[room.name] || "#"}</span>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
