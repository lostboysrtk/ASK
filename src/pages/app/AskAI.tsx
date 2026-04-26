import { useState, useRef, useEffect } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { askAIEngine } from '../../utils/aiEngine';
import { GlassCard } from '../../components/ui/GlassCard';
import { AIBadge } from '../../components/ui/AIBadge';
import type { ChatMessage } from '../../types';
import { ArrowUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTED_PROMPTS = [
  "What was my largest expense this month?",
  "How much did I spend on food?",
  "Am I on track with my savings goal?",
  "Show me my subscription costs"
];

export function AskAI() {
  const transactions = useFinanceStore(state => state.transactions);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const responseText = askAIEngine(text, transactions);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: responseText,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full relative pt-4">
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-32">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full pt-12 md:pt-24 px-4 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 border border-accent/20 shadow-[0_0_40px_rgba(200,241,53,0.15)]">
               <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-display-m mb-3">How can I help you today?</h1>
            <p className="text-body-l text-text2 max-w-lg mb-12">
              Ask questions about your spending, get deep insights, or ask for saving recommendations based on your local data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="p-4 rounded-card bg-surface border border-border text-left hover:border-accent/50 hover:bg-surface2 transition-all group"
                >
                  <p className="text-body-m text-text2 group-hover:text-text1 transition-colors">{prompt}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 px-2 md:px-0">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] flex flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    {msg.role === 'ai' && <AIBadge className="mb-1" />}
                    <div className={`p-4 rounded-[20px] ${
                      msg.role === 'user' 
                        ? 'bg-surface2 text-text1 rounded-tr-sm border border-border' 
                        : 'bg-surface text-text1 rounded-tl-sm border border-border'
                    }`}>
                      <p className="text-body-l leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] flex flex-col gap-2 items-start">
                    <AIBadge className="mb-1" />
                    <div className="p-5 rounded-[20px] bg-surface text-text1 rounded-tl-sm border border-border flex gap-1.5 items-center h-[56px]">
                      <span className="w-2 h-2 rounded-full bg-text3 animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.32s]"></span>
                      <span className="w-2 h-2 rounded-full bg-text3 animate-[bounce_1.4s_infinite_ease-in-out_both] [animation-delay:-0.16s]"></span>
                      <span className="w-2 h-2 rounded-full bg-text3 animate-[bounce_1.4s_infinite_ease-in-out_both]"></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-2 md:px-0">
        <GlassCard className="p-2 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(query);
            }}
            placeholder="Ask anything about your finances..."
            className="flex-1 bg-transparent border-none text-body-l text-text1 px-4 py-3 focus:outline-none focus:ring-0 placeholder-text3"
          />
          <button
            onClick={() => handleSend(query)}
            disabled={!query.trim()}
            className="w-12 h-12 rounded-full bg-accent hover:bg-accent2 text-bg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </GlassCard>
        <p className="text-center text-[11px] text-text3 mt-3">
          Ask AI processes your data locally. No information is sent to external servers.
        </p>
      </div>
    </div>
  );
}
