"use client";

import React from 'react';
import { Typography, Container, Stack } from '@mui/material';
// Absolute path imports using the '@' alias pointing to your library
import { 
  TotalBalanceCardComposition, 
  MonthlyIncomeCardComposition, 
  MonthlyExpensesCardComposition 
} from '@/component_library/MetricCard/MetricCard.composition';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
        Executive Overview Baseline
      </Typography>

      {/* Stack renders our primitive library elements horizontally with clean spacing */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <TotalBalanceCardComposition />
        <MonthlyIncomeCardComposition />
        <MonthlyExpensesCardComposition />
      </Stack>
    </Container>
  );
}