"use client";

import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useDispatch, useSelector } from 'react-redux';

import { TransactionTable } from '../../core_components/TransactionTable';
import { deleteTransactionAsync, selectUserExpenses } from '../../shared_features/store/expenseSlice';
import { RootState } from '../../shared_features/store';
import { logoutUser } from '../../shared_features/store/authSlice';
import { ActiveRoute } from '../page';

interface LedgerViewProps {
  onNavigate: (route: ActiveRoute) => void;
}

export function LedgerView({ onNavigate }: LedgerViewProps) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const rawTransactions = useSelector(selectUserExpenses);

  const mappedTransactions = rawTransactions.map((tx) => ({
    id: tx.id,
    title: tx.name,
    amount: Math.abs(tx.amount),
    type: tx.amount >= 0 ? ('income' as const) : ('expense' as const),
    category: tx.category,
    date: tx.date,
  }));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* Shared Sidebar Component Grid */}
      <Paper square elevation={1} sx={{ width: 260, bgcolor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 3, borderBottom: '1px solid #edf2f7' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e3a8a' }}>FinTrack</Typography>
        </Box>
        <List sx={{ px: 2, mt: 2, flexGrow: 1 }}>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <ListItemButton onClick={() => onNavigate('dashboard')} sx={{ borderRadius: 2 }}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton selected sx={{ borderRadius: 2, '&.Mui-selected': { bgcolor: '#e0e7ff', color: '#3f51b5' } }}>
              <ListItemIcon><ReceiptLongIcon color="primary" /></ListItemIcon>
              {/* Type-safe custom typography nesting alignment */}
              <ListItemText primary={<Typography sx={{ fontWeight: 600 }}>Transactions Ledger</Typography>} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ p: 3, borderTop: '1px solid #edf2f7' }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#2d3748' }}>{currentUser?.name}</Typography>
          <Typography variant="caption" onClick={() => dispatch(logoutUser())} sx={{ color: '#e53e3e', cursor: 'pointer', display: 'block', mt: 0.5, fontWeight: 500 }}>Sign Out</Typography>
        </Box>
      </Paper>

      {/* Table Historical Grid Stream Block */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a202c' }}>Transaction Ledger History</Typography>
          <Typography variant="body2" color="textSecondary">Comprehensive record of accounts and settlements.</Typography>
        </Box>
        <TransactionTable transactions={mappedTransactions} onDelete={(id) => dispatch(deleteTransactionAsync(id) as any)} />
      </Box>
    </Box>
  );
}