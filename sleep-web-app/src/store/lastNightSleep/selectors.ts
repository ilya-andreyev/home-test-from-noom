import { RootState } from "../root";
import { ILastNightSleep } from "./types";

export const selectLastNightSleepData = (
  state: RootState
): ILastNightSleep | null => state.lastNightSleep.data;

export const selectLastNightSleepLoading = (state: RootState): boolean =>
  state.lastNightSleep.isLoading;
