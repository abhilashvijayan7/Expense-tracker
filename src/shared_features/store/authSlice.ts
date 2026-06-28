import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../types';
import { api } from '../../services/api';

// Utility helper to fetch active browser sessions on initialization loops
const getStoredSession = (): { user: User | null; isAuthenticated: boolean } => {
  if (typeof window === 'undefined') return { user: null, isAuthenticated: false };
  const savedUser = localStorage.getItem('fintrack_active_user');
  const token = localStorage.getItem('fintrack_token');
  return savedUser && token 
    ? { user: JSON.parse(savedUser), isAuthenticated: true }
    : { user: null, isAuthenticated: false };
};

const session = getStoredSession();

const initialState: AuthState = {
  user: session.user,
  isAuthenticated: session.isAuthenticated,
  loading: false,
};

// Async Network Call Action via Axios
export const loginUserAsync = createAsyncThunk(
  'auth/loginUserAsync',
  async (credentials: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (!response.data) return rejectWithValue('Invalid email identity or profile password combination.');
      
      // Save data back into local storage to keep the session alive on browser refresh
      localStorage.setItem('fintrack_active_user', JSON.stringify(response.data.user));
      localStorage.setItem('fintrack_token', response.data.token);
      return response.data.user as User;
    } catch (err: any) {
      return rejectWithValue('Network error occurred during sign-in sequence.');
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'auth/registerUserAsync',
  async (profileData: Record<string, string>, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', profileData);
      localStorage.setItem('fintrack_active_user', JSON.stringify(response.data.user));
      localStorage.setItem('fintrack_token', response.data.token);
      return response.data.user as User;
    } catch (err: any) {
      return rejectWithValue('Failed to process secure registration request.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('fintrack_active_user');
      localStorage.removeItem('fintrack_token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => { state.loading = true; })
      .addCase(loginUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUserAsync.rejected, (state) => { state.loading = false; })
      .addCase(registerUserAsync.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      });
  }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;