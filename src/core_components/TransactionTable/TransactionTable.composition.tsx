"use client";

import React, { useState } from 'react';
import { TransactionTable, Transaction } from './TransactionTable';
import { Box, Typography } from '@mui/material';

const initialMockData: Transaction[] = [
  { id: '1', title: 'Monthly Paycheck', amount: 4500, type: 'income', category: 'salary', date: '2026-06-01' },
  { id: '2', title: 'Whole Foods Groceries', amount: 184.5, type: 'expense', category: 'groceries', date: '2026-06-03' },
  { id: '3', title: 'Apartment Rent Payment', amount: 1500, type: 'expense', category: 'housing', date: '2026-06-05' },
];

export function TransactionTableComposition() {
  const [data, setData] = useState<Transaction[]>(initialMockData);

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 850, mx: 'auto', backgroundColor: '#fafafa', borderRadius: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: '#666', fontWeight: 'bold' }}>
        LEDGER SYSTEM SANDBOX PREVIEW
      </Typography>
      <TransactionTable transactions={data} onDelete={handleDelete} />
    </Box>
  );
}