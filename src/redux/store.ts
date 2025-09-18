import { configureStore } from '@reduxjs/toolkit';
import thisDeviceReducer from './thisDeviceSlice';
import gameStateReducer from './gameStateSlice';
import connectedDevicesReducer from './connectedDevicesSlice';
import modalReducer from './modalSlice';
import gameLogReducer from './gameLogSlice'
import uiReducer from './uiSlice'
import deviceRegistryReducer from './deviceRegistrySlice'

export const store = configureStore({
    reducer: {
        thisDevice: thisDeviceReducer,
        deviceRegistry: deviceRegistryReducer,
        deviceConnectionStatus: connectedDevicesReducer,
        gameState: gameStateReducer,
        gameLog: gameLogReducer,
        modal: modalReducer,
        ui: uiReducer
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
