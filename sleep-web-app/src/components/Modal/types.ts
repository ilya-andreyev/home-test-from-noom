import { ReactElement, PropsWithChildren } from "react";

export interface IModalProperties extends PropsWithChildren {
  triggerButton: ReactElement;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  closeOnOverlayClick: boolean;
}
