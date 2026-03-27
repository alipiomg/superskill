import { useState, useCallback, useRef, useEffect } from 'react';

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;

/**
 * Hook for speech recognition (input) and speech synthesis (output).
 * - `startListening()` / `stopListening()` for voice input
 * - `speak(text)` for voice output
 * - `speakEnabled` toggle to auto-read assistant responses
 */
export default function useSpeech({ lang = 'es-ES', onResult } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState({ recognition: false, synthesis: false });

  const recognitionRef = useRef(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

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
      console.warn('Speech recognition error:', event.error);
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

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    // Cancel any ongoing speech so mic doesn't pick up Forjito's voice
    synth?.cancel();
    setIsSpeaking(false);
    setTranscript('');
    setIsListening(true);
    recognitionRef.current.start();
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
    setIsListening(false);
  }, [isListening]);

  // Pick a Spanish voice (prefer female for variety)
  const getSpanishVoice = useCallback(() => {
    if (!synth) return null;
    const voices = synth.getVoices();
    return (
      voices.find((v) => v.lang.startsWith('es') && v.name.includes('Female')) ||
      voices.find((v) => v.lang.startsWith('es')) ||
      voices[0] ||
      null
    );
  }, []);

  const speak = useCallback(
    (text) => {
      if (!synth || !text) return;

      // Strip markdown bold/italic for cleaner speech
      const clean = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/#{1,3}\s/g, '')
        .replace(/🔥|⚡|🎉|🏆|🔨|💡|🔍|✨|🌟|📚|🎯|🚀|💪|🛡️|🎮|📖/g, '');

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = 'es-ES';
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      const voice = getSpanishVoice();
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synth.speak(utterance);
    },
    [getSpanishVoice],
  );

  const stopSpeaking = useCallback(() => {
    synth?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleSpeak = useCallback(() => {
    setSpeakEnabled((prev) => !prev);
    if (speakEnabled) {
      // Turning off — stop current speech
      synth?.cancel();
      setIsSpeaking(false);
    }
  }, [speakEnabled]);

  return {
    // Recognition (input)
    isListening,
    transcript,
    startListening,
    stopListening,
    // Synthesis (output)
    isSpeaking,
    speakEnabled,
    speak,
    stopSpeaking,
    toggleSpeak,
    // Support flags
    supported,
  };
}
