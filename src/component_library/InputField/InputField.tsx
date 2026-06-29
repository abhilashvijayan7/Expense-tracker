"use client";

import React from 'react';
import { TextField } from '@mui/material';

export interface InputFieldProps {
    label: string;
    placeholder?: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: 'text' | 'number' | 'password'; 
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: string;
}

export function InputField({
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    multiline = false,
    rows = 1,
    fullWidth = true,
    error = false,
    helperText = '',
}: InputFieldProps) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            multiline={multiline}
            rows={rows}
            fullWidth={fullWidth}
            error={error}
            helperText={helperText}
            variant="outlined"
            slotProps={{
                inputLabel: { shrink: true }
            }}
            sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                },
            }}
        />
    );
}