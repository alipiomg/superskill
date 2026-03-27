import { X, MessageSquare, AudioLines } from 'lucide-react';

export default function ChatHeader({
  onClose,
  mode,
  onToggleMode,
  voiceMode,
  onToggleVoiceMode,
  isSpeaking,
  speechSupported,
}) {
  return (
    <div className="relative border-b border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-r from-forge-500/20 to-ember-500/10 pointer-events-none" />
      <div className="relative flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className={`text-lg ${isSpeaking ? 'animate-pulse' : ''}`} aria-hidden="true">&#x1F525;</span>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Forjito</h2>
            <p className="text-[11px] text-zinc-500">
              {voiceMode ? 'Modo conversación' : 'Tu asistente de La Forja'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Voice/Text mode toggle */}
          {speechSupported && (
            <button
              onClick={onToggleVoiceMode}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                voiceMode
                  ? 'bg-forge-500/20 text-forge-400 border border-forge-500/30'
                  : 'bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300'
              }`}
              title={voiceMode ? 'Cambiar a modo texto' : 'Cambiar a modo conversación'}
            >
              {voiceMode ? (
                <>
                  <AudioLines className="w-3 h-3" />
                  Voz
                </>
              ) : (
                <>
                  <MessageSquare className="w-3 h-3" />
                  Texto
                </>
              )}
            </button>
          )}

          {/* API mode toggle */}
          <button
            onClick={onToggleMode}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
              mode === 'api'
                ? 'bg-forge-500/20 text-forge-400 border border-forge-500/30'
                : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
            }`}
          >
            {mode === 'api' ? 'IA' : 'Offline'}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
