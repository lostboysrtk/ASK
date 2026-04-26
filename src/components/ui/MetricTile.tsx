import { cn } from '../../utils/cn';

interface MetricTileProps {
  label: string;
  value: string | number;
  trend?: string;
  trendColor?: 'accent' | 'danger' | 'success' | 'warning';
  className?: string;
}

export function MetricTile({ label, value, trend, trendColor = 'accent', className }: MetricTileProps) {
  return (
    <div className={cn("flex flex-col gap-2 p-6 bg-surface border border-border rounded-card hover:border-border2 transition-colors", className)}>
      <span className="text-text2 text-mono uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-3">
        <span className="text-display-m text-accent">{value}</span>
        {trend && (
          <span className={cn("text-label px-2 py-1 rounded-badge bg-surface2 border border-border", `text-${trendColor}`)}>
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
