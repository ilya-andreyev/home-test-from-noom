import { ReactElement, PropsWithChildren } from "react";

export interface ModalProperties extends PropsWithChildren {
  triggerButton: ReactElement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
