import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number; // 0 to 100+
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min(100, Math.max(0, width));
  
  let colorClass = "bg-[#10b981]"; // green
  if (width >= 100) colorClass = "bg-danger"; // red
  else if (width >= 80) colorClass = "bg-warning"; // amber

  return (
    <div className={cn("w-full bg-surface3 rounded-full h-2 overflow-hidden", className)}>
      <div 
        className={cn("h-full transition-all duration-600 ease-out rounded-full", colorClass)}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
