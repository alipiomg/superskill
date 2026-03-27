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
  const wantListeningRef = useRef(false); // tracks if we WANT to be listening

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
    recognition.continuous = true; // Keep listening until user stops
    recognition.maxAlternatives = 1;

    let silenceTimer = null;

    recognition.onresult = (event) => {
      const results = event.results;
      const last = results[results.length - 1];
      const text = last[0].transcript;

      setTranscript(text);

      // Clear any silence timer — user is speaking
      if (silenceTimer) clearTimeout(silenceTimer);

      if (last.isFinal) {
        // User finished a phrase — wait a moment for more, then send
        silenceTimer = setTimeout(() => {
          wantListeningRef.current = false;
          setIsListening(false);
          setTranscript('');
          try { recognition.stop(); } catch {}
          onResultRef.current?.(text);
        }, 1200); // 1.2s of silence after final result = done
      }
    };

    recognition.onerror = (event) => {
      if (event.error === 'no-speech') {
        // No speech detected — restart if we still want to listen
        if (wantListeningRef.current) {
          try { recognition.stop(); } catch {}
          // Will restart via onend
          return;
        }
      }
      if (event.error !== 'aborted') {
        console.warn('Speech recognition error:', event.error);
      }
      wantListeningRef.current = false;
      setIsListening(false);
      setTranscript('');
    };

    recognition.onend = () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      // If we still want to be listening, restart (handles no-speech timeout)
      if (wantListeningRef.current) {
        try {
          recognition.start();
        } catch {
          wantListeningRef.current = false;
          setIsListening(false);
        }
        return;
      }
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimer) clearTimeout(silenceTimer);
      wantListeningRef.current = false;
      recognition.abort();
    };
  }, [lang]);

  // Load voices (needed for some browsers)
  useEffect(() => {
    if (!synth) return;
    synth.getVoices();
    synth.onvoiceschanged = () => synth.getVoices();
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    // Cancel any ongoing speech so mic doesn't pick up Forjito's voice
    synth?.cancel();
    setIsSpeaking(false);
    setTranscript('');
    wantListeningRef.current = true;
    setIsListening(true);
    try {
      recognitionRef.current.start();
    } catch {
      // Already started — stop and restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch {}
        }, 100);
      } catch {
        wantListeningRef.current = false;
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    wantListeningRef.current = false;
    if (!recognitionRef.current) return;
    try { recognitionRef.current.stop(); } catch {}
    setIsListening(false);
    setTranscript('');
  }, []);

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
                wantListeningRef.current = true;
                setIsListening(true);
                try {
                  recognitionRef.current.start();
                } catch {
                  wantListeningRef.current = false;
                  setIsListening(false);
                }
              }
            }, 500);
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
        wantListeningRef.current = false;
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
