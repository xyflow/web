'use client';

import { useState, useEffect, useCallback } from 'react';

export function useProgressBar(duration: number, isActive: boolean, onComplete: () => void) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let animationFrameId: number;

    const updateElapsed = () => {
      setElapsed((prev) => {
        const nextElapsed = prev + 16.66; // ~60 FPS
        if (nextElapsed >= duration) {
          onComplete();
          return 0;
        }
        return nextElapsed;
      });

      animationFrameId = requestAnimationFrame(updateElapsed);
    };

    animationFrameId = requestAnimationFrame(updateElapsed);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, isActive, onComplete]);

  const progress = (elapsed / duration) * 100;

  return progress;
}