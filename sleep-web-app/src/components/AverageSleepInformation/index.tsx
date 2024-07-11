import { Text, Flex } from "@chakra-ui/react";
import { SleepWidget } from "../SleepWidget";

export function AverageSleepInformation() {
  return (
    <SleepWidget>
      <Text>Oct 14th to Nov 13th</Text>
      <Text fontSize="2xl" fontWeight="bold">
        7 h 14 min
      </Text>
      <Text>11:51 pm - 7:05 am</Text>
      <Flex justifyContent="space-between">
        <Text color="red.500">Bad 3</Text>
        <Text>OK 14</Text>
        <Text color="green.500">Good 9</Text>
      </Flex>
    </SleepWidget>
  );
}
