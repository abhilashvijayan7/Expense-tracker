"use client";

import { Typography, Container } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Expense Tracker Workspace Baseline
      </Typography>
    </Container>
  );
}