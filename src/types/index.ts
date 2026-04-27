export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

export interface User {
  name: string;
  income: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'INR';
  subscription: 'free' | 'pro';
}

export interface Budget {
  category: string;
  limit: number;
}

export interface Card {
  id: string;
  name: string;
  annualFee: number;
  cashbackRates: Record<string, number>;
  defaultRate: number;
  imageFallback: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}
