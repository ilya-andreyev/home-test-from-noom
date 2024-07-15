import { SleepQuality } from "../../enums";

export interface ISleepData {
  id?: number;
  bedTimeStart: string;
  bedTimeEnd: string;
  feeling: SleepQuality;
}

export interface IDateRange {
  start: string;
  end: string;
}

export interface IFeelingFrequencies {
  [SleepQuality.Bad]: number;
  [SleepQuality.Ok]: number;
  [SleepQuality.Good]: number;
}

export interface ILast30NightsSleepData {
  sleepLogs: ISleepData[];
  averageTotalTimeInBedSeconds: number;
  dateRange: IDateRange;
  feelingFrequencies: IFeelingFrequencies;
}

export interface ISleepSlice {
  lastNightSleepData: ISleepData | null;
  last30NightsSleepData: ILast30NightsSleepData | null;
  lastNightSleepDataIsLoading: boolean;
  last30NightsSleepDataIsLoading: boolean;
}
