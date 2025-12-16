import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import useSocket from "../hooks/useSocket";
import { createRoomThunk, getRoomsThunk } from "../store/thunks/chat.thunk";
import { useNavigate } from "react-router-dom";
import { chatSelectors } from "../store/selectors/chat.selectors";
import { userSelectors } from "../store/selectors/user.selectors";
import CreateRoomModal from "./CreateRoomModal";

const Homepage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rooms = useSelector(chatSelectors.rooms);
  const user = useSelector(userSelectors.user);
  const isLoading = useSelector(chatSelectors.isLoading);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { connectSocket, joinRoom } = useSocket();
  useEffect(() => {
    dispatch(getRoomsThunk());
    connectSocket();
  }, []);

  const handleJoinRoom = (roomId: number) => {
    joinRoom(roomId, () => {
      navigate(`/room/${roomId}`);
    });
  };

  const handleCreateRoom = async (name: string) => {
    if (!user.id) return;
    const result = await dispatch(
      createRoomThunk({ name, createBy: user.id }),
    ).unwrap();
    if (result) {
      setShowCreateModal(false);
      joinRoom(result.id, () => {
        navigate(`/room/${result.id}`);
      });
    }
  };

  return (
    <>
      <div className="homepage">
        <div className="hero">
          <h1 className="hero-title">Welcome to ChatApp</h1>
          <p className="hero-subtitle">
            Connect with others in real-time conversations
          </p>
        </div>
        <div className="rooms-section">
          <div className="section-header">
            <h2 className="section-title">Available Rooms</h2>
            <button
              className="create-room-btn"
              onClick={() => setShowCreateModal(true)}
            >
              + Create Room
            </button>
          </div>
          <div className="room-cards">
            {!!rooms &&
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="room-card"
                  onClick={() => handleJoinRoom(room.id)}
                >
                  <div className="room-card-icon">
                    {room.name === "general" && "💬"}
                    {room.name === "random" && "🎲"}
                    {room.name === "tech" && "💻"}
                    {room.name === "gaming" && "🎮"}
                    {room.name === "music" && "🎵"}
                  </div>
                  <h3 className="room-card-title">{room.name}</h3>
                  <p className="room-card-description">
                    Join the {room.name} discussion
                  </p>
                  <button className="room-card-btn">Join Room</button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {showCreateModal && (
        <CreateRoomModal
          onSubmit={handleCreateRoom}
          onCancel={() => setShowCreateModal(false)}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Homepage;
