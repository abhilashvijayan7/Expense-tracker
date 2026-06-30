"use client";

import React from 'react';
import { MetricCard } from './MetricCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export function TotalBalanceCardComposition() {
  return (
    <MetricCard
      title="TOTAL BALANCE"
      value="₹4,250.00"
      icon={<AccountBalanceWalletIcon />}
    />
  );
}

export function MonthlyIncomeCardComposition() {
  return (
    <MetricCard
      title="MONTHLY INCOME"
      value="+₹6,000.00"
      icon={<TrendingUpIcon />}
    />
  );
}

export function MonthlyExpensesCardComposition() {
  return (
    <MetricCard
      title="MONTHLY EXPENSES"
      value="-₹1,750.00"
      icon={<TrendingDownIcon />}
    />
  );
}