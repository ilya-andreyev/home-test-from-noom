import { RootState } from "../root";
import { ISleepData, ILast30NightsSleepData } from "./types";

export const selectLastNightSleepData = (state: RootState): ISleepData | null =>
  state.sleep.lastNightSleepData;

export const selectLast30NightsSleepData = (
  state: RootState
): ILast30NightsSleepData | null => state.sleep.last30NightsSleepData;

export const selectLastNightSleepDataIsLoading = (state: RootState): boolean =>
  state.sleep.lastNightSleepDataIsLoading;

export const selectLast30NightsSleepDataIsLoading = (
  state: RootState
): boolean => state.sleep.last30NightsSleepDataIsLoading;
