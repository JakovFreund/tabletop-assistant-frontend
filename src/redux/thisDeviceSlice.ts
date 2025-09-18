// src/redux/dmSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { ThisDevice } from '../types';

const initialState: ThisDevice = {
    deviceId: "",
    creatureId: "",
    dungeonMaster: false,
};

const thisDeviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDungeonMaster: (state, action) => {
            state.dungeonMaster = action.payload;
        },
        setCreatureId: (state, action) => {
            state.creatureId = action.payload;
        },
        setDeviceId: (state, action) => {
            state.deviceId = action.payload;
        }
    },
});

export const { setCreatureId, setDungeonMaster, setDeviceId } = thisDeviceSlice.actions;
export default thisDeviceSlice.reducer;
