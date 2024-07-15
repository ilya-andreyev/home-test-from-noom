import { format } from "date-fns";
import { Text, Flex } from "@chakra-ui/react";
import { getDuration } from "../../../utils";
import {
  SleepQuality,
  sleepQualityLabels,
  sleepQualityColors
} from "../../../enums";
import { ILast30NightsSleepInfoProperties } from "./types";
import { getAverageSleepInterval } from "./helpers";

export function Last30NightsSleepInfo({
  last30NightsSleepData
}: ILast30NightsSleepInfoProperties) {
  const {
    sleepLogs,
    dateRange,
    averageTotalTimeInBedSeconds,
    feelingFrequencies
  } = last30NightsSleepData;

  const dateInterval = `${format(dateRange.start, "LLL do")} to ${format(
    dateRange.end,
    "LLL do"
  )}`;

  const averageSleepDuration = getDuration(
    0,
    averageTotalTimeInBedSeconds * 1000
  );

  const averageSleepInterval = getAverageSleepInterval(sleepLogs);

  const feelings: [SleepQuality, number][] = Object.entries(
    feelingFrequencies
  ).map(([sleepQuality, count]) => [Number(sleepQuality), count]);

  return (
    <>
      <Text>{dateInterval}</Text>
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        {averageSleepDuration}
      </Text>
      <Text>{averageSleepInterval}</Text>
      <Flex paddingX={4} width="100%" justifyContent="space-between">
        {feelings.map(([feeling, feelingCount]) => (
          <Flex key={feeling} direction="column">
            <Text
              color={sleepQualityColors[feeling]}
              fontSize="lg"
              fontWeight="bold"
            >
              {sleepQualityLabels[feeling]}
            </Text>
            <Text
              as="span"
              color={sleepQualityColors[feeling]}
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
            >
              {feelingCount}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
