'use client';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiEffect() {
  useEffect(() => {
    // Single quick burst (like GPay)
    confetti({
      particleCount: 120, // Less sparkles
      spread: 80,         // Nice wide spread
      origin: { y: 0.7 }, // Starts slightly below center
      colors: ['#D4AF37', '#F3E5AB', '#ffffff', '#2A3423']
    });
  }, []);

  return null;
}
