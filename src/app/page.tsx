"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';

// Import our async-aligned routing views
import { LoginView } from './views/LoginView'
import { RegisterView } from './views/RegisterView';
import { DashboardView } from './views/DashboardView';
import { LedgerView } from './views/LedgerView';

// Import state management pipelines
import { fetchTransactionsAsync } from '../shared_features/store/expenseSlice';
import { RootState } from '../shared_features/store';

export type ActiveRoute = 'login' | 'register' | 'dashboard' | 'ledger';

export default function AppRouterContainer() {
  const dispatch = useDispatch();
  const [currentRoute, setCurrentRoute] = useState<ActiveRoute>('login');
  
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isAuthLoading = useSelector((state: RootState) => state.auth.loading);

  // Sync state lifecycle: runs on page reloads to restore data bounds seamlessly
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      dispatch(fetchTransactionsAsync(currentUser.id) as any);
      // Retain the user's dashboard location on a fresh reload
      if (currentRoute === 'login' || currentRoute === 'register') {
        setCurrentRoute('dashboard');
      }
    } else {
      setCurrentRoute('login');
    }
  }, [isAuthenticated, currentUser, dispatch]);

  if (isAuthLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
        <CircularProgress size={50} thickness={4} sx={{ color: '#3f51b5' }} />
      </Box>
    );
  }

  return (
    <Box>
      {currentRoute === 'login' && <LoginView onNavigate={setCurrentRoute} />}
      {currentRoute === 'register' && <RegisterView onNavigate={setCurrentRoute} />}
      {currentRoute === 'dashboard' && <DashboardView onNavigate={setCurrentRoute} />}
      {currentRoute === 'ledger' && <LedgerView onNavigate={setCurrentRoute} />}
    </Box>
  );
}