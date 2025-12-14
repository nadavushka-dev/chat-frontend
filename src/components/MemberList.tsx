import React from "react";
import User from "./User";
import { useSelector } from "react-redux";
import { chatSelectors } from "../store/selectors/chat.selectors";

const MemberList: React.FC = () => {
  const participants = useSelector(chatSelectors.participants);

  return (
    <div className="member-list">
      <h2>Members</h2>
      {participants?.length === 0 ? (
        <p className="no-members">No members</p>
      ) : (
        <ul>
          {!!participants?.length &&
            participants.map((participant) => (
              <User
                id={participant.id!}
                key={participant.id}
                name={participant.name!}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default MemberList;
