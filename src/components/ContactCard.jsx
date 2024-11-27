import { useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import ContactForm from "../components/ContactForm";
import Modal from "./modal/Modal";

const ContactCard = ({ contact }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      key={contact.id}
      className="flex justify-between rounded-md bg-white px-4 py-4 text-gray-700 border-neutral-200 border-[1px]"
    >
      <div>
        <p className="font-semibold">{contact.name}</p>
        <div className="text-sm text-gray-500">{contact.role}</div>
        <div className="text-sm text-gray-500">{contact.email}</div>
      </div>
      <div>
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Button className="rounded p-2 hover:bg-gray-200">
            <Pencil1Icon />
          </Modal.Button>
          <Modal.Content title="Edit contact">
            <ContactForm contact={contact} onAfterSave={() => setOpen(false)} />
          </Modal.Content>
        </Modal>
      </div>
    </div>
  );
};

export default ContactCard;
