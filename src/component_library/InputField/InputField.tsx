"use client";

import React from 'react';
import { TextField } from '@mui/material';

// Define the properties our custom input field accepts
export interface InputFieldProps {
    label: string;
    placeholder?: string;
    value: string | number;
    onChange: (value: string) => void;
    type?: 'text' | 'number';
    multiline?: boolean;
    rows?: number;
    fullWidth?: boolean;
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