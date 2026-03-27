import { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ChatInput({ onSend, chips, disabled }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-zinc-800">
      {chips && chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2 px-1">
          {chips.map((chip, i) => (
            <button
              key={i}
              onClick={() => !disabled && onSend(chip)}
              disabled={disabled}
              className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700 hover:border-forge-500/40 hover:text-forge-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Pregunta a Forjito..."
          className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-forge-500/50 focus:ring-1 focus:ring-forge-500/25 transition-colors disabled:opacity-50"
        />
        {text.trim() && (
          <button
            onClick={handleSend}
            disabled={disabled}
            className="w-9 h-9 rounded-xl bg-forge-500 hover:bg-forge-400 flex items-center justify-center shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
