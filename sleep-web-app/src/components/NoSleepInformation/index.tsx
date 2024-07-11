import {
  Flex,
  Text,
  IconButton,
  Box,
  Button,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { SleepWidget } from "../SleepWidget";
import { Modal } from "../Modal";

export function NoSleepInformation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SleepWidget>
      <Flex
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
        >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              This is a sample modal with custom animation using Framer Motion
              and Chakra UI.
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </Modal>
      </Flex>
    </SleepWidget>
  );
}
