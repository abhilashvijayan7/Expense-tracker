import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseState, Transaction } from '../types';
import { RootState } from './index';
import { api } from '../../services/api';

const initialState: ExpenseState = {
  items: [],
  loading: false,
  error: null,
};

// Async Network Stream Operations
export const fetchTransactionsAsync = createAsyncThunk(
  'expenses/fetchTransactionsAsync',
  async (userId: string) => {
    const response = await api.get(`/transactions?userId=${userId}`);
    return response.data as Transaction[];
  }
);

export const addTransactionAsync = createAsyncThunk(
  'expenses/addTransactionAsync',
  async (transaction: Transaction) => {
    const response = await api.post('/transactions', transaction);
    return response.data as Transaction;
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  'expenses/deleteTransactionAsync',
  async (id: string) => {
    await api.delete(`/transactions/${id}`);
    return id;
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => { state.loading = true; })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addTransactionAsync.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

// Custom Selector: Guarantees user isolation bounds
export const selectUserExpenses = (state: RootState) => state.expenses.items;
export default expenseSlice.reducer;