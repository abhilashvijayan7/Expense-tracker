"use client";

import React from 'react';
import { ExpenseForm } from './ExpenseForm';
import { Box, Typography } from '@mui/material';

export function ExpenseFormComposition() {
  const handleMockSubmit = (data: any) => {
    console.log('🚀 [Form Submission Capture Debugger]:', data);
    alert(`Captured Form Data Elements:\n\nTitle: ${data.title}\nAmount: $${data.amount}\nType: ${data.type}\nCategory: ${data.category}`);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 650, mx: 'auto', backgroundColor: '#f5f5f5', borderRadius: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, color: '#666', textAlign: 'center', letterSpacing: 1 }}>
        SANDBOX DEV ENVIRONMENT: CORE COMPONENT PREVIEW
      </Typography>
      <ExpenseForm onSubmit={handleMockSubmit} />
    </Box>
  );
}