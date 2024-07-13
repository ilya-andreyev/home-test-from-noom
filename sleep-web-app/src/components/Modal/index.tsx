import { cloneElement } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IModalProperties } from "./types";

const MotionModalContent = motion(ModalContent);

export function Modal({
  triggerButton,
  isOpen,
  onOpen,
  onClose,
  title,
  closeOnOverlayClick,
  children
}: IModalProperties) {
  return (
    <>
      {cloneElement(triggerButton, { onClick: onOpen })}
      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={closeOnOverlayClick}
      >
        <ModalOverlay />
        <MotionModalContent
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          {children}
        </MotionModalContent>
      </ChakraModal>
    </>
  );
}
