import { Flex, Text } from "@chakra-ui/react";
import { SleepWidget } from "../SleepWidget";
import { ISleepInformationProperties } from "./types";
import { formatDate, getDuration, getInterval } from "../../utils";
import { sleepQualityLabels, sleepQualityColors } from "../../enums";

export function SleepInformation({
  lastNightSleepData
}: ISleepInformationProperties) {
  const { feeling, bedTimeStart, bedTimeEnd } = lastNightSleepData;

  const lastNightDate = formatDate(bedTimeEnd, "LLLL, do");
  const sleepDuration = getDuration(bedTimeStart, bedTimeEnd);
  const sleepInterval = getInterval(bedTimeStart, bedTimeEnd);
  const sleepQualityColor = sleepQualityColors[feeling];
  const sleepQualityLabel = sleepQualityLabels[feeling];

  return (
    <SleepWidget>
      <Flex
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        height="100%"
      >
        <Text>{lastNightDate}</Text>
        <Text fontSize="xl" fontWeight="bold" textAlign="center">
          {sleepDuration}
        </Text>
        <Text>{sleepInterval}</Text>
        <Text fontSize="lg">
          You felt:{" "}
          <Text
            as="span"
            fontSize="lg"
            fontWeight="bold"
            color={sleepQualityColor}
          >
            {sleepQualityLabel}
          </Text>
        </Text>
      </Flex>
    </SleepWidget>
  );
}
