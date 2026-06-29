"use client";

import React, { useState } from 'react';
import { SelectInput, SelectOption } from './SelectInput';
import { Box, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material';

export function SelectInputComposition() {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');
  const [simulateError, setSimulateError] = useState(false);

  // Synchronized directly with core business domain enums
  const budgetCategories: SelectOption[] = [
    { value: 'Housing & Rent', label: 'Housing & Rent' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities & Bills' },
    { value: 'Other', label: 'Other Accounts' },
  ];

  const transactionTypes: SelectOption[] = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, borderRadius: 2, bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#3f51b5' }}>
        Dropdown Selection Sandbox
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
        Interactive testing frame for verification of selection drop menu behaviors.
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
        error={simulateError && !category}
        helperText={simulateError && !category ? 'Please select an allocation ledger category account.' : ''}
      />

      <Box sx={{ mt: 1, pt: 2, borderTop: '1px dashed #e2e8f0' }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={simulateError} 
              onChange={(e) => setSimulateError(e.target.checked)} 
              color="primary"
            />
          }
          label={<Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>Simulate active validation errors</Typography>}
        />
      </Box>
    </Paper>
  );
}