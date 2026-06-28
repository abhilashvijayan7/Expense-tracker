"use client";

import React from 'react';
import { Box, Typography, Grid as Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { MetricCard } from '../../component_library/MetricCard';
import { ExpenseForm } from '../../core_components/ExpenseForm';
import { addTransactionAsync, selectUserExpenses } from '../../shared_features/store/expenseSlice';
import { RootState } from '../../shared_features/store';
import { logoutUser } from '../../shared_features/store/authSlice';
import { ActiveRoute } from '../page';

interface DashboardViewProps {
  onNavigate: (route: ActiveRoute) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const rawTransactions = useSelector(selectUserExpenses);

  const totalIncome = rawTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = rawTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const handleFormSubmit = (formData: any) => {
    if (!currentUser) return;
    dispatch(addTransactionAsync({
      id: `tx-${uuidv4()}`,
      userId: currentUser.id,
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    }) as any);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Sidebar Grid Wrapper */}
      <Paper square elevation={1} sx={{ width: 260, bgcolor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #edf2f7' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a' }}>FinTrack</Typography>
        </Box>
        <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton selected sx={{ borderRadius: 2, '&.Mui-selected': { bgcolor: '#e0e7ff', color: '#3f51b5' } }}>
              <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
              <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Dashboard</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onNavigate('ledger')} sx={{ borderRadius: 2 }}>
              <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
              <ListItemText primary="Transactions Ledger" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ p: 3, borderTop: '1px solid #edf2f7' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2d3748' }}>{currentUser?.name}</Typography>
          <Typography variant="caption" onClick={() => dispatch(logoutUser())} sx={{ color: '#e53e3e', cursor: 'pointer', display: 'block', mt: 0.5, fontWeight: 500 }}>Sign Out</Typography>
        </Box>
      </Paper>

      {/* Main Panel Frame Layout */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a202c' }}>Executive Overview</Typography>
          <Typography variant="body2" color="textSecondary">Real-time financial status and performance metrics.</Typography>
        </Box>

        {/* Updated to Modern MUI Grid size syntax matching your project properties */}
     <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard 
              title="TOTAL BALANCE" 
              value={`$${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard 
              title="MONTHLY INCOME" 
              value={`+$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <MetricCard 
              title="MONTHLY EXPENSES" 
              value={`-$${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <ExpenseForm onSubmit={handleFormSubmit} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}