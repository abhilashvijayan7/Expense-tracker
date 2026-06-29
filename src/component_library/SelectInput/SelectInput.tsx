"use client";

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

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
  error?: boolean;        
  helperText?: string;    
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  fullWidth = true,
  error = false,          
  helperText = '',        
}: SelectInputProps) {
  const labelId = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <FormControl fullWidth={fullWidth} sx={{ mb: 2 }} error={error}>
      <InputLabel id={`${labelId}-label`} shrink>{label}</InputLabel>
      <Select
        labelId={`${labelId}-label`}
        id={labelId}
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
      
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}