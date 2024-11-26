// src/redux/dmSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { DeviceState } from '../types';

const initialState: DeviceState = {
    creatureId: "",
    dungeonMaster: false,
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setDungeonMaster: (state, action) => {
            state.dungeonMaster = action.payload;
        },
        setCreatureId: (state, action) => {
            state.creatureId = action.payload;
        }
    },
});

export const { setCreatureId, setDungeonMaster } = deviceSlice.actions;
export default deviceSlice.reducer;
