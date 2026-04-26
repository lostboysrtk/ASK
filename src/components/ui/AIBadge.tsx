import { cn } from '../../utils/cn';

interface AIBadgeProps {
  className?: string;
}

export function AIBadge({ className }: AIBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-badge bg-surface3 border border-border", className)}>
      <div className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
      </div>
      <span className="text-label text-text1">AI</span>
    </div>
  );
}
