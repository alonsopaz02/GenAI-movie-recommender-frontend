import React, { useState } from 'react';
import { sendMessage } from '../services/api';
import '../styles/ChatComponent.css';

const ChatComponent = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages || []);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return; // Evita enviar mensajes vacíos
    const response = await sendMessage(input);
    setMessages([...messages, { role: 'user', text: input }, { role: 'model', text: response.message }]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const formatMessage = (message) => {
    // Dividir el mensaje en párrafos y luego procesar cada párrafo
    const paragraphs = message.split('\n\n');
    return (
      <div>
        {paragraphs.map((paragraph, index) => (
          <p className="letras" key={index} dangerouslySetInnerHTML={{ __html: processParagraph(paragraph) }} />
        ))}
      </div>
    );
  };

  const processParagraph = (paragraph) => {
    // Usar expresión regular para encontrar y formatear texto en negrita
    const boldPattern = /\*\*(.*?)\*\*/g;
    return paragraph.replace(boldPattern, '<strong>$1</strong>');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <span className='texto'>{typeof msg.text === 'string' ? formatMessage(msg.text) : msg.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatComponent;