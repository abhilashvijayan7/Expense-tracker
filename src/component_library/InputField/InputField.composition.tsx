"use client";

import React, { useState } from 'react';
import { InputField } from './InputField';
import { Box, Paper, Typography } from '@mui/material';

export function InputFieldFormComposition() {
  // Creating local temporary React state hooks to make our sandbox inputs interactive
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#3f51b5' }}>
        Sandbox Form Blueprint
      </Typography>

      {/* 1. Standard text input variation for the transaction label */}
      <InputField
        label="Transaction Name"
        placeholder="e.g. AWS Cloud Services"
        value={name}
        onChange={setName}
      />

      {/* 2. Numeric input variation for tracking money value amounts */}
      <InputField
        label="Amount ($)"
        placeholder="0.00"
        value={amount}
        onChange={setAmount}
        type="number"
      />

      {/* 3. Expandable Multiline textarea variation for optional notes */}
      <InputField
        label="Memo / Notes"
        placeholder="Optional details..."
        value={notes}
        onChange={setNotes}
        multiline={true}
        rows={3}
      />
    </Paper>
  );
}