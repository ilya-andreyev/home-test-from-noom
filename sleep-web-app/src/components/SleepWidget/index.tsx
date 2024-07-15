import { PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";

export function SleepWidget({ children }: PropsWithChildren) {
  return (
    <Box bg="#D9D9D9" borderRadius="md" height="250px" width="250px">
      {children}
    </Box>
  );
}

export default SleepWidget;
