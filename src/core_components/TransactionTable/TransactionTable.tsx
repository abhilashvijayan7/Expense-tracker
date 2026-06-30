"use client";

import React from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Typography, IconButton, Chip, Box
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
  return (
    <TableContainer 
      component={Paper} 
      elevation={2} 
      sx={{ 
        borderRadius: 2, 
        overflow: 'hidden',
        width: '100%',
        overflowX: 'auto' 
      }}
    >
      {transactions.length === 0 ? (
        <Typography variant="body1" sx={{ p: 4, textAlign: 'center', color: '#64748b' }}>
          No transactions recorded yet. Use the form above to add your first transaction history item.
        </Typography>
      ) : (
        <Box sx={{ minWidth: 600 }}> 
          <Table aria-label="transaction history ledger">
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, color: '#334155' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#334155' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#334155' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#334155' }} align="right">Amount</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#334155' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{row.title}</TableCell>
                  <TableCell>
                    <Chip 
                      label={row.category} 
                      size="small" 
                      variant="outlined" 
                      sx={{ borderRadius: 1, fontWeight: 500 }}
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
                      fontWeight: 700, 
                      color: row.type === 'income' ? '#2e7d32' : '#c62828' 
                    }}
                  >
                    {row.type === 'income' ? '+' : '-'}₹{Math.abs(row.amount).toFixed(2)}
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
        </Box>
      )}
    </TableContainer>
  );
}