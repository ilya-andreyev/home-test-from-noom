import { SleepQuality } from "../../enums";
import { ISO8601String } from "../../types";

export interface ISleepData {
  bedTimeStart: ISO8601String;
  bedTimeEnd: ISO8601String;
  feeling: SleepQuality;
}

export interface ISleepSlice {
  lastNightSleepData: ISleepData | null;
  isLoading: boolean;
}
