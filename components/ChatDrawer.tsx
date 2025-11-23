
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Cpu } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithAI } from '../services/geminiService';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Hi! I\'m here to help you with food combos. Ask me anything!', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await chatWithAI(history, userMsg.text);
      
      // Simulate typing delay for effect
      setTimeout(() => {
        const aiMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText || "Error processing request.",
            timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiMsg]);
        setIsLoading(false);
      }, 600);

    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Connection interruption detected. Please verify API Key configuration.",
        timestamp: Date.now()
      }]);
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-[450px] bg-slate-900 border-l border-slate-700 z-50 shadow-2xl transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          
          {/* Header */}
          <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/95 backdrop-blur">
            <div className="flex items-center gap-3">
              <Cpu className="text-cyan-500" size={20} />
              <h3 className="font-bold text-slate-200">AI Help</h3>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                  ${msg.role === 'model' ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-800' : 'bg-slate-800 text-slate-300 border border-slate-700'}
                `}>
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`
                  max-w-[80%] p-4 rounded-xl text-sm leading-relaxed
                  ${msg.role === 'model' 
                    ? 'bg-slate-800/50 border border-slate-700/50 text-slate-300 rounded-tl-none' 
                    : 'bg-cyan-950/30 border border-cyan-900/30 text-cyan-100 rounded-tr-none'}
                `}>
                  <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-cyan-900/50 border border-cyan-800 flex items-center justify-center">
                    <Bot size={16} className="text-cyan-400" />
                 </div>
                 <div className="flex items-center gap-1 bg-slate-800/50 px-4 py-3 rounded-xl rounded-tl-none">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-800 bg-slate-900">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about nutrients..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-sans placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-cyan-300 disabled:opacity-30 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-slate-600 mt-2 text-center font-sans">
              AI responses generated by Gemini 2.5. Verify critical health data.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};