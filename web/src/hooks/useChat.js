import { useState, useCallback, useEffect, useRef } from 'react';

const STORAGE_KEY = 'superskill-chat';
const MAX_MESSAGES = 100;
const DEBOUNCE_MS = 1000;

export function useChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_MESSAGES)));
      } catch { /* localStorage full or unavailable */ }
    }, DEBOUNCE_MS);
    return () => clearTimeout(debounceRef.current);
  }, [messages]);

  const addMessage = useCallback((role, text, extra = {}) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      role, // 'user' | 'assistant'
      text,
      timestamp: new Date().toISOString(),
      ...extra, // links, chips
    }]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { messages, addMessage, clearMessages, isOpen, setIsOpen, isTyping, setIsTyping };
}
