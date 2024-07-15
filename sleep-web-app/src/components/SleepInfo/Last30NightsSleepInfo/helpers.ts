import { addMinutes, format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ISleepData } from "../../../store/sleep/types";

export const getAverageSleepInterval = (sleepLogs: ISleepData[]) => {
  const startTimes = sleepLogs.map((entry) =>
    toZonedTime(parseISO(entry.bedTimeStart), "UTC")
  );
  const endTimes = sleepLogs.map((entry) =>
    toZonedTime(parseISO(entry.bedTimeEnd), "UTC")
  );

  const totalStartMinutes = startTimes.reduce(
    (accumulator, startTime) =>
      accumulator + startTime.getUTCHours() * 60 + startTime.getUTCMinutes(),
    60 * startTimes.length
  );
  const totalEndMinutes = endTimes.reduce(
    (accumulator, endTime) =>
      accumulator + endTime.getUTCHours() * 60 + endTime.getUTCMinutes(),
    60 * endTimes.length
  );

  const averageStartMinutes = totalStartMinutes / startTimes.length;
  const averageEndMinutes = totalEndMinutes / endTimes.length;

  const averageStart = addMinutes(new Date(0), averageStartMinutes);
  const averageEnd = addMinutes(new Date(0), averageEndMinutes);

  const averageStartString = format(averageStart, "hh:mm aaa");
  const averageEndString = format(averageEnd, "hh:mm aaa");

  return `${averageStartString} - ${averageEndString}`;
};
