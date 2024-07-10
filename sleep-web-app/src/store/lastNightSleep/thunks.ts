import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../root";
import { sleepService } from "../../services/sleep.service";
import { lastNightSleepActions } from "./slice";

export const getLastNightSleep = createAsyncThunk<
  void,
  string,
  { state: RootState }
>("lastNightSleep/getData", async (lastNightDate, { dispatch }) => {
  dispatch(lastNightSleepActions.setIsLoading(true));

  try {
    const lastNightSleepData =
      await sleepService.getLastNightSleepData(lastNightDate);

    dispatch(lastNightSleepActions.setData(lastNightSleepData));
  } catch (error: any) {
    console.log(error);
  } finally {
    dispatch(lastNightSleepActions.setIsLoading(false));
  }
});
