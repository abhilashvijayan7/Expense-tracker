"use client";

import React, { useState } from 'react';
import { InputField } from './InputField';
import { Box, Paper, Typography, FormControlLabel, Checkbox } from '@mui/material';

export function InputFieldFormComposition() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [showSandboxError, setShowSandboxError] = useState(false);

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, borderRadius: 2, bgcolor: '#ffffff' }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#3f51b5' }}>
        Sandbox Form Blueprint
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#64748b' }}>
        A diagnostic utility sandbox verifying atomic input validation tokens.
      </Typography>

      <InputField
        label="Transaction Name"
        placeholder="e.g. AWS Cloud Services"
        value={name}
        onChange={(val) => setName(val)}
        error={showSandboxError && !name}
        helperText={showSandboxError && !name ? 'Field context name constraint missing.' : ''}
      />

      <InputField
        label="Amount (₹)"
        placeholder="0.00"
        value={amount}
        onChange={(val) => setAmount(val)}
        type="number"
        error={showSandboxError && !amount}
        helperText={showSandboxError && !amount ? 'Value volume indicator is required.' : ''}
      />

      <InputField
        label="Memo / Notes"
        placeholder="Optional details..."
        value={notes}
        onChange={(val) => setNotes(val)}
        multiline={true}
        rows={3}
      />

      <Box sx={{ mt: 1, pt: 2, borderTop: '1px dashed #e2e8f0' }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={showSandboxError} 
              onChange={(e) => setShowSandboxError(e.target.checked)} 
              color="primary"
            />
          }
          label={<Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>Simulate active validation errors</Typography>}
        />
      </Box>
    </Paper>
  );
}