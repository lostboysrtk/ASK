import { create } from 'zustand';
import type { Transaction, User, Budget } from '../types';
import { mockTransactions, mockUser, mockBudgets } from '../data/mockData';
import { supabase } from '../lib/supabase';
import type { Session } from '@supabase/supabase-js';

interface FinanceState {
  transactions: Transaction[];
  user: User;
  budgets: Budget[];
  session: Session | null;
  isLoading: boolean;
  
  // Actions
  setSession: (session: Session | null) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransactions: (transactions: Transaction[]) => void;
  updateUser: (user: Partial<User>) => void;
  updateBudget: (category: string, limit: number) => void;
  resetData: () => void;
  signOut: () => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  transactions: mockTransactions,
  user: mockUser,
  budgets: mockBudgets,
  session: null,
  isLoading: true,
  
  setSession: (session) => set({ session, isLoading: false }),
  setTransactions: (transactions) => set({ transactions }),
  addTransactions: (newTxs) => set((state) => ({ transactions: [...state.transactions, ...newTxs] })),
  updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
  updateBudget: (category, limit) => set((state) => ({
    budgets: state.budgets.map(b => b.category === category ? { ...b, limit } : b)
  })),
  resetData: () => set({
    transactions: mockTransactions,
    user: mockUser,
    budgets: mockBudgets
  }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, transactions: mockTransactions, budgets: mockBudgets });
  }
}));
