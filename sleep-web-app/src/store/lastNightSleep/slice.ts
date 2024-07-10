import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./constants";
import { ILastNightSleep } from "./types";

export const lastNightSleepSlice = createSlice({
  name: "lastNightSleep",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ILastNightSleep>) => {
      state.data = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    reset: () => {
      return { ...initialState };
    }
  }
});

export const lastNightSleepActions = lastNightSleepSlice.actions;

export default lastNightSleepSlice.reducer;
