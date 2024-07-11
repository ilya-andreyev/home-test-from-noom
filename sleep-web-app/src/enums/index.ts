export enum SleepQuality {
  Bad = 1,
  Ok,
  Good
}

export const sleepQualityLabels: { [key in SleepQuality]: string } = {
  [SleepQuality.Bad]: "Bad",
  [SleepQuality.Ok]: "Ok",
  [SleepQuality.Good]: "Good"
};

export const sleepQualityColors: { [key in SleepQuality]: string } = {
  [SleepQuality.Bad]: "red",
  [SleepQuality.Ok]: "black",
  [SleepQuality.Good]: "green"
};
