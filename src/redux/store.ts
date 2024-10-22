// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dmReducer from './dmSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    dm: dmReducer, // This is where you are adding the dm state
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;