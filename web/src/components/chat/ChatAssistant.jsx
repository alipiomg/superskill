import { useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useProgress } from '../../hooks/useProgress';
import { processMessage } from '../../services/ruleEngine';
import { buildUserContext } from '../../services/contextBuilder';
import { quickChips as quickChipsMap } from '../../data/assistantKnowledge';
import { courseNodes } from '../../data/courseData';
import useSpeech from '../../hooks/useSpeech';
import ChatBubble from './ChatBubble';
import ChatPanel from './ChatPanel';

const defaultChips = ['Mi progreso', 'Siguiente lección', '¿Qué puedo hacer?'];

function getGreeting(progress, level) {
  if (!progress.startedAt) {
    return {
      role: 'assistant',
      text: '¡Bienvenido a La Forja! 🔥 Soy **Forjito**, tu ayudante de la forja. Estoy aquí para guiarte en el mundo de las skills. ¿Por dónde quieres empezar?',
      chips: ['¿Qué es un skill?', '¿Por dónde empiezo?', 'Ver curso'],
      timestamp: Date.now(),
    };
  }
  const pct = Math.round((progress.completedNodes.length / courseNodes.length) * 100);
  return {
    role: 'assistant',
    text: `¡Hola de nuevo, ${level.emoji} **${level.nombre}**! Llevas **${pct}%** del curso con **${progress.currentXp} XP**. ¿En qué te ayudo hoy?`,
    chips: ['Mi progreso', 'Siguiente lección', 'Crear un skill'],
    timestamp: Date.now(),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

let msgIdCounter = 0;

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('offline');
  const [hasUnread, setHasUnread] = useState(false);
  const initializedRef = useRef(false);

  const { progress, level } = useProgress();
  const location = useLocation();

  // Speech hook — voice input triggers handleSend, voice output reads responses
  const speech = useSpeech({
    lang: 'es-ES',
    onResult: (text) => {
      if (text.trim()) {
        handleSend(text.trim());
      }
    },
  });

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { ...msg, id: `msg-${++msgIdCounter}` }]);
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setHasUnread(false);

    if (!initializedRef.current) {
      initializedRef.current = true;
      const greeting = getGreeting(progress, level);
      addMessage(greeting);
      // In voice mode, speak greeting and then auto-listen
      if (speech.voiceMode) {
        speech.speak(greeting.text, { autoListenAfter: true });
      }
    }
  }, [progress, level, addMessage, speech]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    speech.stopSpeaking();
    speech.stopListening();
  }, [speech]);

  const handleSend = useCallback(
    async (text) => {
      addMessage({ role: 'user', text, timestamp: Date.now() });
      setIsTyping(true);

      // Simulate thinking delay
      await new Promise((r) => setTimeout(r, 300 + Math.random() * 500));

      try {
        const userContext = buildUserContext(progress, level);
        const response = processMessage(text, userContext, location.pathname);
        const assistantMsg = {
          role: 'assistant',
          text: response.text,
          links: response.links?.map((l) => ({ label: l.label, to: l.path })),
          chips: response.chips,
          timestamp: Date.now(),
        };
        addMessage(assistantMsg);

        // In voice mode: speak response, then auto-listen for next input
        if (speech.voiceMode) {
          speech.speak(response.text, { autoListenAfter: true });
        }
      } catch {
        addMessage({
          role: 'assistant',
          text: 'Ocurrió un error procesando tu mensaje. Intenta de nuevo. 🔥',
          timestamp: Date.now(),
        });
      } finally {
        setIsTyping(false);
      }
    },
    [progress, level, location.pathname, addMessage, speech],
  );

  const handleChipClick = useCallback(
    (chip) => {
      handleSend(chip);
    },
    [handleSend],
  );

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === 'offline' ? 'api' : 'offline'));
  }, []);

  // Derive contextual chips from current path
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const contextChips = quickChipsMap[basePath] || defaultChips;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            onSend={handleSend}
            onClose={handleClose}
            chips={contextChips}
            mode={mode}
            onToggleMode={toggleMode}
            onChipClick={handleChipClick}
            // Speech props
            voiceMode={speech.voiceMode}
            onToggleVoiceMode={speech.toggleVoiceMode}
            isSpeaking={speech.isSpeaking}
            isListening={speech.isListening}
            transcript={speech.transcript}
            onStartListening={speech.startListening}
            onStopListening={speech.stopListening}
            speechSupported={speech.supported}
          />
        )}
      </AnimatePresence>

      {!isOpen && <ChatBubble onClick={handleOpen} hasUnread={hasUnread} />}
    </>
  );
}
