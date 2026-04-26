import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface SpendChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
}

export function SpendChart({ data, dataKey, xAxisKey = "date" }: SpendChartProps) {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c8f135" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#c8f135" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888888', fontSize: 10 }}
            dy={10}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#101010', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}
            itemStyle={{ color: '#c8f135', fontFamily: 'DM Mono' }}
            labelStyle={{ color: '#888888', marginBottom: '4px' }}
          />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke="#c8f135" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAccent)" 
            animationDuration={600}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
