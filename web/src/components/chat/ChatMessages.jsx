import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';

function TypingIndicator() {
  return (
    <div className="flex gap-2 justify-start">
      <div className="w-7 h-7 rounded-full bg-forge-500/15 flex items-center justify-center shrink-0 mt-1 text-sm">
        <span aria-hidden="true">&#x1F525;</span>
      </div>
      <div className="px-4 py-3 bg-forge-500/10 border border-forge-500/20 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-forge-400"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WelcomeState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forge-500 to-ember-500 flex items-center justify-center mb-4 shadow-lg shadow-forge-500/25">
        <span className="text-3xl">&#x1F525;</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">Hola, soy Forjito</h3>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-[260px]">
        Tu asistente personal de La Forja. Pregunta lo que necesites sobre skills, plugins o tu progreso.
      </p>
    </div>
  );
}

export default function ChatMessages({ messages, onChipClick, isTyping }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col overflow-y-auto">
        <WelcomeState />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      {messages.map((msg, i) => (
        <ChatMessage key={msg.id || i} message={msg} onChipClick={onChipClick} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
