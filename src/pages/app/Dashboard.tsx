import { useFinanceStore } from '../../store/useFinanceStore';
import { calculateScore, detectAnomalies } from '../../utils/scoreCalc';
import { parseCSV } from '../../utils/csvParser';
import { MetricTile } from '../../components/ui/MetricTile';
import { ScoreRing } from '../../components/ui/ScoreRing';
import { SpendChart } from '../../components/ui/SpendChart';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { GlassCard } from '../../components/ui/GlassCard';
import { AlertTriangle, UploadCloud } from 'lucide-react';
import { useState } from 'react';

export function Dashboard() {
  const { transactions, user, setTransactions } = useFinanceStore();
  const [isDragging, setIsDragging] = useState(false);

  const score = calculateScore(transactions, user.income);
  const totalSpend = transactions.reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = Math.max(0, ((user.income - totalSpend) / user.income) * 100);
  const anomaly = detectAnomalies(transactions);

  // Group transactions by date for chart
  const groupedByDate: Record<string, number> = {};
  transactions.forEach(t => {
    groupedByDate[t.date] = (groupedByDate[t.date] || 0) + t.amount;
  });
  const chartData = Object.keys(groupedByDate)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map(date => ({ date, amount: groupedByDate[date] }));

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const handleFileUpload = async (file: File) => {
    try {
      const parsedTxs = await parseCSV(file);
      if (parsedTxs.length > 0) {
        setTransactions(parsedTxs);
      }
    } catch (e) {
      console.error("Failed to parse CSV", e);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      {/* Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricTile 
          label="Total Spend" 
          value={`$${totalSpend.toLocaleString(undefined, {minimumFractionDigits: 2})}`} 
          trend={totalSpend > user.income ? "-12%" : "On track"}
          trendColor={totalSpend > user.income ? 'danger' : 'success'}
        />
        <MetricTile 
          label="Monthly Income" 
          value={`$${user.income.toLocaleString()}`} 
          trend="Stable"
          trendColor="success"
        />
        <MetricTile 
          label="Savings Rate" 
          value={`${savingsRate.toFixed(1)}%`} 
        />
        <MetricTile 
          label="Anomalies" 
          value={anomaly ? 1 : 0} 
          trend={anomaly ? `⚠ 1 detected` : 'Clear'}
          trendColor={anomaly ? 'warning' : 'success'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Ring */}
        <GlassCard className="col-span-1 lg:col-span-4 p-8 flex flex-col items-center justify-center text-center relative">
          <h2 className="text-display-m mb-2">AI Financial Score</h2>
          <p className="text-body-m text-text2 mb-8">Based on savings rate + spending diversity</p>
          <ScoreRing score={score} size={180} strokeWidth={12} />
        </GlassCard>

        {/* Spend Chart */}
        <GlassCard className="col-span-1 lg:col-span-8 p-6 flex flex-col">
          <h2 className="text-display-m mb-6">Spending Trend</h2>
          <div className="flex-1 min-h-[250px]">
            <SpendChart data={chartData} dataKey="amount" />
          </div>
        </GlassCard>
      </div>

      {/* CSV Dropzone */}
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`w-full p-10 border-2 border-dashed rounded-card flex flex-col items-center justify-center transition-all cursor-pointer ${isDragging ? 'border-accent bg-surface2 shadow-[0_0_20px_rgba(200,241,53,0.1)]' : 'border-border bg-surface hover:border-border2'}`}
      >
        <UploadCloud className={`w-10 h-10 mb-4 ${isDragging ? 'text-accent' : 'text-text2'}`} />
        <p className="text-body-l font-medium text-text1">Drop your bank statement CSV here</p>
        <p className="text-body-m text-text3 mt-1">Accepted format: Date, Description, Amount, Category</p>
        <input 
          type="file" 
          accept=".csv" 
          className="hidden" 
          id="csv-upload"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
        />
        <label htmlFor="csv-upload" className="mt-4 px-6 py-2 bg-surface3 hover:bg-border2 rounded-btn text-body-m transition-colors">
          Browse Files
        </label>
      </div>

      {/* Anomaly Alert */}
      {anomaly && (
        <div className="bg-surface border border-border border-l-4 border-l-warning rounded-r-card p-5 flex items-start gap-4 animate-[shake_0.2s_ease-in-out]">
          <AlertTriangle className="w-6 h-6 text-warning shrink-0" />
          <div>
            <h3 className="text-body-l font-bold text-text1">Anomaly Detected</h3>
            <p className="text-body-m text-text2 mt-1">{anomaly.message}</p>
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      <div>
        <h2 className="text-display-m mb-4">Recent Transactions</h2>
        <div className="bg-surface rounded-card border border-border">
          {recentTransactions.map(tx => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}
