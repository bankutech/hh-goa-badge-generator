import confetti from 'canvas-confetti';

/**
 * Trigger celebratory multi-stage fireworks confetti for HH Goa 2026
 */
export const triggerGoaConfetti = () => {
  const colors = ['#f97316', '#ec4899', '#8b5cf6', '#00f2fe', '#f59e0b', '#ffffff'];

  // 1. Center pop
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: colors,
    ticks: 200,
    gravity: 1.1,
    scalar: 1.1,
  });

  // 2. Left side cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.15, y: 0.7 },
      colors: colors,
    });
  }, 150);

  // 3. Right side cannon
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.85, y: 0.7 },
      colors: colors,
    });
  }, 300);

  // 4. Golden stars sprinkle
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 100,
      origin: { y: 0.5 },
      shapes: ['star'],
      colors: ['#FFE000', '#FFA751', '#FFFFFF'],
      scalar: 1.3,
    });
  }, 450);
};
