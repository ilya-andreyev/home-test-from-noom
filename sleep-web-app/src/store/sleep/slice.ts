import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { ISleepData, ILast30NightsSleepData } from "./types";

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
    setLast30NightsSleepData: (
      state,
      action: PayloadAction<ILast30NightsSleepData | null>
    ) => {
      state.last30NightsSleepData = action.payload;
    },
    setLastNightSleepDataIsLoading: (state, action: PayloadAction<boolean>) => {
      state.lastNightSleepDataIsLoading = action.payload;
    },
    setLast30NightsSleepDataIsLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.last30NightsSleepDataIsLoading = action.payload;
    },
    reset: () => {
      return { ...initialState };
    }
  }
});

export const sleepActions = sleepSlice.actions;

export default sleepSlice.reducer;
