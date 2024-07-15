import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../root";
import { sleepService } from "../../services/sleep.service";
import { sleepActions } from "./slice";
import { ISleepData } from "./types";
import { notifyError } from "../../utils";

export const getLastNightSleep = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("lastNightSleep/getData", async (_, { dispatch }) => {
  dispatch(sleepActions.setLastNightSleepDataIsLoading(true));

  try {
    const lastNightSleepData = await sleepService.getLastNightSleepData();

    dispatch(sleepActions.setLastNightSleepData(lastNightSleepData));
  } catch (error: any) {
    notifyError(error?.message);
  } finally {
    dispatch(sleepActions.setLastNightSleepDataIsLoading(false));
  }
});

export const getLast30NightsSleep = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("sleep/saveData", async (_, { dispatch }) => {
  dispatch(sleepActions.setLast30NightsSleepDataIsLoading(true));

  try {
    const last30NightsSleepData = await sleepService.getLast30NightsSleepData();

    dispatch(sleepActions.setLast30NightsSleepData(last30NightsSleepData));
  } catch (error: any) {
    notifyError(error?.message);
  } finally {
    dispatch(sleepActions.setLast30NightsSleepDataIsLoading(false));
  }
});

export const saveSleep = createAsyncThunk<
  void,
  { sleepData: ISleepData; callback: () => void },
  { state: RootState }
>("sleep/saveData", async ({ sleepData, callback }) => {
  try {
    await sleepService.saveSleepData(sleepData);

    callback();
  } catch (error: any) {
    notifyError(error?.message);
  }
});
