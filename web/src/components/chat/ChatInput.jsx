import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic, Square } from 'lucide-react';

export default function ChatInput({
  onSend,
  chips,
  disabled,
  // Speech
  isListening,
  isSpeaking,
  transcript,
  onStartListening,
  onStopListening,
  voiceMode,
  speechSupported,
}) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isListening && !isSpeaking) inputRef.current?.focus();
  }, [isListening, isSpeaking]);

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
      {/* Quick chips */}
      {chips && chips.length > 0 && !isListening && !isSpeaking && (
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

      {/* Listening state — waveform + transcript */}
      {isListening && (
        <div className="mb-2 px-1">
          <div className="flex items-center gap-2 py-2">
            <div className="flex items-center gap-0.5">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-forge-500 rounded-full"
                  style={{
                    animation: `waveform 0.6s ease-in-out ${i * 0.08}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-forge-400 font-medium">
              {transcript || 'Escuchando...'}
            </span>
          </div>
          <style>{`
            @keyframes waveform {
              0% { height: 4px; opacity: 0.3; }
              100% { height: 18px; opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* Speaking state — Forjito is talking */}
      {isSpeaking && !isListening && (
        <div className="mb-2 px-1">
          <div className="flex items-center gap-2 py-2">
            <div className="w-2 h-2 rounded-full bg-forge-500 animate-pulse" />
            <span className="text-xs text-forge-400 font-medium">Forjito está hablando...</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Mic button — always visible if supported */}
        {speechSupported && (
          <button
            onClick={handleMicClick}
            disabled={disabled && !isListening}
            className={`shrink-0 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isListening
                ? 'w-10 h-10 bg-red-500/20 text-red-400 border-2 border-red-500/50 animate-pulse'
                : voiceMode
                  ? 'w-10 h-10 bg-forge-500/20 text-forge-400 border-2 border-forge-500/40 hover:bg-forge-500/30'
                  : 'w-9 h-9 bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-forge-500/40 hover:text-forge-400'
            }`}
            title={isListening ? 'Detener' : voiceMode ? 'Hablar (modo conversación)' : 'Hablar'}
          >
            {isListening ? (
              <Square className="w-3.5 h-3.5" />
            ) : (
              <Mic className={voiceMode ? 'w-5 h-5' : 'w-4 h-4'} />
            )}
          </button>
        )}

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || isListening || isSpeaking}
          placeholder={
            isListening
              ? 'Habla ahora...'
              : isSpeaking
                ? 'Forjito habla...'
                : voiceMode
                  ? 'Modo voz activo · también puedes escribir'
                  : 'Pregunta a Forjito...'
          }
          className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-forge-500/50 focus:ring-1 focus:ring-forge-500/25 transition-colors disabled:opacity-50"
        />

        {/* Send button */}
        {text.trim() && !isListening && !isSpeaking && (
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
