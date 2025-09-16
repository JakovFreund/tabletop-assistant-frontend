import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getGameLog } from '../api';
import { LogEntryNew } from "../types";


const initialState: {
    entries: LogEntryNew[];
    loading: boolean;
    error: string | null;
} = {
    entries: [],
    loading: false,
    error: null,
};

export const fetchGameLog = createAsyncThunk('gameLog/fetch', async () => {
    const response = await getGameLog(); // should hit GET /api/gamelog
    return response; // expecting LogEntry[]
});

const gameLogSlice = createSlice({
    name: 'gameLog',
    initialState,
    reducers: {
        addLogEntry(state, action: PayloadAction<LogEntryNew>) {
            state.entries.push(action.payload);
        },
        clearLog(state) {
            state.entries = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGameLog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGameLog.fulfilled, (state, action: PayloadAction<LogEntryNew[]>) => {
                state.entries = action.payload;
                state.loading = false;
            })
            .addCase(fetchGameLog.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch game log';
            });
    },
});

export const { addLogEntry, clearLog } = gameLogSlice.actions;
export default gameLogSlice.reducer;