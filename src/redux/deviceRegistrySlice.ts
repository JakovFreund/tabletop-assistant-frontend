import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Device } from "../types";
import { getDevices } from "../api";

const initialState: {
    devices: Device[];
} = {
    devices: [],
};

export const fetchDevices = createAsyncThunk('devices/fetch', async () => {
    const response = await getDevices();
    return response;
});

const deviceRegistrySlice = createSlice({
    name: 'deviceRegistry',
    initialState,
    reducers: {
        addDevice(state, action: PayloadAction<Device>) {
            state.devices.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDevices.fulfilled, (state, action: PayloadAction<Device[]>) => {
                state.devices = action.payload;
            })
    },
});

export const { addDevice } = deviceRegistrySlice.actions;
export default deviceRegistrySlice.reducer;