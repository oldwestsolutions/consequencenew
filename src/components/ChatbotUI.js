import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  background: rgba(20, 12, 30, 0.3);
  border-radius: 8px;
`;

const Message = styled.div`
  padding: 0.75rem;
  border-radius: 8px;
  max-width: 85%;
  word-break: break-word;
  
  &.ai {
    align-self: flex-start;
    background: rgba(106, 27, 154, 0.4);
    border: 1px solid rgba(177, 157, 216, 0.3);
  }
  
  &.user {
    align-self: flex-end;
    background: rgba(80, 40, 150, 0.4);
    border: 1px solid rgba(177, 157, 216, 0.3);
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(20, 12, 30, 0.3);
`;

const ChatInput = styled.input`
  flex: 1;
  background: rgba(50, 30, 80, 0.3);
  border: 1px solid rgba(177, 157, 216, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: var(--color-text-primary);
  
  &:focus {
    outline: none;
    border-color: var(--color-accent-primary);
    box-shadow: var(--shadow-neon);
  }
`;

const SendButton = styled(motion.button)`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  color: white;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatbotUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm your music production assistant. How can I help you today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Simulate AI response (this would connect to a real endpoint later)
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        text: "I'm just a UI demo right now, but soon I'll be able to help with music production!", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map(message => (
          <Message key={message.id} className={message.sender}>
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <ChatInput
          type="text"
          placeholder="Ask about music production..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSendMessage}
          disabled={!input.trim()}
        >
          Send
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatbotUI; 