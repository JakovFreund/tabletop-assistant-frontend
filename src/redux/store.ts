// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import dmReducer from './dmSlice';
import gameStateReducer from './gameStateSlice';
import connectedDevicesReducer from './connectedDevicesSlice';

export const store = configureStore({
  reducer: {
    dm: dmReducer, // This is where you are adding the dm state
    gameState: gameStateReducer, // Add gameState reducer
    deviceConnectionStatus: connectedDevicesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 64, // Increase the warning threshold in milliseconds
      },
      /*
      getDefaultMiddleware({
        serializableCheck: false, // Disables the SerializableStateInvariantMiddleware
      }),
      */
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
