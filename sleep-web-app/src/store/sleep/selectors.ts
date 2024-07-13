import { RootState } from "../root";
import { ISleepData } from "./types";

export const selectLastNightSleepData = (state: RootState): ISleepData | null =>
  state.sleep.lastNightSleepData;

export const selectLastNightSleepLoading = (state: RootState): boolean =>
  state.sleep.isLoading;
