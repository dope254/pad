// src/components/DesignPad/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export const ChatBox = () => {
  const [messages, setMessages] = useState([{ text: 'How may I assist you today?', type: 'ai', loading: true }]);
  const [input, setInput] = useState('');
  const chatContentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((msgs) =>
        msgs.map((msg, i) => (i === 0 ? { ...msg, loading: false } : msg))
      );
    }, 2000); // Simulate loading effect for the initial message

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessages = [
      ...messages,
      { text: input, type: 'user' },
      { text: 'Create new project', type: 'ai' }
    ];
    
    setMessages(newMessages);
    setInput('');
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.type}-message glass`}>
            {msg.loading ? <span className="loading-dot">•••</span> : msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
        <button className="mic-button">
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      </div>
    </div>
  );
};
