import type { Transaction, User, Budget } from '../types';

export const mockUser: User = {
  name: "Alex Chen",
  income: 8500,
  currency: "USD",
  subscription: "free"
};

export const mockBudgets: Budget[] = [
  { category: 'Food', limit: 400 },
  { category: 'Transport', limit: 200 },
  { category: 'Shopping', limit: 300 },
  { category: 'Entertainment', limit: 150 },
  { category: 'Health', limit: 150 },
  { category: 'Travel', limit: 300 },
  { category: 'Subscriptions', limit: 200 }
];

export const mockTransactions: Transaction[] = [
  { id: '1', description: 'Netflix', amount: 15.99, category: 'Subscriptions', date: '2024-10-01' },
  { id: '2', description: 'Spotify', amount: 9.99, category: 'Subscriptions', date: '2024-10-03' },
  { id: '3', description: 'Uber Eats', amount: 34.50, category: 'Food', date: '2024-10-05' },
  { id: '4', description: 'Amazon', amount: 89.00, category: 'Shopping', date: '2024-10-07' },
  { id: '5', description: 'Gym membership', amount: 55.00, category: 'Health', date: '2024-10-10' },
  { id: '6', description: 'Notion', amount: 16.00, category: 'Subscriptions', date: '2024-10-12' },
  { id: '7', description: 'Zomato', amount: 22.10, category: 'Food', date: '2024-10-14' },
  { id: '8', description: 'Electricity', amount: 78.00, category: 'Utilities', date: '2024-10-15' },
  { id: '9', description: 'Internet', amount: 49.00, category: 'Utilities', date: '2024-10-16' },
  { id: '10', description: 'Zara', amount: 120.00, category: 'Shopping', date: '2024-10-20' },
  { id: '11', description: 'ChatGPT Plus', amount: 20.00, category: 'Subscriptions', date: '2024-10-22' },
  { id: '12', description: 'Uber', amount: 18.40, category: 'Transport', date: '2024-10-25' },
  { id: '13', description: 'Starbucks', amount: 12.60, category: 'Food', date: '2024-10-28' },
  { id: '14', description: 'Netflix', amount: 15.99, category: 'Subscriptions', date: '2024-11-01' },
  { id: '15', description: 'Spotify', amount: 9.99, category: 'Subscriptions', date: '2024-11-03' },
  { id: '16', description: 'Delta Airlines', amount: 450.00, category: 'Travel', date: '2024-11-05' },
  { id: '17', description: 'Whole Foods', amount: 67.30, category: 'Food', date: '2024-11-08' },
  { id: '18', description: 'Apple iCloud', amount: 2.99, category: 'Subscriptions', date: '2024-11-10' },
  { id: '19', description: 'Gym', amount: 55.00, category: 'Health', date: '2024-11-10' },
  { id: '20', description: 'Uber Eats', amount: 41.20, category: 'Food', date: '2024-11-12' },
  { id: '21', description: 'Nike', amount: 95.00, category: 'Shopping', date: '2024-11-15' },
  { id: '22', description: 'Notion', amount: 16.00, category: 'Subscriptions', date: '2024-11-12' },
  { id: '23', description: 'IKEA', amount: 210.00, category: 'Shopping', date: '2024-11-18' },
  { id: '24', description: 'Electricity', amount: 82.00, category: 'Utilities', date: '2024-11-15' },
  { id: '25', description: 'Rapido', amount: 9.80, category: 'Transport', date: '2024-11-22' },
  { id: '26', description: 'Netflix', amount: 15.99, category: 'Subscriptions', date: '2024-12-01' },
  { id: '27', description: 'Spotify', amount: 9.99, category: 'Subscriptions', date: '2024-12-03' },
  { id: '28', description: 'Swiggy', amount: 28.50, category: 'Food', date: '2024-12-05' },
  { id: '29', description: 'Gym', amount: 55.00, category: 'Health', date: '2024-12-10' },
  { id: '30', description: 'ChatGPT Plus', amount: 20.00, category: 'Subscriptions', date: '2024-12-12' }
];
