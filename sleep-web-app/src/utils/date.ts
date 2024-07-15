import { format, parseISO, intervalToDuration, formatDuration } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDate = (date: string, dateFormat: string) => {
  const zonedTime = toZonedTime(parseISO(date), "UTC");

  return format(zonedTime, dateFormat);
};

export const getDuration = (start: string | number, end: string | number) => {
  const duration = intervalToDuration({ start, end });

  return formatDuration(duration, {
    format: ["months", "days", "hours", "minutes", "seconds"]
  });
};

export const getInterval = (start: string, end: string) =>
  `${formatDate(start, "h:mm aaa")} - ${formatDate(end, "h:mm aaa")}`;
