import React, { useState } from "react";

type UsernameModalProps = {
  onSubmit: (username: string) => void;
  onCancel: () => void;
};

const UsernameModal: React.FC<UsernameModalProps> = ({ onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Enter Your Name</h2>
        <p className="modal-description">
          Please enter your name to join the chat room
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Your name..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="modal-btn modal-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="modal-btn modal-btn-submit"
              disabled={!username.trim()}
            >
              Join Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
