import type { Transaction } from '../types';

const SUBSCRIPTION_KEYWORDS = [
  'netflix', 'spotify', 'apple', 'amazon prime', 'prime video', 'gym', 'fitness',
  'adobe', 'notion', 'figma', 'chatgpt', 'openai', 'slack', 'youtube premium',
  'disney+', 'hulu', 'hbo', 'microsoft', 'google one', 'icloud', 'dropbox', 'zoom'
];

export const detectSubscriptions = (transactions: Transaction[]) => {
  const subscriptions: { name: string; amount: number; date: string; frequency: string }[] = [];
  
  // Sort by most recent to get the latest date for a sub
  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  sorted.forEach(t => {
    const normalized = t.description.toLowerCase();
    
    if (SUBSCRIPTION_KEYWORDS.some(keyword => normalized.includes(keyword))) {
      // Find exact matched keyword or just use description
      const keyword = SUBSCRIPTION_KEYWORDS.find(k => normalized.includes(k));
      const subName = keyword ? keyword.charAt(0).toUpperCase() + keyword.slice(1) : t.description;
      
      // Prevent duplicates
      if (!subscriptions.some(s => s.name.toLowerCase() === subName.toLowerCase())) {
        subscriptions.push({
          name: subName,
          amount: t.amount,
          date: t.date,
          frequency: 'Monthly'
        });
      }
    }
  });
  
  return subscriptions;
};
