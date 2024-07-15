export interface ILogSleepInformationFormProperties {
  onClose: () => void;
}

export enum LogSleepInformationFormFields {
  BED_TIME_START = "bedTimeStart",
  BED_TIME_END = "bedTimeEnd",
  FEELING = "feeling"
}

export interface ILogSleepInformationForm {
  [LogSleepInformationFormFields.BED_TIME_START]: string;
  [LogSleepInformationFormFields.BED_TIME_END]: string;
  [LogSleepInformationFormFields.FEELING]: string;
}
