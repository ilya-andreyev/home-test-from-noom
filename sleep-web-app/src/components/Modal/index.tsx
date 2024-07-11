import { cloneElement } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ModalProperties } from "./types";

const MotionModalContent = motion(ModalContent);

export function Modal({
  triggerButton,
  isOpen,
  onOpen,
  onClose,
  children
}: ModalProperties) {
  return (
    <>
      {cloneElement(triggerButton, { onClick: onOpen })}
      <ChakraModal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <MotionModalContent
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </MotionModalContent>
      </ChakraModal>
    </>
  );
}
