import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { ISleepData } from "./types";

export const sleepSlice = createSlice({
  name: "sleep",
  initialState,
  reducers: {
    setLastNightSleepData: (
      state,
      action: PayloadAction<ISleepData | null>
    ) => {
      state.lastNightSleepData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    reset: () => {
      return { ...initialState };
    }
  }
});

export const sleepActions = sleepSlice.actions;

export default sleepSlice.reducer;
