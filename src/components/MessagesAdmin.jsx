import { useState, useEffect } from 'react';
import axios from 'axios';

function MessagesAdmin() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/messages', {
        headers: { 'x-auth-token': token }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    }
  };

  const handleMessageClick = async (message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(`http://localhost:3000/api/messages/${message._id}/read`, {}, {
          headers: { 'x-auth-token': token }
        });
        fetchMessages();
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/messages/${messageId}/delete`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchMessages();
      if (selectedMessage && selectedMessage._id === messageId) {
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleRestoreMessage = async (messageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/messages/${messageId}/restore`, {}, {
        headers: { 'x-auth-token': token }
      });
      fetchMessages();
    } catch (error) {
      console.error('Error restoring message:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab === 'unread') return !message.isRead && !message.isDeleted;
    if (activeTab === 'deleted') return message.isDeleted;
    return !message.isDeleted;
  });

  return (
    <div className="messages-admin">
      <div className="messages-list">
        <div className="messages-tabs">
          <button 
            onClick={() => setActiveTab('unread')} 
            className={activeTab === 'unread' ? 'active' : ''}
          >
            Unread
          </button>
          <button 
            onClick={() => setActiveTab('all')} 
            className={activeTab === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('deleted')} 
            className={activeTab === 'deleted' ? 'active' : ''}
          >
            Deleted
          </button>
        </div>
        {filteredMessages.map(message => (
          <div 
            key={message._id} 
            className={`message-item ${!message.isRead ? 'unread' : ''}`}
            onClick={() => handleMessageClick(message)}
          >
            <h4>{message.name}</h4>
            <p>{message.message.substring(0, 50)}...</p>
            <span>{new Date(message.timestamp).toLocaleString()}</span>
            {activeTab !== 'deleted' ? (
              <button onClick={() => handleDeleteMessage(message._id)}>Delete</button>
            ) : (
              <button onClick={() => handleRestoreMessage(message._id)}>Restore</button>
            )}
          </div>
        ))}
      </div>
      <div className="message-content">
        {selectedMessage ? (
          <>
            <h3>From: {selectedMessage.name} ({selectedMessage.email})</h3>
            <p>{selectedMessage.message}</p>
            <span>Sent on: {new Date(selectedMessage.timestamp).toLocaleString()}</span>
          </>
        ) : (
          <p>Select a message to view its content</p>
        )}
      </div>
    </div>
  );
}

export default MessagesAdmin;