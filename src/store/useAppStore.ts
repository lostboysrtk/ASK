import { create } from 'zustand';
import type { Transaction } from '../types';

interface AppState {
  transactions: Transaction[];
  financialScore: number;
  userName: string;
  monthlyIncome: number;
  isProcessing: boolean;
  budgets: Record<string, number>;
  addTransactions: (newTransactions: Transaction[]) => void;
  setUser: (name: string, income: number) => void;
  setProcessing: (status: boolean) => void;
  setBudget: (category: string, amount: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  transactions: [],
  financialScore: 50,
  userName: "User",
  monthlyIncome: 5000,
  isProcessing: false,
  budgets: {
    'Food & Dining': 800,
    'Transport': 300,
    'Shopping': 400,
    'Entertainment': 200,
    'Housing': 2000,
    'Utilities': 250,
  },
  addTransactions: (newTransactions) => set((state) => ({ transactions: [...state.transactions, ...newTransactions] })),
  setUser: (userName, monthlyIncome) => set({ userName, monthlyIncome }),
  setProcessing: (isProcessing) => set({ isProcessing }),
  setBudget: (category, amount) => set((state) => ({
    budgets: { ...state.budgets, [category]: amount }
  })),
}));
