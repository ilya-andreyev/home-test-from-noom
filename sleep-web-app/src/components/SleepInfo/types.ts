import { ISleepData, ILast30NightsSleepData } from "../../store/sleep/types";

export interface ISleepInfoProperties {
  lastNightSleepData: ISleepData;
  last30NightsSleepData: ILast30NightsSleepData;
}
