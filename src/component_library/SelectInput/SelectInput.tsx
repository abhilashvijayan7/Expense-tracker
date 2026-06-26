"use client";

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Define structural key-value interface contract for selection dropdown menu rows
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  fullWidth?: boolean;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
}: SelectInputProps) {
  return (
    <FormControl fullWidth={fullWidth} sx={{ mb: 2 }}>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
        label={label}
        notched
        sx={{
          borderRadius: 1.5,
          backgroundColor: '#ffffff',
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}