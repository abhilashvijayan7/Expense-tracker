"use client";

import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grid as Grid } from '@mui/material'; 
import { InputField } from '../../component_library/InputField';
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

  const [errors, setErrors] = useState({ title: '', amount: '', category: '' });

  const transactionTypes: SelectOption[] = [
    { value: 'income', label: 'Income (+)' },
    { value: 'expense', label: 'Expense (-)' },
  ];

  const categories: SelectOption[] = [
    { value: 'Income', label: 'Salary & Freelance' },
    { value: 'Housing & Rent', label: 'Housing & Rent' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities & Bills' },
    { value: 'Software & Subscription', label: 'Software & Subscriptions' },
    { value: 'Investment', label: 'Investments' },
    { value: 'Other', label: 'Other' },
  ];

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: '', amount: '', category: '' };

    if (!title.trim()) {
      newErrors.title = 'Transaction title is required.';
      isValid = false;
    } else if (title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long.';
      isValid = false;
    }

    const parsedAmount = parseFloat(amount);
    if (!amount) {
      newErrors.amount = 'Amount value is required.';
      isValid = false;
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = 'Please enter a positive numeric value.';
      isValid = false;
    }

    if (!category) {
      newErrors.category = 'Please select a tracking account category.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; 

    const parsedAmount = parseFloat(amount);

    onSubmit({
      name: title.trim(),
      amount: type === 'expense' ? -Math.abs(parsedAmount) : Math.abs(parsedAmount),
      category: category as any,
      date: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setAmount('');
    setCategory('');
    setErrors({ title: '', amount: '', category: '' });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, backgroundColor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1e293b' }}>
        Add New Transaction
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputField
              label="Transaction Title"
              placeholder="e.g., Office Rent, Monthly Salary"
              value={title}
              onChange={(val) => { setTitle(val); setErrors(p => ({ ...p, title: '' })); }}
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <InputField
              label="Amount (₹)" 
              placeholder="0.00"
              type="number"
              value={amount}
              onChange={(val) => { setAmount(val); setErrors(p => ({ ...p, amount: '' })); }}
              error={!!errors.amount}
              helperText={errors.amount}
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
              onChange={(val) => { setCategory(val); setErrors(p => ({ ...p, category: '' })); }}
              options={categories}
              error={!!errors.category}
              helperText={errors.category}
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