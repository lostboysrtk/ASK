import type { Transaction } from '../types';
import { cardDatabase } from '../data/cardDatabase';

export const getCardRecommendations = (transactions: Transaction[]) => {
  const categorySpend: Record<string, number> = {};
  
  transactions.forEach(t => {
    categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
  });
  
  // Sort categories by spend
  const topCategories = Object.entries(categorySpend)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 3);
    
  // Score each card
  const scoredCards = cardDatabase.map(card => {
    let netValue = 0;
    
    // Calculate total cashback
    transactions.forEach(t => {
      const rate = card.cashbackRates[t.category] || card.defaultRate;
      // Multiply by 12 to annualize (assuming data is 1 month, or just multiply flatly. For simplicity, we assume the data provided is 1 month and we multiply by 12 for annual)
      netValue += (t.amount * rate * 12);
    });
    
    // Subtract annual fee
    netValue -= card.annualFee;
    
    return {
      card,
      netValue: Math.round(netValue)
    };
  });
  
  // Sort by net value descending
  scoredCards.sort((a, b) => b.netValue - a.netValue);
  
  return {
    topCategories,
    recommendations: scoredCards.slice(0, 3)
  };
};
