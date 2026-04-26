import { ArrowUpRight, ArrowDownRight, CreditCard } from 'lucide-react';
import type { Transaction } from '../../types';
import { cn } from '../../utils/cn';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const isSpend = transaction.amount >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-surface hover:bg-surface2 border-b border-border transition-colors group first:rounded-t-card last:rounded-b-card last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface3 flex items-center justify-center text-text2 group-hover:text-text1 transition-colors">
          <CreditCard className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-body-m font-medium text-text1">{transaction.description}</span>
          <span className="text-mono text-text3">{transaction.category} • {transaction.date}</span>
        </div>
      </div>
      <div className={cn("flex items-center gap-2 font-mono", isSpend ? "text-text1" : "text-accent")}>
        {isSpend ? <ArrowDownRight className="w-4 h-4 text-text3" /> : <ArrowUpRight className="w-4 h-4 text-accent" />}
        ${Math.abs(transaction.amount).toFixed(2)}
      </div>
    </div>
  );
}
