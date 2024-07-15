import { ISleepSlice } from "./types";

export const initialState: ISleepSlice = {
  lastNightSleepData: null,
  last30NightsSleepData: null,
  lastNightSleepDataIsLoading: false,
  last30NightsSleepDataIsLoading: false
};
