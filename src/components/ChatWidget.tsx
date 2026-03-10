import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { api } from '../api/client';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  ts: Date;
}

const SUGGESTIONS = [
  'What is the biggest problem in the city this week?',
  'Which neighborhood has the most high-severity complaints?',
  'What percentage of complaints are road-related?',
  'Show me recent waste management issues.',
];

export default function ChatWidget() {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: 'Hi! I\'m CityPulse AI. Ask me anything about citizen complaints, hotspots, or trends in Montgomery.',
      ts: new Date(),
    },
  ]);
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text, ts: new Date() }]);
    setLoading(true);
    try {
      const res = await api.insights.ask(text);
      setMessages(prev => [...prev, { role: 'assistant', text: res.answer, ts: new Date() }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, I couldn\'t reach the server. Please try again.',
        ts: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-13 h-13 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/50 flex items-center justify-center transition-all hover:scale-105"
        style={{ width: 52, height: 52 }}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ height: 480 }}>

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700 bg-gray-800/80">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">CityPulse AI</p>
              <p className="text-xs text-green-400">● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5 ${
                  m.role === 'assistant' ? 'bg-indigo-600' : 'bg-gray-700'
                }`}>
                  {m.role === 'assistant'
                    ? <Bot  className="w-3.5 h-3.5 text-white" />
                    : <User className="w-3.5 h-3.5 text-gray-300" />
                  }
                </div>
                <div className={`rounded-xl px-3 py-2 text-sm max-w-[75%] leading-relaxed ${
                  m.role === 'assistant'
                    ? 'bg-gray-800 text-gray-200'
                    : 'bg-indigo-600 text-white'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-gray-800 rounded-xl px-3 py-2 flex items-center gap-1.5 text-gray-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="text-xs">Thinking…</span>
                </div>
              </div>
            )}

            {/* Suggestions (show only when 1 message) */}
            {messages.length === 1 && !loading && (
              <div className="space-y-1 pt-1">
                <p className="text-xs text-gray-500">Try asking:</p>
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => send(s)}
                    className="w-full text-left text-xs text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg px-3 py-2 transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-700 bg-gray-800/50">
            <div className="flex gap-2 items-end">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }}}
                placeholder="Ask about city complaints…"
                rows={1}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 outline-none resize-none focus:border-indigo-500 transition"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 flex items-center justify-center transition shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
