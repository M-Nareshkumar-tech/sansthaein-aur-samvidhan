'use client';

import { useState, useEffect, useRef } from 'react';

export function useAudio() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const stop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const speak = (text: string, lang: 'en' | 'hi' | 'ta') => {
    if (!synthRef.current) return;

    // Stop current speech first
    synthRef.current.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set voice and language parameters
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'ta') {
      utterance.lang = 'ta-IN';
    } else {
      utterance.lang = 'en-IN'; // Indian English voice if available
    }

    // Attempt to select correct voice
    const voices = synthRef.current.getVoices();
    const voice = voices.find(v => 
      lang === 'hi' 
        ? v.lang.startsWith('hi') 
        : lang === 'ta'
          ? v.lang.startsWith('ta')
          : v.lang.startsWith('en-IN') || v.lang.startsWith('en')
    );
    if (voice) {
      utterance.voice = voice;
    }

    // Set callbacks
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  return {
    speak,
    stop,
    isSpeaking,
  };
}
