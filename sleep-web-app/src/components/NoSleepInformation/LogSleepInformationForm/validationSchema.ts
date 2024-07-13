import { object, date, string } from "yup";
import { isEqual, isAfter, isBefore } from "date-fns";
import { LogSleepInformationFormFields } from "./types";
import {
  REQUIRED_ERROR_MESSAGE,
  BEDTIME_DATE_START_AFTER_END_ERROR_MESSAGE,
  BEDTIME_DATE_END_BEFORE_START_ERROR_MESSAGE,
  BEDTIME_DATE_START_SAME_AS_END_ERROR_MESSAGE,
  BEDTIME_DATE_END_SAME_AS_START_ERROR_MESSAGE
} from "./constant";

export const validationSchema = object({
  [LogSleepInformationFormFields.BED_TIME_START]: date()
    .required(REQUIRED_ERROR_MESSAGE)
    .test(
      "not-start-date-after-end-date",
      BEDTIME_DATE_START_AFTER_END_ERROR_MESSAGE,
      // eslint-disable-next-line func-names
      function (value) {
        return !isAfter(
          value,
          this.parent[LogSleepInformationFormFields.BED_TIME_END]
        );
      }
    )
    .test(
      "not-equal",
      BEDTIME_DATE_START_SAME_AS_END_ERROR_MESSAGE,
      // eslint-disable-next-line func-names
      function (value) {
        return !isEqual(
          value,
          this.parent[LogSleepInformationFormFields.BED_TIME_END]
        );
      }
    ),
  [LogSleepInformationFormFields.BED_TIME_END]: date()
    .required(REQUIRED_ERROR_MESSAGE)
    .test(
      "not-end-date-before-start-date",
      BEDTIME_DATE_END_BEFORE_START_ERROR_MESSAGE,
      // eslint-disable-next-line func-names
      function (value) {
        return !isBefore(
          value,
          this.parent[LogSleepInformationFormFields.BED_TIME_START]
        );
      }
    )
    .test(
      "not-equal",
      BEDTIME_DATE_END_SAME_AS_START_ERROR_MESSAGE,
      // eslint-disable-next-line func-names
      function (value) {
        return !isEqual(
          value,
          this.parent[LogSleepInformationFormFields.BED_TIME_START]
        );
      }
    ),
  [LogSleepInformationFormFields.FEELING]: string().required(
    REQUIRED_ERROR_MESSAGE
  )
});
