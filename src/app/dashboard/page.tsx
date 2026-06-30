"use client";

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid as Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, CircularProgress } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import { MetricCard } from '../../component_library/MetricCard';
import { ExpenseForm } from '../../core_components/ExpenseForm';
import { addTransactionAsync, fetchTransactionsAsync, selectUserExpenses } from '../../shared_features/store/expenseSlice';
import { RootState } from '../../shared_features/store';
import { logoutUser } from '../../shared_features/store/authSlice';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const rawTransactions = useSelector(selectUserExpenses);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/login');
    } else if (isMounted && user) {
      dispatch(fetchTransactionsAsync(user.id) as any);
    }
  }, [isAuthenticated, user, dispatch, router, isMounted]);

  const totalIncome = rawTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = rawTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const netBalance = totalIncome - totalExpenses;

  const handleFormSubmit = (formData: any) => {
    if (!user) return;
    dispatch(addTransactionAsync({
      id: `tx-${uuidv4()}`,
      userId: user.id,
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    }) as any);
  };

  const handleSignOut = () => {
    dispatch(logoutUser());
    router.push('/login');
  };

  if (!isMounted || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Sidebar Navigation */}
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
            <ListItemButton onClick={() => router.push('/ledger')} sx={{ borderRadius: 2 }}>
              <ListItemIcon><ReceiptLongIcon /></ListItemIcon>
              <ListItemText primary="Transactions Ledger" />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ p: 3, borderTop: '1px solid #edf2f7' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
          <Typography variant="caption" onClick={handleSignOut} sx={{ color: '#e53e3e', cursor: 'pointer', display: 'block', mt: 0.5 }}>Sign Out</Typography>
        </Box>
      </Paper>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Executive Overview</Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}><MetricCard title="TOTAL BALANCE" value={`₹${netBalance.toFixed(2)}`} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }}><MetricCard title="MONTHLY INCOME" value={`₹${totalIncome.toFixed(2)}`} /></Grid>
          <Grid size={{ xs: 12, sm: 4 }}><MetricCard title="MONTHLY EXPENSES" value={`₹${totalExpenses.toFixed(2)}`} /></Grid>
        </Grid>
        
        <ExpenseForm onSubmit={handleFormSubmit} />
      </Box>
    </Box>
  );
}