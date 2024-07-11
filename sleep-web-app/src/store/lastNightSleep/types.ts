import { SleepQuality } from "../../enums";
import { ISO8601String } from "../../types";

export interface ILastNightSleep {
  feeling: SleepQuality;
  bedTimeStart: ISO8601String;
  bedTimeEnd: ISO8601String;
}

export interface ILastNightSleepSlice {
  data: ILastNightSleep | null;
  isLoading: boolean;
}
