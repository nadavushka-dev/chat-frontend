import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { userSelectors } from "../store/selectors/user.selectors";
import { type Message } from "../models/rooms.model";

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const user = useSelector(userSelectors.user);

  const time = new Date(message.sentAt!).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isOwn = useMemo(() => {
    return message.senderId === user.id;
  }, []);

  return (
    <div className={`message ${isOwn ? "own" : ""}`}>
      <span className="message-sender">{message.sender?.name}</span>
      <div className="message-bubble">
        <p className="message-text">{message.body}</p>
      </div>
      <span className="message-time">{time}</span>
    </div>
  );
};

export default Message;
