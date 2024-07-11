import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../root";
import { sleepService } from "../../services/sleep.service";
import { lastNightSleepActions } from "./slice";

export const getLastNightSleep = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("lastNightSleep/getData", async (_, { dispatch }) => {
  dispatch(lastNightSleepActions.setIsLoading(true));

  try {
    const lastNightSleepData = await sleepService.getLastNightSleepData();

    dispatch(lastNightSleepActions.setData(lastNightSleepData));
  } catch (error: any) {
    console.error(error);
  } finally {
    dispatch(lastNightSleepActions.setIsLoading(false));
  }
});
