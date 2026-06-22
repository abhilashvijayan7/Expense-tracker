export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Transaction {
  id: string;
  userId: string; 
  name: string;
  amount: number;
  category: 'Software & Subscription' | 'Housing & Rent' | 'Food & Dining' | 'Groceries' | 'Utilities' | 'Investment' | 'Income' | 'Other';
  date: string; 
  memo?: string; 
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface ExpenseState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}