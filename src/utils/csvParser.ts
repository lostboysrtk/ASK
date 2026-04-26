import Papa from 'papaparse';
import type { Transaction } from '../types';

export const parseCSV = (file: File): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const transactions: Transaction[] = results.data.map((row: any, index: number) => {
            // Flexible matching for typical bank headers
            const dateStr = row['Date'] || row['Date '] || row['date'] || row['Transaction Date'] || '';
            const desc = row['Description'] || row['description'] || row['Memo'] || row['Name'] || 'Unknown';
            const amountStr = row['Amount'] || row['amount'] || row['Value'] || '0';
            const cat = row['Category'] || row['category'] || 'Other';
            
            const amount = parseFloat(String(amountStr).replace(/[^0-9.-]+/g, ""));
            
            return {
              id: `csv-${Date.now()}-${index}`,
              date: dateStr,
              description: desc,
              amount: isNaN(amount) ? 0 : Math.abs(amount), // Convert all to absolute for simplicity
              category: cat
            };
          });
          resolve(transactions);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};
