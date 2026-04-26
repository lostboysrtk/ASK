import { useState, useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { TransactionRow } from '../../components/ui/TransactionRow';
import { BarChart, Bar, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts';
import { Download } from 'lucide-react';

export function Expenses() {
  const transactions = useFinanceStore(state => state.transactions);
  const [filterCat, setFilterCat] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(transactions.map(t => t.category)))];

  const filteredTransactions = useMemo(() => {
    let txs = [...transactions];
    if (filterCat !== 'All') {
      txs = txs.filter(t => t.category === filterCat);
    }
    return txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, filterCat]);

  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredTransactions.forEach(t => {
      // Group by category if 'All', else group by month or just category again
      const key = filterCat === 'All' ? t.category : t.date.slice(0, 7); // YYYY-MM
      grouped[key] = (grouped[key] || 0) + t.amount;
    });
    return Object.keys(grouped).map(key => ({ name: key, amount: grouped[key] }));
  }, [filteredTransactions, filterCat]);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Description,Amount,Category\n"
      + filteredTransactions.map(e => `${e.date},${e.description},${e.amount},${e.category}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-display-l">Expenses</h1>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-surface2 hover:bg-surface3 border border-border rounded-btn text-body-m transition-colors"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`px-4 py-1.5 rounded-pill text-body-m whitespace-nowrap border transition-colors ${
              filterCat === cat 
                ? 'bg-accent text-bg border-accent' 
                : 'bg-surface text-text2 border-border hover:bg-surface2'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <GlassCard className="col-span-1 lg:col-span-12 p-6 flex flex-col h-[400px]">
          <h2 className="text-display-m mb-6">Spending Breakdown</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888888', fontSize: 12 }} width={50} />
              <RechartsTooltip 
                cursor={{ fill: '#161616' }}
                contentStyle={{ backgroundColor: '#101010', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}
                itemStyle={{ color: '#c8f135', fontFamily: 'DM Mono' }}
              />
              <Bar dataKey="amount" fill="#c8f135" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div>
        <h2 className="text-display-m mb-4">Transactions List</h2>
        <div className="bg-surface rounded-card border border-border">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-text3">No transactions found for this filter.</div>
          ) : (
            filteredTransactions.map(tx => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
