import { useFinanceStore } from '../../store/useFinanceStore';
import { GlassCard } from '../../components/ui/GlassCard';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { Target, Wallet } from 'lucide-react';
import { useMemo } from 'react';

export function Budgets() {
  const { transactions, budgets, updateBudget } = useFinanceStore();

  const spendByCategory = useMemo(() => {
    return transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
  }, [transactions]);

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (spendByCategory[b.category] || 0), 0);
  const overallPercentage = Math.min(100, Math.round((totalSpent / totalBudgeted) * 100));

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <header className="mb-4">
        <EyebrowBadge className="mb-4">SPENDING CONTROLS</EyebrowBadge>
        <h1 className="text-display-l mb-2">Budget Planner</h1>
        <p className="text-body-l text-text2 max-w-2xl">
          Set proactive limits on your categories. Your progress updates automatically as you spend.
        </p>
      </header>

      {/* Summary Card */}
      <GlassCard className="p-6 mb-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-accent/20">
         <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
               <Wallet className="w-6 h-6" />
            </div>
            <div>
               <p className="text-label text-text3">TOTAL BUDGETED</p>
               <p className="text-display-m">${totalBudgeted.toLocaleString()}</p>
            </div>
         </div>
         <div className="flex-1 w-full max-w-md">
            <div className="flex justify-between text-body-m mb-2">
               <span className="text-text2">Total Spent</span>
               <span className="text-text1 font-mono">${totalSpent.toLocaleString()}</span>
            </div>
            <ProgressBar value={overallPercentage} className="h-3" />
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => {
          const spent = spendByCategory[budget.category] || 0;
          const percentage = Math.min(100, Math.round((spent / budget.limit) * 100));
          const isOverBudget = spent > budget.limit;

          return (
            <GlassCard key={budget.category} className="p-6 flex flex-col relative overflow-hidden">
               {isOverBudget && <div className="absolute top-0 left-0 w-full h-1 bg-danger" />}
               
               <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-lg ${isOverBudget ? 'bg-danger/10 text-danger' : 'bg-surface2 text-text1'}`}>
                       <Target className="w-5 h-5" />
                     </div>
                     <h3 className="text-[18px] font-bold">{budget.category}</h3>
                  </div>
                  <span className={`text-mono font-medium px-2 py-1 rounded-badge ${isOverBudget ? 'bg-danger/20 text-danger' : 'bg-surface2 text-text2'}`}>
                    {percentage}%
                  </span>
               </div>

               <div className="mb-8">
                 <div className="flex justify-between text-body-m mb-2 font-mono">
                   <span className="text-text1">${spent.toFixed(2)}</span>
                   <span className="text-text3">/ ${budget.limit}</span>
                 </div>
                 <ProgressBar value={percentage} />
               </div>

               <div className="mt-auto pt-4 border-t border-border flex flex-col gap-3">
                 <label className="text-label text-text3 flex justify-between">
                   <span>ADJUST LIMIT</span>
                   <span className="font-mono text-accent">${budget.limit}</span>
                 </label>
                 <input 
                   type="range" 
                   min="50" max="3000" step="50"
                   value={budget.limit}
                   onChange={(e) => updateBudget(budget.category, parseInt(e.target.value))}
                   className="w-full accent-accent h-1 bg-surface3 rounded-lg appearance-none cursor-pointer"
                 />
               </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
