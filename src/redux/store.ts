// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import gameStateReducer from './gameStateSlice';
import connectedDevicesReducer from './connectedDevicesSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
    reducer: {
        device: deviceReducer, // This is where you are adding the dm state
        gameState: gameStateReducer, // Add gameState reducer
        deviceConnectionStatus: connectedDevicesReducer,
        modal: modalReducer
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
