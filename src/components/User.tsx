import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { chatSelectors } from "../store/selectors/chat.selectors";

interface UserProps {
  name: string;
  id: number;
}

const User: React.FC<UserProps> = ({ name, id }) => {
  const initial = name.charAt(0).toUpperCase();
  const onlineUsers = useSelector(chatSelectors.onlineUsers);

  const isOnline = useMemo(() => {
    return !!onlineUsers[id];
  }, [onlineUsers]);

  return (
    <li className="member-list-item">
      <div className="member-avatar">{initial}</div>
      <div className="member-info">
        <span className="member-name">{name} </span>
        {isOnline ? (
          <span className="member-status-text online">Online</span>
        ) : (
          <span className="member-status-text offline">Offline</span>
        )}
      </div>
      <span className="member-status"></span>
    </li>
  );
};

export default User;
