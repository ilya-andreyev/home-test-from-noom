import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { SleepWidget } from "../SleepWidget";
import { LastNightSleepInfo } from "./LastNightSleepInfo";
import { Last30NightsSleepInfo } from "./Last30NightsSleepInfo";
import { ISleepInfoProperties } from "./types";
import { StyledButton } from "./styles";

export function SleepInfo({
  lastNightSleepData,
  last30NightsSleepData
}: ISleepInfoProperties) {
  const views = [
    {
      buttonText: "AVG",
      component: <LastNightSleepInfo lastNightSleepData={lastNightSleepData} />
    },
    {
      buttonText: "BACK",
      component: (
        <Last30NightsSleepInfo last30NightsSleepData={last30NightsSleepData} />
      )
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleButtonClick = () => {
    setCurrentIndex((previousIndex) => (previousIndex + 1) % views.length);
  };

  const currentView = views[currentIndex];

  return (
    <SleepWidget>
      <Box position="relative">
        <StyledButton onClick={handleButtonClick}>
          {currentView.buttonText}
        </StyledButton>
      </Box>
      <Flex
        paddingX={4}
        paddingY={8}
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        height="100%"
      >
        {currentView.component}
      </Flex>
    </SleepWidget>
  );
}
