import { useState, useRef, useEffect } from 'react';
import { ArrowUp, Mic, Square, AudioLines } from 'lucide-react';

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
  onStopSpeaking,
  voiceMode,
  onToggleVoiceMode,
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
      {/* Quick chips — hidden during voice interaction */}
      {chips && chips.length > 0 && !isListening && !isSpeaking && !voiceMode && (
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

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* VOICE MODE: Big prominent voice area                              */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {voiceMode && speechSupported && (
        <div className="mb-2">
          {/* Listening — waveform + live transcript */}
          {isListening && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="flex items-center gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-forge-500 to-ember-400 rounded-full"
                    style={{
                      animation: `waveform 0.5s ease-in-out ${i * 0.06}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-forge-300 font-medium text-center px-4">
                {transcript || 'Escuchando... habla ahora'}
              </p>
              <button
                onClick={handleMicClick}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Square className="w-3 h-3" />
                Detener
              </button>
              <style>{`
                @keyframes waveform {
                  0% { height: 6px; opacity: 0.3; }
                  100% { height: 24px; opacity: 1; }
                }
              `}</style>
            </div>
          )}

          {/* Speaking — Forjito is responding */}
          {isSpeaking && !isListening && (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-12 h-12 rounded-full bg-forge-500/15 flex items-center justify-center">
                <span className="text-2xl animate-pulse">🔥</span>
              </div>
              <p className="text-sm text-forge-300 font-medium">Forjito está respondiendo...</p>
              <button
                onClick={onStopSpeaking}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                Saltar
              </button>
            </div>
          )}

          {/* Idle voice mode — big "Hablar con Forjito" button */}
          {!isListening && !isSpeaking && (
            <div className="flex flex-col items-center gap-3 py-3">
              <button
                onClick={handleMicClick}
                disabled={disabled}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-forge-500/20 to-ember-500/15 border border-forge-500/30 text-forge-300 font-semibold text-sm hover:from-forge-500/30 hover:to-ember-500/25 hover:border-forge-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Hablar con Forjito
              </button>
              <button
                onClick={onToggleVoiceMode}
                className="text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors cursor-pointer"
              >
                Cambiar a modo texto
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* TEXT MODE: Normal input + optional mic button                      */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      {!voiceMode && (
        <>
          {/* Listening indicator (when using mic in text mode) */}
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
                <button
                  onClick={handleMicClick}
                  className="ml-auto px-2 py-0.5 rounded text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 cursor-pointer"
                >
                  Parar
                </button>
              </div>
              <style>{`
                @keyframes waveform {
                  0% { height: 4px; opacity: 0.3; }
                  100% { height: 18px; opacity: 1; }
                }
              `}</style>
            </div>
          )}

          <div className="flex items-center gap-2">
            {/* Mic button */}
            {speechSupported && !isListening && (
              <button
                onClick={handleMicClick}
                disabled={disabled}
                className="w-9 h-9 shrink-0 rounded-xl bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-forge-500/40 hover:text-forge-400 flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                title="Hablar"
              >
                <Mic className="w-4 h-4" />
              </button>
            )}

            {/* Text input */}
            <input
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled || isListening}
              placeholder="Pregunta a Forjito..."
              className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-forge-500/50 focus:ring-1 focus:ring-forge-500/25 transition-colors disabled:opacity-50"
            />

            {/* Send button */}
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

          {/* "Hablar con Forjito" link to switch to voice mode */}
          {speechSupported && !isListening && (
            <button
              onClick={onToggleVoiceMode}
              className="mt-2 w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-zinc-500 hover:text-forge-400 transition-colors cursor-pointer"
            >
              <AudioLines className="w-3 h-3" />
              Hablar con Forjito por voz
            </button>
          )}
        </>
      )}

      {/* Text input always available in voice mode too */}
      {voiceMode && !isListening && !isSpeaking && (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="También puedes escribir..."
            className="flex-1 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-forge-500/50 focus:ring-1 focus:ring-forge-500/25 transition-colors disabled:opacity-50"
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
      )}
    </div>
  );
}
