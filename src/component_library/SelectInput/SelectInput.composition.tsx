"use client";

import React, { useState } from 'react';
import { SelectInput, SelectOption } from './SelectInput';
import { Box, Paper, Typography } from '@mui/material';

export function SelectInputComposition() {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  // Hardcoded mock collections mapping exactly to our FinTrack state requirements
  const budgetCategories: SelectOption[] = [
    { value: 'housing', label: 'Housing & Rent' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'utilities', label: 'Utilities & Bills' },
    { value: 'entertainment', label: 'Entertainment' },
  ];

  const transactionTypes: SelectOption[] = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
        Dropdown Selection Sandbox
      </Typography>

      {/* 1. Transaction Type Dropdown Selection */}
      <SelectInput
        label="Transaction Type"
        value={type}
        onChange={setType}
        options={transactionTypes}
      />

      {/* 2. Budget Category Dropdown Selection */}
      <SelectInput
        label="Budget Category"
        value={category}
        onChange={setCategory}
        options={budgetCategories}
      />
    </Paper>
  );
}