"use client";

import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grid } from '@mui/material';
import { InputField } from '../../component_library/InputField';
import { SelectInput, SelectOption } from '../../component_library/SelectInput';

export interface ExpenseFormProps {
  onSubmit: (transaction: {
    title: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
  }) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');

  // Dropdown options matching our system architecture configuration
  const transactionTypes: SelectOption[] = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  const categories: SelectOption[] = [
    { value: 'salary', label: 'Salary & Freelance' },
    { value: 'housing', label: 'Housing & Rent' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'utilities', label: 'Utilities & Bills' },
    { value: 'entertainment', label: 'Entertainment' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic structural form validation
    if (!title.trim() || !amount || !category) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    onSubmit({
      title: title.trim(),
      amount: parseFloat(amount),
      type: type as 'income' | 'expense',
      category,
    });

    // Reset local form states cleanly after a successful submit event
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
          {/* Updated to modern MUI size prop layout object syntax */}
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