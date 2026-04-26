import type { Card } from '../types';

export const cardDatabase: Card[] = [
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    annualFee: 95,
    cashbackRates: {
      'Travel': 0.05,
      'Food': 0.03,
      'Transport': 0.02,
    },
    defaultRate: 0.01,
    imageFallback: 'CSP',
  },
  {
    id: 'amex-gold',
    name: 'Amex Gold Card',
    annualFee: 250,
    cashbackRates: {
      'Food': 0.04,
      'Travel': 0.03,
    },
    defaultRate: 0.01,
    imageFallback: 'AMX',
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture',
    annualFee: 95,
    cashbackRates: {
      'Travel': 0.05,
    },
    defaultRate: 0.02,
    imageFallback: 'COV',
  },
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    annualFee: 0,
    cashbackRates: {},
    defaultRate: 0.02,
    imageFallback: 'CDC',
  },
  {
    id: 'discover-it',
    name: 'Discover it Cash Back',
    annualFee: 0,
    cashbackRates: {
      'Shopping': 0.05,
      'Food': 0.05,
    },
    defaultRate: 0.01,
    imageFallback: 'DIS',
  }
];
