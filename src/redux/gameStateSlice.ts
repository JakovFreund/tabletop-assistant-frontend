import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getGameState } from '../api';
import { Creature, DeviceMapping } from '../types';

const initialState: {
    creatures: Creature[];
    deviceMappings: DeviceMapping[];
    loading: boolean;
    error: string | null;
} = {
    creatures: [],
    deviceMappings: [],
    loading: false,
    error: null,
};

export const fetchGameState = createAsyncThunk('gameState/fetch', async () => {
    const response = await getGameState();
    return response;
});

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameState.fulfilled, (state, action: PayloadAction<{ creatures: Creature[], deviceMappings: DeviceMapping[]}>) => {
                state.creatures = action.payload.creatures;
                state.deviceMappings = action.payload.deviceMappings;
                state.loading = false;
            })
            .addCase(fetchGameState.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch game state';
            });
    },
});

export default gameStateSlice.reducer;
