import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      expenses: expenseReducer,
    },
  });
};

// Export specialized TypeScript types derived directly from our store config
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];