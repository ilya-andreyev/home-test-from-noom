import { Flex, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SleepWidget } from "../SleepWidget";
import { Modal } from "../Modal";
import { LogSleepInformationForm } from "./LogSleepInformationForm";

export function NoSleepInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SleepWidget>
      <Flex
        p={4}
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100%"
        gap={10}
      >
        <Text>No sleep information</Text>
        <Modal
          triggerButton={
            <IconButton
              icon={<AddIcon boxSize={16} color="white" />}
              aria-label="Add sleep information"
              bg="#A9A9A9"
              borderRadius="full"
              height="100px"
              width="100px"
            />
          }
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          title="Log sleep information"
          closeOnOverlayClick={false}
        >
          <LogSleepInformationForm onClose={onClose} />
        </Modal>
      </Flex>
    </SleepWidget>
  );
}
