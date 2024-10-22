// src/redux/dmSlice.ts
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DMState {
  isDM: boolean;
}

// Define the initial state using that type
const initialState: DMState = {
  isDM: false,
};

const dmSlice = createSlice({
  name: 'dm',
  initialState,
  reducers: {
    setDM: (state, action) => {
      state.isDM = action.payload;
    },
  },
});

export const { setDM } = dmSlice.actions;
export default dmSlice.reducer;
