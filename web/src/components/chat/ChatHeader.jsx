import { X, Volume2, VolumeOff } from 'lucide-react';

export default function ChatHeader({
  onClose,
  mode,
  onToggleMode,
  speakEnabled,
  onToggleSpeak,
  isSpeaking,
  speechSynthesisSupported,
}) {
  return (
    <div className="relative border-b border-zinc-800">
      <div className="absolute inset-0 bg-gradient-to-r from-forge-500/20 to-ember-500/10 pointer-events-none" />
      <div className="relative flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="text-lg" aria-hidden="true">&#x1F525;</span>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Forjito</h2>
            <p className="text-[11px] text-zinc-500">Tu asistente de La Forja</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Voice output toggle */}
          {speechSynthesisSupported && (
            <button
              onClick={onToggleSpeak}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                speakEnabled
                  ? 'text-forge-400 bg-forge-500/15'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800'
              } ${isSpeaking ? 'animate-pulse' : ''}`}
              title={speakEnabled ? 'Desactivar voz' : 'Activar voz'}
            >
              {speakEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeOff className="w-4 h-4" />}
            </button>
          )}

          {/* Mode toggle */}
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
