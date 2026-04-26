import { cn } from '../../utils/cn';

interface EyebrowBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function EyebrowBadge({ children, className }: EyebrowBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-accent/10 border border-accent/20", className)}>
      <div className="w-1.5 h-1.5 rotate-45 bg-accent" />
      <span className="text-label text-accent">{children}</span>
    </div>
  );
}
