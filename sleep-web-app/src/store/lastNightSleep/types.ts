export interface ILastNightSleep {
  feeling: number;
  bed_time_start: string;
  bed_time_end: string;
}

export interface ILastNightSleepSlice {
  data: ILastNightSleep | null;
  isLoading: boolean;
}
