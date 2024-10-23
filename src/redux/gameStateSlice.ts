import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getGameState } from '../api';

interface TurnResource {
    type: string;
    amount: number;
}

interface Creature {
    creatureId: string;
    name: string;
    subrace: string;
    turnResources: TurnResource[];
}

interface GameState {
    creatures: Creature[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: GameState = {
    creatures: [],
    loading: false,
    error: null,
};

// Thunk to fetch the game state
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
            .addCase(fetchGameState.fulfilled, (state, action: PayloadAction<{ creatures: Creature[] }>) => {
                state.creatures = action.payload.creatures;
                state.loading = false;
            })
            .addCase(fetchGameState.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch game state';
            });
    },
});

export default gameStateSlice.reducer;
