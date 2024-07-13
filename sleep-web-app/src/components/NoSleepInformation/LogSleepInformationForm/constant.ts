import { SleepQuality, sleepQualityLabels } from "../../../enums";
import { IOption } from "../../../types";
import { LogSleepInformationFormFields } from "./types";

export const initialValues = {
  [LogSleepInformationFormFields.BED_TIME_START]: "",
  [LogSleepInformationFormFields.BED_TIME_END]: "",
  [LogSleepInformationFormFields.FEELING]: SleepQuality.Ok.toString()
};

export const FEELING_OPTIONS: IOption[] = [
  {
    optionValue: SleepQuality.Bad.toString(),
    optionLabel: sleepQualityLabels[SleepQuality.Bad]
  },
  {
    optionValue: SleepQuality.Ok.toString(),
    optionLabel: sleepQualityLabels[SleepQuality.Ok]
  },
  {
    optionValue: SleepQuality.Good.toString(),
    optionLabel: sleepQualityLabels[SleepQuality.Good]
  }
];

export const REQUIRED_ERROR_MESSAGE = "Field is required.";

export const BEDTIME_DATE_START_AFTER_END_ERROR_MESSAGE =
  "Bedtime start date cannot be after Bedtime end date.";

export const BEDTIME_DATE_END_BEFORE_START_ERROR_MESSAGE =
  "Bedtime end date cannot be before Bedtime start date.";

export const BEDTIME_DATE_START_SAME_AS_END_ERROR_MESSAGE =
  "Bedtime start date cannot be the same as Bedtime end date.";

export const BEDTIME_DATE_END_SAME_AS_START_ERROR_MESSAGE =
  "Bedtime end date cannot be the same as Bedtime start date.";

export const SLEEP_LOG_SUCCESS_MESSAGE =
  "Your sleep information has been successfully logged.";
