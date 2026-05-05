/**
 * AIChatbot.tsx
 * Drop-in AI chatbot powered by Gemini — knows Alins's story, projects, and skills.
 * 
 * SETUP:
 * 1. Add to App.tsx: import { AIChatbot } from './components/AIChatbot';
 * 2. Place <AIChatbot /> anywhere inside the router (e.g. just before </div> in App.tsx)
 * 3. Ensure GEMINI_API_KEY is in your .env.local
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Sparkles, Bot } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are an AI assistant embedded in Alins Binu's personal portfolio website. 
You speak as a knowledgeable guide who knows everything about Alins.

ABOUT ALINS:
- Name: Alins Binu
- Location: Kattappana, Idukki, Kerala, India
- Currently: Final-year B.Tech Computer Science student at Amal Jyothi College of Engineering, Kanjirappally (APJ Abdul Kalam Technological University)
- Role: Flutter App Developer focused on Android & iOS
- Stack: Flutter, Dart, Firebase, React, TypeScript, Vite, Tailwind CSS, Three.js, GSAP, Framer Motion

PROJECTS:
1. Light Suvara - A Flutter + Firebase app for church community management (announcements, schedules, prayer requests). Live on Google Play Store. Built with co-developers Akhil Babu and Abin Varghese, guided by Dr. Juby Mathew.
2. Prism Studio (prismstudioai.vercel.app) - A React/Vite web app with 12+ AI tools: image generation, background removal, magic eraser, YouTube notes, text-to-speech, essay writer, PDF tools, deepfake detector, doc summarizer, image upscaler.
3. CarDash - A Flutter smartphone car dashboard replacing a built-in car screen. Features: live GPS speedometer, Google Maps integration, music shortcuts, Screen Wake Lock, night mode. Built entirely in Flutter/Dart with no external dependencies.

EDUCATION:
- 10th: Auxilium ICSE School, Kattappana (2019)
- +2: St. George HSS, Kattappana (2021)
- B.Tech CS: Amal Jyothi College (2021–present)

PERSONALITY:
- Passionate about crafting intentional, high-performance mobile products
- Obsessed with micro-interactions and motion design
- Interested in cars and the Indian automotive market
- From Kattappana — a small hill station in Idukki, Kerala

TONE: Be warm, concise, and personality-rich. Keep answers under 4 sentences unless asked for detail. Use natural language — no bullet walls unless listing things. If asked if you are AI, confirm you are an assistant built to represent Alins's portfolio. Never make up projects or experiences not listed above.`;

const SUGGESTIONS = [
  "What projects has Alins built?",
  "Tell me about CarDash",
  "What's his tech stack?",
  "Is he available to hire?",
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey! I'm Alins's AI assistant. Ask me anything about his projects, skills, or background 👋" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.0-flash',
        config: { systemInstruction: SYSTEM_PROMPT },
        history,
      });

      const response = await chat.sendMessage({ message: userMessage });
      const reply = response.text || "I couldn't find an answer to that. Try asking about Alins's projects or skills!";
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Try asking again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 2.5 }}
        className="fixed bottom-8 right-8 z-[500] w-16 h-16 rounded-full bg-[#0369a1] text-white flex items-center justify-center shadow-2xl hover:bg-[#0284c7] transition-colors group"
        aria-label="Open AI Chat"
      >
        <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
        <motion.span
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"
        />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[501] bg-black/10 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-28 right-8 z-[502] w-[380px] max-h-[600px] bg-white rounded-[28px] border border-black/[0.06] shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.05] bg-[#f8fafc]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0369a1] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#0a0a0a]">Ask about Alins</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                      <p className="text-[10px] text-[#64748b] font-mono">AI-powered · Always on</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center hover:bg-black/[0.08] transition-colors">
                  <X className="w-4 h-4 text-[#64748b]" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] px-4 py-3 rounded-[18px] text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#0369a1] text-white rounded-br-[6px]'
                        : 'bg-[#f1f5f9] text-[#0a0a0a] rounded-bl-[6px]'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#f1f5f9] px-4 py-3 rounded-[18px] rounded-bl-[6px] text-[13px] text-[#64748b] font-mono">
                      Thinking{dots}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions (shown when only 1 message) */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-[11px] px-3 py-1.5 bg-[#f1f5f9] rounded-full text-[#475569] hover:bg-[#0369a1] hover:text-white transition-colors font-medium"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 py-4 border-t border-black/[0.05] flex items-center gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Ask anything about Alins..."
                  className="flex-1 bg-[#f8fafc] rounded-full px-4 py-2.5 text-[13px] outline-none border border-black/[0.06] focus:border-[#0369a1] transition-colors"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-[#0369a1] flex items-center justify-center disabled:opacity-40 hover:bg-[#0284c7] transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
