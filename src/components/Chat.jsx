import React, { useState, useEffect } from 'react';
import { sendMessage, getRecommendations } from '../services/api';
import '../styles/Chat.css';

function Chat({ preferences }) {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const recommendations = await getRecommendations(preferences);
        setChatHistory([...chatHistory, ...recommendations]);
      } catch (error) {
        console.error('Error getting recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [preferences]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    try {
      const responseData = await sendMessage(inputText);
      setChatHistory([...chatHistory, { text: inputText, fromUser: true }, { text: responseData, fromUser: false }]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.fromUser ? 'user-message' : 'ai-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;