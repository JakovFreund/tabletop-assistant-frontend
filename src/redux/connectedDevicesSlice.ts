import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getConnectedDevices } from '../api';
import { ConnectedDevices } from '../types';


// Initial state
const initialState: ConnectedDevices = {
    connectedDevices: [],
    loading: false,
    error: null,
};

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
                state.error = 'Failed to fetch connected devices';
            });
    },
});

export default connectedDevicesSlice.reducer;
