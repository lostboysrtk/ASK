import React from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "bg-surface border border-border rounded-card transition-all duration-150 hover:-translate-y-[2px] hover:border-border2 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
