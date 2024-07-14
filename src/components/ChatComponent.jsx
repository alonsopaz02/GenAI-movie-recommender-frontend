import React, { useState, useEffect } from 'react';
import { sendMessage } from '../services/api';
import '../styles/ChatComponent.css';

const ChatComponent = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const response = await sendMessage(input);
    setMessages([...messages, { role: 'user', text: input }, { role: 'model', text: response.message }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;