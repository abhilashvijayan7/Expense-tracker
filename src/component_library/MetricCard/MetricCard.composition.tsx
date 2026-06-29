"use client";

import React from 'react';
import { MetricCard } from './MetricCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// Variant 1: Checking our Balance layout structure
export function TotalBalanceCardComposition() {
  return (
    <MetricCard
      title="TOTAL BALANCE"
      value="₹4,250.00"
      icon={<AccountBalanceWalletIcon />}
    />
  );
}

// Variant 2: Checking our Income layout structure
export function MonthlyIncomeCardComposition() {
  return (
    <MetricCard
      title="MONTHLY INCOME"
      value="+₹6,000.00"
      icon={<TrendingUpIcon />}
    />
  );
}

// Variant 3: Checking our Expense layout structure
export function MonthlyExpensesCardComposition() {
  return (
    <MetricCard
      title="MONTHLY EXPENSES"
      value="-₹1,750.00"
      icon={<TrendingDownIcon />}
    />
  );
}