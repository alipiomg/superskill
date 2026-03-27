import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic, MicOff, Square } from 'lucide-react';

export default function ChatInput({
  onSend,
  chips,
  disabled,
  isListening,
  transcript,
  onStartListening,
  onStopListening,
  speechSupported,
}) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Show live transcript in input while listening
  const displayText = isListening && transcript ? transcript : text;

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

  const handleMicClick = () => {
    if (isListening) {
      onStopListening?.();
    } else {
      onStartListening?.();
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

      {/* Waveform animation while listening */}
      {isListening && (
        <div className="flex items-center justify-center gap-1 py-2 mb-2">
          <span className="text-xs text-forge-400 mr-2">Escuchando...</span>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-forge-500 rounded-full"
              style={{
                animation: `waveform 0.8s ease-in-out ${i * 0.1}s infinite alternate`,
              }}
            />
          ))}
          <style>{`
            @keyframes waveform {
              0% { height: 6px; opacity: 0.4; }
              100% { height: 20px; opacity: 1; }
            }
          `}</style>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Mic button */}
        {speechSupported && (
          <button
            onClick={handleMicClick}
            disabled={disabled && !isListening}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-forge-500/40 hover:text-forge-400'
            }`}
            title={isListening ? 'Detener' : 'Hablar'}
          >
            {isListening ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-4 h-4" />}
          </button>
        )}

        <input
          ref={inputRef}
          type="text"
          value={displayText}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isListening}
          placeholder={isListening ? 'Habla ahora...' : 'Pregunta a Forjito...'}
          className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-forge-500/50 focus:ring-1 focus:ring-forge-500/25 transition-colors disabled:opacity-50"
        />
        {text.trim() && !isListening && (
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
