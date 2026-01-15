// src/components/AIMentor.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, XCircle } from 'lucide-react';

interface AIMentorProps {
  onClose: () => void;
  userName: string;
  userSkills: string[];
}

export default function AIMentor({ onClose, userName, userSkills }: AIMentorProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([
    { sender: 'ai', text: `Bonjour ! Je suis l'IA Mentor de ${userName}. Posez-moi une question sur son parcours, ses compétences (${userSkills.join(', ')}) ou ses réalisations.` }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
      setInput('');

      // Simuler une réponse de l'IA
      setTimeout(() => {
        let aiResponse = "Je n'ai pas la réponse à cette question pour le moment. Concentrons-nous sur les compétences de Jean.";
        if (userMessage.toLowerCase().includes("compétence")) {
            aiResponse = `${userName} est très compétent en ${userSkills[0]} et a également développé de solides bases en ${userSkills[1]}.`;
        } else if (userMessage.toLowerCase().includes("parcours")) {
            aiResponse = `Le parcours de ${userName} à l'Elite Academy a été marqué par une grande assiduité et l'obtention de plusieurs certifications, notamment en Architecture Durable.`;
        } else if (userMessage.toLowerCase().includes("aide")) {
            aiResponse = "Bien sûr, je suis là pour ça ! Comment puis-je vous aider concernant le profil de Jean ?";
        }
        setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const GOLD = "#BE9B4B";

  return (
    <div className="ai-mentor-modal-overlay">
      <div className="ai-mentor-modal-content">
        <button className="ai-mentor-close-btn" onClick={onClose}><XCircle size={24} /></button>
        <div className="ai-mentor-header">
          <Bot size={28} color={GOLD} />
          <h3>IA Mentor - Profil de {userName}</h3>
        </div>
        
        <div className="ai-mentor-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
              {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="ai-mentor-input-area">
          <input 
            type="text" 
            placeholder="Posez une question sur le profil..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend} className="send-btn">
            <Send size={20} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .ai-mentor-modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .ai-mentor-modal-content {
          background: #1e2a3b; border-radius: 20px; max-width: 500px; width: 90%;
          position: relative; padding: 25px; display: flex; flex-direction: column;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5); height: 80vh; max-height: 600px;
        }
        .ai-mentor-close-btn { position: absolute; top: 15px; right: 15px; background: none; border: none; cursor: pointer; color: #ccc; }
        .ai-mentor-close-btn:hover { color: white; }
        
        .ai-mentor-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: white; }
        .ai-mentor-header h3 { margin: 0; font-size: 20px; font-weight: 800; }

        .ai-mentor-messages { flex: 1; overflow-y: auto; padding-right: 10px; margin-bottom: 20px; }
        .message-bubble { 
          display: flex; align-items: flex-start; gap: 10px; margin-bottom: 15px;
          padding: 10px 15px; border-radius: 18px; line-height: 1.5; font-size: 14px;
        }
        .message-bubble.ai { background: rgba(190, 155, 75, 0.1); color: ${GOLD}; border-top-left-radius: 0; }
        .message-bubble.ai p { margin: 0; }
        .message-bubble.user { background: #3b82f6; color: white; border-bottom-right-radius: 0; margin-left: auto; flex-direction: row-reverse; }
        .message-bubble.user p { margin: 0; }
        .message-bubble.user svg { color: white; }

        .ai-mentor-input-area { display: flex; gap: 10px; }
        .ai-mentor-input-area input {
          flex: 1; background: #334155; border: 1px solid #475569; border-radius: 15px;
          padding: 12px 18px; color: white; outline: none; font-size: 15px;
        }
        .ai-mentor-input-area input::placeholder { color: #94A3B8; }
        .send-btn { 
          background: ${GOLD}; border: none; border-radius: 15px; 
          padding: 12px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: white; transition: background 0.2s;
        }
        .send-btn:hover { background: #a88a42; }
      `}</style>
    </div>
  );
}