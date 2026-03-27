import { motion } from 'framer-motion';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatPanel({
  messages,
  isTyping,
  onSend,
  onClose,
  chips,
  mode,
  onToggleMode,
  onChipClick,
  // Speech props
  voiceMode,
  onToggleVoiceMode,
  isSpeaking,
  isListening,
  transcript,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  speechSupported,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      className="
        fixed z-50
        bottom-20 right-6 w-[400px] h-[550px]
        max-lg:inset-0 max-lg:top-16 max-lg:bottom-0 max-lg:right-0 max-lg:w-full max-lg:h-auto max-lg:rounded-none
        bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl
        flex flex-col overflow-hidden
      "
    >
      <ChatHeader
        onClose={onClose}
        mode={mode}
        onToggleMode={onToggleMode}
        voiceMode={voiceMode}
        onToggleVoiceMode={onToggleVoiceMode}
        isSpeaking={isSpeaking}
        speechSupported={speechSupported?.recognition && speechSupported?.synthesis}
      />
      <ChatMessages messages={messages} onChipClick={onChipClick} isTyping={isTyping} />
      <ChatInput
        onSend={onSend}
        chips={chips}
        disabled={isTyping}
        isListening={isListening}
        isSpeaking={isSpeaking}
        transcript={transcript}
        onStartListening={onStartListening}
        onStopListening={onStopListening}
        onStopSpeaking={onStopSpeaking}
        voiceMode={voiceMode}
        onToggleVoiceMode={onToggleVoiceMode}
        speechSupported={speechSupported?.recognition}
      />
    </motion.div>
  );
}
