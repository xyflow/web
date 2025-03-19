'use client';

import { useEffect, useRef } from 'react';

type ProgressBarProps = {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
};

export default function ProgressBar({
  duration,
  isActive,
  onComplete,
}: ProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !progressBarRef.current) return;

    let startTime: number;
    let animationFrameId: number;

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progress}%`;
      }

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, isActive, onComplete]);

  return (
    <div className="h-1.5 rounded bg-black/20">
      <div
        ref={progressBarRef}
        className="h-full rounded bg-gradient-to-r from-accent/40 to-accent/70 transition-all duration-200 ease-linear"
        style={{ width: '0%' }}
      />
    </div>
  );
}
