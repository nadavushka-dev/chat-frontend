import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";
import { userSelectors } from "../store/selectors/user.selectors";
import { Message } from "../models/rooms.model";

type MessageInputProps = {
  currentRoomId?: number;
};

const MessageInput = ({ currentRoomId }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const user = useSelector(userSelectors.user);

  const { sendMessage } = useSocket();

  const handleSendMessage = useCallback(() => {
    if (!currentRoomId) return;
    if (!user.username) return;
    if (!message.trim()) return;

    const messageToSend: Message = {
      body: message,
      senderId: user.id!,
      sentAt: new Date().toDateString(),
      roomId: currentRoomId,
    };
    sendMessage(messageToSend);
    setMessage("");
  }, [user, message, currentRoomId, sendMessage]);

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button onClick={handleSendMessage}>↑</button>
    </div>
  );
};

export default MessageInput;
