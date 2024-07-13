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
  dispatch(sleepActions.setIsLoading(true));

  try {
    const lastNightSleepData = await sleepService.getLastNightSleepData();

    dispatch(sleepActions.setLastNightSleepData(lastNightSleepData));
  } catch (error: any) {
    notifyError(error?.message);
  } finally {
    dispatch(sleepActions.setIsLoading(false));
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
