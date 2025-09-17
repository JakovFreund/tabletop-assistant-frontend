import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    selectedCreatureId: string | null,
    selectedLogEntryId: string | null,
} = {
    selectedCreatureId: null,
    selectedLogEntryId: null,
};

const uiSlice = createSlice({
    name: 'ui',
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
        }
    },
});

export const { setSelectedCreatureId, setSelectedLogEntryId } = uiSlice.actions;
export default uiSlice.reducer;
