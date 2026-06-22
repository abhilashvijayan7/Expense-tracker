import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExpenseState, Transaction } from '../types';

const initialState: ExpenseState = {
  items: [
    {
      id: "t_1",
      userId: "user_101",
      name: "Monthly Salary - Corp Q4",
      amount: 8500.00,
      category: "Income",
      date: "2026-06-20"
    },
    {
      id: "t_2",
      userId: "user_101",
      name: "Supermarket - Whole Foods Market",
      amount: -342.15,
      category: "Groceries",
      date: "2026-06-22",
      memo: "Weekly pantry restocking"
    }
  ],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.items.unshift(action.payload); 
    },
  },
});

export const { addTransaction } = expenseSlice.actions;
export default expenseSlice.reducer;