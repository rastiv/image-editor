import { Cross1Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";

const Modal = ({ open, onOpenChange, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

const ModalContent = ({ title, children }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-[dialog-overlay-show_200ms] data-[state=closed]:animate-[dialog-overlay-hide_200ms] fixed inset-0 bg-black/50" />
      <Dialog.Content className="data-[state=open]:animate-[dialog-content-show_200ms] data-[state=closed]:animate-[dialog-content-hide_200ms] fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 p-8 shadow rounded-md">
        <div className="flex justify-between items-center">
          <Dialog.Title className="text-xl">Edit contact</Dialog.Title>
          <Dialog.Description className="hidden">{title}</Dialog.Description>
          <Dialog.Close className="text-gray-400 hover:text-gray-600">
            <Cross1Icon />
          </Dialog.Close>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;

export default Modal;
