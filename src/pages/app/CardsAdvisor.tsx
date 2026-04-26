import { useMemo } from 'react';
import { useFinanceStore } from '../../store/useFinanceStore';
import { getCardRecommendations } from '../../utils/cardRecommender';
import { GlassCard } from '../../components/ui/GlassCard';
import { EyebrowBadge } from '../../components/ui/EyebrowBadge';
import { ArrowRight, Check } from 'lucide-react';

export function CardsAdvisor() {
  const transactions = useFinanceStore(state => state.transactions);
  
  const { topCategories, recommendations } = useMemo(() => {
    return getCardRecommendations(transactions);
  }, [transactions]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto">
      <header className="mb-4">
        <EyebrowBadge className="mb-4">AI ADVISOR</EyebrowBadge>
        <h1 className="text-display-l mb-2">Cards Advisor</h1>
        <p className="text-body-l text-text2 max-w-2xl">
          Based on your spending patterns, our algorithm evaluates top rewards cards to maximize your net annual value.
        </p>
      </header>

      <div className="mb-8">
        <h3 className="text-label text-text3 mb-3">YOUR TOP SPENDING CATEGORIES</h3>
        <div className="flex flex-wrap gap-2">
          {topCategories.map((cat, i) => (
             <div key={cat} className="px-4 py-2 bg-surface2 border border-border rounded-pill text-body-m font-medium">
               <span className="text-text3 mr-2">#{i+1}</span> {cat}
             </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, i) => (
          <GlassCard key={rec.card.id} className="p-6 flex flex-col relative overflow-hidden group">
            {i === 0 && (
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
            )}
            
            <div className="h-32 rounded-xl bg-gradient-to-br from-surface2 to-surface3 border border-border mb-6 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute w-64 h-64 bg-accent/5 rounded-full blur-3xl -top-10 -right-10" />
              <span className="text-display-m opacity-50 relative z-10">{rec.card.imageFallback}</span>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-text3">•••• •••• •••• {1000 + i*111}</div>
              <div className="absolute top-4 right-4 text-accent text-xs font-bold">ASK.</div>
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="text-display-m text-[20px]">{rec.card.name}</h3>
              {i === 0 && <span className="bg-accent/10 text-accent px-2 py-1 rounded-badge text-[10px] uppercase font-mono font-bold border border-accent/20">Top Match</span>}
            </div>
            
            <div className="text-body-m text-text2 mb-6">
              ${rec.card.annualFee} Annual Fee
            </div>

            <div className="bg-surface2 rounded-xl p-4 mb-6 border border-border">
               <p className="text-label text-text3 mb-1">EST. NET ANNUAL VALUE</p>
               <p className="text-display-m text-accent">+${rec.netValue}</p>
            </div>

            <div className="flex-1 space-y-3 mb-8">
              {Object.entries(rec.card.cashbackRates).map(([cat, rate]) => (
                 <div key={cat} className="flex items-center gap-2 text-body-m text-text2">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>{((rate as number) * 100).toFixed(1)}% on {cat}</span>
                 </div>
              ))}
              <div className="flex items-center gap-2 text-body-m text-text2">
                <Check className="w-4 h-4 text-accent shrink-0" />
                <span>{(rec.card.defaultRate * 100).toFixed(1)}% on everything else</span>
              </div>
            </div>

            <button className="w-full py-3 bg-accent hover:bg-accent2 text-bg font-bold rounded-btn transition-colors flex items-center justify-center gap-2 mt-auto">
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
