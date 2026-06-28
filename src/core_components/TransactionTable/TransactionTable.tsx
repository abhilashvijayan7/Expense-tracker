"use client";

import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, IconButton, Chip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export interface TransactionTableProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export function TransactionTable({ transactions, onDelete }: TransactionTableProps) {
  // Simple helper to capitalize category labels cleanly
  const formatCategory = (cat: string) => cat.charAt(0).toUpperCase() + cat.slice(1);

  return (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      {transactions.length === 0 ? (
        <Typography variant="body1" sx={{ p: 4, textAlign: 'center', color: '#777' }}>
          No transactions recorded yet. Use the form above to add your first transaction history item.
        </Typography>
      ) : (
        <Table sx={{ minWidth: 600 }} aria-label="transaction history ledger">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontWeight: 500 }}>{row.title}</TableCell>
                <TableCell>
                  <Chip 
                    label={formatCategory(row.category)} 
                    size="small" 
                    variant="outlined" 
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.type.toUpperCase()}
                    size="small"
                    color={row.type === 'income' ? 'success' : 'error'}
                    sx={{ fontWeight: 'bold', borderRadius: 1 }}
                  />
                </TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    fontWeight: 'bold', 
                    color: row.type === 'income' ? '#2e7d32' : '#d32f2f' 
                  }}
                >
                  {row.type === 'income' ? '+' : '-'}${row.amount.toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    aria-label={`delete transaction ${row.title}`} 
                    color="error" 
                    onClick={() => onDelete(row.id)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}