import { useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { detectSubscriptions } from '../../utils/subscriptionDetector';
import { GlassCard } from '../../components/ui/GlassCard';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { RefreshCw, SearchX } from 'lucide-react';

export function Subscriptions() {
  const transactions = useFinanceStore(state => state.transactions);
  
  const subscriptions = useMemo(() => {
    return detectSubscriptions(transactions);
  }, [transactions]);
  
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <header className="mb-4">
        <EyebrowBadge className="mb-4">RECURRING BILLS</EyebrowBadge>
        <h1 className="text-display-l mb-2">Subscriptions</h1>
        <p className="text-body-l text-text2 max-w-2xl">
          Automatically detect and track your recurring payments so you never pay for forgotten services.
        </p>
      </header>

      {subscriptions.length === 0 ? (
        <GlassCard className="flex flex-col items-center justify-center py-24 text-center border-dashed">
           <SearchX className="w-12 h-12 text-text3 mb-4" />
           <h3 className="text-display-m mb-2">No subscriptions found</h3>
           <p className="text-body-m text-text2 max-w-md">
             Upload a CSV of your recent bank statements to let ASK detect your recurring payments.
           </p>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <GlassCard className="col-span-1 lg:col-span-4 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden bg-accent/5 border-accent/20">
            <h2 className="text-label text-text3 mb-4">MONTHLY RECURRING TOTAL</h2>
            <div className="mb-6">
              <span className="text-display-l text-accent">${totalMonthly.toFixed(2)}</span>
            </div>
            <div className="px-3 py-1.5 rounded-pill bg-surface border border-border text-body-m text-text1 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-accent" />
              {subscriptions.length} active services
            </div>
          </GlassCard>

          <div className="col-span-1 lg:col-span-8 flex flex-col gap-4">
            {subscriptions.map((sub, idx) => (
              <GlassCard key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface2 border border-border flex items-center justify-center text-display-m text-text1 group-hover:border-accent transition-colors">
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[18px] font-bold text-text1">{sub.name}</h4>
                    <p className="text-body-m text-text3 mt-0.5">Last charged: {sub.date}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-border">
                  <div className="text-left sm:text-right">
                    <p className="font-mono font-bold text-text1 text-lg">${sub.amount.toFixed(2)}</p>
                    <p className="text-label text-text3">/{sub.frequency.toLowerCase()}</p>
                  </div>
                  <button className="px-4 py-2 bg-transparent hover:bg-danger/10 text-text2 hover:text-danger rounded-btn text-body-m font-medium transition-colors border border-transparent hover:border-danger/20">
                    Cancel
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
