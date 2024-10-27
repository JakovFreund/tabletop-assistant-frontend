import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getConnectedDevices } from '../api';

interface ConnectedDevices {
    connectedDevices: string[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: ConnectedDevices = {
    connectedDevices: [],
    loading: false,
    error: null,
};

// Thunk to fetch the game state
export const fetchConnectedDevices = createAsyncThunk('connected/fetch', async () => {
    const response = await getConnectedDevices();
    return response;
});

const connectedDevicesSlice = createSlice({
    name: 'connectedDevices',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchConnectedDevices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConnectedDevices.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.connectedDevices = action.payload;
                state.loading = false;
            })
            .addCase(fetchConnectedDevices.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch game state';
            });
    },
});

export default connectedDevicesSlice.reducer;
