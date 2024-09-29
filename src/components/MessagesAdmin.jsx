import { useState } from 'react';

function MessagesAdmin() {
  const [messages, setMessages] = useState([]);

  // In a real application, you would fetch messages from your backend here

  return (
    <div className="messages-admin">
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        messages.map((message, index) => (
          <div key={index} className="message">
            <h3>From: {message.name}</h3>
            <p>Email: {message.email}</p>
            <p>{message.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MessagesAdmin;