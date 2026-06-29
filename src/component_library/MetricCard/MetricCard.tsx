"use client";

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export interface MetricCardProps {
  title: string;
  value: string | number;
  textColor?: string; 
  icon?: React.ReactNode; 
}

export function MetricCard({ title, value, textColor, icon }: MetricCardProps) {
  const stringValue = String(value);
  const upperTitle = title.toUpperCase();
  const isNegative = stringValue.includes('-');

  const defaultGreen = '#2e7d32'; 
  const defaultRed = '#c62828';   

  let computedTextColor = textColor || 'inherit';

  if (!textColor) {
    if (upperTitle.includes('INCOME')) {
      computedTextColor = defaultGreen;
    } else if (upperTitle.includes('EXPENSES')) {
      computedTextColor = defaultRed;
    } else if (upperTitle.includes('BALANCE')) {
      computedTextColor = isNegative ? defaultRed : defaultGreen;
    }
  }

  return (
    <Card 
      elevation={2} 
      sx={{ 
        borderRadius: 2, 
        minWidth: 240, 
        backgroundColor: '#ffffff',
        borderLeft: computedTextColor !== 'inherit' ? `5px solid ${computedTextColor}` : 'none'
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: '600' }}>
            {title}
          </Typography>
          {icon && <Box sx={{ color: 'text.secondary' }}>{icon}</Box>}
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: computedTextColor }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}