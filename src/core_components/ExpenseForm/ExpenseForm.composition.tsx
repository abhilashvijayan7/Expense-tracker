"use client";

import React from 'react';
import { ExpenseForm } from './ExpenseForm';
import { Box, Typography } from '@mui/material';

export function ExpenseFormComposition() {
  const handleMockSubmit = (data: any) => {
    // Elegant background debugger streaming instead of layout breaking alert popups
    console.log('🚀 [Form Submission Capture Debugger Engine]:', {
      ...data,
      formattedAmount: data.amount >= 0 ? `₹${data.amount}` : `-₹${Math.abs(data.amount)}`
    });
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 650, mx: 'auto', backgroundColor: '#f8f9fa', borderRadius: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: '#64748b', textAlign: 'center', letterSpacing: 1, fontWeight: 600 }}>
        SANDBOX DEV ENVIRONMENT: CORE COMPONENT PREVIEW
      </Typography>
      <ExpenseForm onSubmit={handleMockSubmit} />
    </Box>
  );
}