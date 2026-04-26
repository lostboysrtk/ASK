import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface ScoreRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ScoreRing({ score, size = 120, strokeWidth = 8, className }: ScoreRingProps) {
  const [offset, setOffset] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useEffect(() => {
    // Animate from 0 to actual score on mount
    const timer = setTimeout(() => {
      const progress = score / 100;
      setOffset(circumference - progress * circumference);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        {/* Track */}
        <circle
          className="text-surface3"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Fill */}
        <circle
          className="text-accent transition-all duration-[1200ms] ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset === 0 ? circumference : offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-display-m text-text1">{score}</span>
        <span className="text-label text-text3">/ 100</span>
      </div>
    </div>
  );
}
