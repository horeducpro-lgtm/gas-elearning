"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, Cpu, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MentorIAPage() {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const brandColor = '#BE9B4B'; // Ton doré Elite

  const [messages, setMessages] = useState([
    { 
      id: 1, 
      role: 'assistant', 
      content: "Bonjour. Je suis votre Mentor IA Elite. Expert en architecture durable et standards BIM 2026. Comment puis-je vous aider aujourd'hui ?" 
    }
  ]);

  // Auto-scroll vers le bas à chaque message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulation réponse IA
    setTimeout(() => {
      const assistantMsg = { 
        id: Date.now() + 1, 
        role: 'assistant', 
        content: "C'est une analyse pertinente. En intégrant ces paramètres dès la phase de conception, vous optimisez non seulement la performance thermique mais aussi la valeur patrimoniale du projet." 
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              Mentor <span style={{ color: brandColor }}>IA Elite</span>
            </h1>
            <p className="text-sm text-gray-500 font-medium">Connecté au réseau GAS Global</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold flex items-center gap-2 border border-green-100">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> SYSTÈME ACTIF
          </span>
        </div>
      </header>

      {/* Zone de Chat */}
      <div className="flex-1 bg-white border border-gray-100 rounded-[32px] shadow-sm mb-4 overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-900' : ''}`} 
                   style={msg.role === 'assistant' ? { backgroundColor: `${brandColor}15` } : {}}>
                {msg.role === 'assistant' ? <Sparkles size={20} color={brandColor} /> : <UserIcon size={20} color="white" />}
              </div>
              <div className={`p-4 rounded-2xl max-w-[75%] ${msg.role === 'user' ? 'bg-gray-900 text-white rounded-tr-none' : 'bg-gray-50 text-gray-700 rounded-tl-none border border-gray-100'}`}>
                <p className="text-sm leading-relaxed font-medium">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${brandColor}15` }}>
                <Bot size={20} color={brandColor} />
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-none border border-gray-100">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barre d'entrée */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-50 bg-gray-50/30">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question technique..."
              className="w-full p-4 pr-14 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#BE9B4B] focus:border-transparent outline-none transition-all"
            />
            <button type="submit" className="absolute right-2 p-3 rounded-xl bg-gray-900 text-white hover:scale-105 transition-transform disabled:opacity-50" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-3 opacity-40">
             <span className="text-[9px] font-bold tracking-widest flex items-center gap-1"><Cpu size={10}/> GPT-4 ELITE</span>
             <span className="text-[9px] font-bold tracking-widest flex items-center gap-1"><ShieldCheck size={10}/> VAULT ENCRYPTED</span>
          </div>
        </form>
      </div>
    </div>
  );
}

// Petit composant icône utilisateur simple
function UserIcon({ size, color }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}