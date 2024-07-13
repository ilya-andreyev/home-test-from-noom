import { format, intervalToDuration, formatDuration } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ISO8601String } from "../types";

export const formatDate = (date: ISO8601String, dateFormat: string) => {
  const dateInTimeZone = toZonedTime(date, "UTC");

  return format(dateInTimeZone, dateFormat);
};

export const getDuration = (start: ISO8601String, end: ISO8601String) => {
  const duration = intervalToDuration({ start, end });

  return formatDuration(duration, {
    format: ["months", "days", "hours", "minutes"]
  });
};

export const getInterval = (start: ISO8601String, end: ISO8601String) =>
  `${formatDate(start, "h:mm aaa")} - ${formatDate(end, "h:mm aaa")}`;
