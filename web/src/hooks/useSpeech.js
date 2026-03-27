import { useState, useCallback, useRef, useEffect } from 'react';

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

/**
 * Hook de voz para Forjito con modo conversación.
 *
 * Modo conversación (voiceMode = true):
 *   Hablas → transcripción en chat → Forjito responde con voz →
 *   al terminar de hablar, auto-escucha de nuevo → conversación continua
 *
 * Modo texto (voiceMode = false):
 *   Escribes → Forjito responde solo texto (comportamiento normal)
 */
export default function useSpeech({ lang = 'es-ES', onResult } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState({ recognition: false, synthesis: false });

  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  const voiceModeRef = useRef(voiceMode);
  const autoListenAfterSpeakRef = useRef(false);

  onResultRef.current = onResult;
  voiceModeRef.current = voiceMode;

  // Check browser support
  useEffect(() => {
    setSupported({
      recognition: !!SpeechRecognition,
      synthesis: !!synth,
    });
  }, []);

  // Initialize recognition instance
  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const results = event.results;
      const last = results[results.length - 1];
      const text = last[0].transcript;

      setTranscript(text);

      if (last.isFinal) {
        setIsListening(false);
        setTranscript('');
        onResultRef.current?.(text);
      }
    };

    recognition.onerror = (event) => {
      // 'no-speech' is normal — user didn't say anything, not a real error
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        console.warn('Speech recognition error:', event.error);
      }
      setIsListening(false);
      setTranscript('');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [lang]);

  // Load voices (needed for some browsers)
  useEffect(() => {
    if (!synth) return;
    synth.getVoices(); // trigger load
    synth.onvoiceschanged = () => synth.getVoices();
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    // Cancel any ongoing speech so mic doesn't pick up Forjito's voice
    synth?.cancel();
    setIsSpeaking(false);
    setTranscript('');
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch {
      // Already started
      setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
    setIsListening(false);
    setTranscript('');
  }, [isListening]);

  // Pick a Spanish voice
  const getSpanishVoice = useCallback(() => {
    if (!synth) return null;
    const voices = synth.getVoices();
    return (
      voices.find((v) => v.lang.startsWith('es') && v.localService) ||
      voices.find((v) => v.lang.startsWith('es')) ||
      voices[0] ||
      null
    );
  }, []);

  /**
   * Speak text aloud. Returns a Promise that resolves when done.
   * If autoListenAfter is true, starts listening again after speaking.
   */
  const speak = useCallback(
    (text, { autoListenAfter = false } = {}) => {
      if (!synth || !text) return Promise.resolve();

      // Strip markdown and emojis for cleaner speech
      const clean = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/#{1,3}\s/g, '')
        .replace(/[🔥⚡🎉🏆🔨💡🔍✨🌟📚🎯🚀💪🛡️🎮📖🔧⚙️🧩📦🌐🎨]/g, '')
        .replace(/\n/g, '. ')
        .trim();

      if (!clean) return Promise.resolve();

      synth.cancel();
      autoListenAfterSpeakRef.current = autoListenAfter;

      return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.lang = 'es-ES';
        utterance.rate = 1.05;
        utterance.pitch = 1.05;
        utterance.volume = 1;

        const voice = getSpanishVoice();
        if (voice) utterance.voice = voice;

        utterance.onstart = () => setIsSpeaking(true);

        utterance.onend = () => {
          setIsSpeaking(false);
          resolve();
          // In voice mode, auto-listen again after Forjito finishes speaking
          if (autoListenAfterSpeakRef.current && voiceModeRef.current) {
            setTimeout(() => {
              if (voiceModeRef.current && recognitionRef.current) {
                setTranscript('');
                setIsListening(true);
                try {
                  recognitionRef.current.start();
                } catch {
                  setIsListening(false);
                }
              }
            }, 400); // Small pause before listening again
          }
        };

        utterance.onerror = () => {
          setIsSpeaking(false);
          resolve();
        };

        synth.speak(utterance);
      });
    },
    [getSpanishVoice],
  );

  const stopSpeaking = useCallback(() => {
    synth?.cancel();
    setIsSpeaking(false);
    autoListenAfterSpeakRef.current = false;
  }, []);

  const toggleVoiceMode = useCallback(() => {
    setVoiceMode((prev) => {
      const next = !prev;
      if (!next) {
        // Turning off voice mode — stop everything
        synth?.cancel();
        setIsSpeaking(false);
        autoListenAfterSpeakRef.current = false;
        if (recognitionRef.current) {
          try { recognitionRef.current.stop(); } catch {}
        }
        setIsListening(false);
        setTranscript('');
      }
      return next;
    });
  }, []);

  return {
    // Recognition (input)
    isListening,
    transcript,
    startListening,
    stopListening,
    // Synthesis (output)
    isSpeaking,
    speak,
    stopSpeaking,
    // Voice mode
    voiceMode,
    toggleVoiceMode,
    // Support flags
    supported,
  };
}
