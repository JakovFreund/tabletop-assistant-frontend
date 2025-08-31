import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getGameState } from '../api';
import { Creature, Device, DeviceMapping, GameState, LogEntry } from '../types';

const initialState: GameState = {
    creatures: [],
    deviceMappings: [],
    devices: [],
    loading: false,
    error: null,
    selectedCreatureId: null,
    selectedLogEntryId: null,
    combatLog: [],
};

export const fetchGameState = createAsyncThunk('gameState/fetch', async () => {
    const response = await getGameState();
    return response;
});

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState,
    reducers: {
        setSelectedCreatureId(
            state,
            action: PayloadAction<string | null>
        ) {
            state.selectedCreatureId = action.payload;
        },
        setSelectedLogEntryId(
            state,
            action: PayloadAction<string | null>
        ) {
            state.selectedLogEntryId = action.payload;
        },
        addLogEntry(state, action: PayloadAction<LogEntry>) {
            state.combatLog.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameState.fulfilled, (state, action: PayloadAction<{ creatures: Creature[], deviceMappings: DeviceMapping[], devices: Device[] }>) => {
                state.creatures = action.payload.creatures;
                state.deviceMappings = action.payload.deviceMappings;
                state.devices = action.payload.devices;
                state.loading = false;
            })
            .addCase(fetchGameState.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch game state';
            });
    },
});

export const { setSelectedCreatureId, setSelectedLogEntryId, addLogEntry } = gameStateSlice.actions;
export default gameStateSlice.reducer;
