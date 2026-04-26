import type { Transaction } from '../types';

export const askAIEngine = (query: string, transactions: Transaction[]): string => {
  const normalizedQuery = query.toLowerCase();
  
  if (normalizedQuery.includes('largest') || normalizedQuery.includes('biggest')) {
    if (transactions.length === 0) return "You have no transactions to analyze.";
    const maxTx = transactions.reduce((max, t) => t.amount > max.amount ? t : max, transactions[0]);
    return `Your largest expense was ${maxTx.description} at $${maxTx.amount.toFixed(2)}.`;
  }
  
  if (normalizedQuery.includes('food')) {
    const total = transactions.filter(t => t.category === 'Food').reduce((sum, t) => sum + t.amount, 0);
    return `You spent $${total.toFixed(2)} on food.`;
  }

  if (normalizedQuery.includes('savings') || normalizedQuery.includes('track')) {
    return `Based on your recent transactions, your savings rate is looking solid. Check the dashboard score for details.`;
  }

  if (normalizedQuery.includes('subscription') || normalizedQuery.includes('subs')) {
    const subTxs = transactions.filter(t => t.category === 'Subscriptions');
    const total = subTxs.reduce((sum, t) => sum + t.amount, 0);
    return `I found ${subTxs.length} subscription transactions totaling $${total.toFixed(2)}.`;
  }

  if (normalizedQuery.includes('total') || normalizedQuery.includes('spend') || normalizedQuery.includes('spent')) {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return `Your total spend is $${total.toFixed(2)}.`;
  }

  return `I found ${transactions.length} transactions. Your total spend is $${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}.`;
};
