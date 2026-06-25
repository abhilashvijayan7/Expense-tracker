"use client";

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export interface MetricCardProps {
  title: string;
  value: string | number;
  textColor?: string; 
  icon?: React.ReactNode; 
}

export function MetricCard({ title, value, textColor = 'inherit', icon }: MetricCardProps) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, minWidth: 240, backgroundColor: '#ffffff' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          
          {/* Shifting fontWeight safely inside the sx system property */}
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: '600' }}>
            {title}
          </Typography>
          
          {icon && <Box sx={{ color: 'text.secondary' }}>{icon}</Box>}
        </Box>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: textColor }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}