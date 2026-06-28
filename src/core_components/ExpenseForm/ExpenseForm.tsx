"use client";

import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';import { InputField } from '../../component_library/InputField';
import { SelectInput, SelectOption } from '../../component_library/SelectInput';

export interface ExpenseFormProps {
  onSubmit: (transaction: {
    name: string;
    amount: number;
    category: "Software & Subscription" | "Housing & Rent" | "Food & Dining" | "Groceries" | "Utilities" | "Investment" | "Income" | "Other";
    date: string;
  }) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  const transactionTypes: SelectOption[] = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  // Exactly matches your shared strict category types definition
  const categories: SelectOption[] = [
    { value: 'Income', label: 'Salary & Freelance' },
    { value: 'Housing & Rent', label: 'Housing & Rent' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities & Bills' },
    { value: 'Software & Subscription', label: 'Software & Subscriptions' },
    { value: 'Investment', label: 'Investments' },
    { value: 'Other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !amount || !category) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const parsedAmount = parseFloat(amount);

    onSubmit({
      name: title.trim(),
      // Enforce signed values: if it's an expense, convert it to a negative number automatically
      amount: type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
      category: category as any,
      date: new Date().toISOString().split('T')[0], // Sets a valid current date string 'YYYY-MM-DD'
    });

    setTitle('');
    setAmount('');
    setCategory('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#333' }}>
        Add New Transaction
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputField
              label="Transaction Title"
              placeholder="e.g., Office Rent, Monthly Salary"
              value={title}
              onChange={setTitle}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputField
              label="Amount ($)"
              placeholder="0.00"
              type="number"
              value={amount}
              onChange={setAmount}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              label="Transaction Type"
              value={type}
              onChange={setType}
              options={transactionTypes}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <SelectInput
              label="Category"
              value={category}
              onChange={setCategory}
              options={categories}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            py: 1.2,
            borderRadius: 1.5,
            fontWeight: 'bold',
            textTransform: 'none',
            backgroundColor: '#3f51b5',
            '&:hover': { backgroundColor: '#303f9f' },
          }}
        >
          Save Transaction
        </Button>
      </Box>
    </Paper>
  );
}