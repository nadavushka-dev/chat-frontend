import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { chatSelectors } from "../store/selectors/chat.selectors";

const MessageList: React.FC = () => {
  const messages = useSelector(chatSelectors.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {!!messages.length &&
        messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
