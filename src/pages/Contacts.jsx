import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Button from "../components/Button";
import ContactCard from "../components/ContactCard";
import { useContactContextState } from "../providers/ContactsProvider";
import Modal from "../components/modal/Modal";

const Contacts = () => {
  const { contacts } = useContactContextState();

  return (
    <div>
      <header className="flex items-center justify-between bg-blue-950 p-4">
        <p className="font-medium text-neutral-300">Trelllo</p>
        <Modal>
          <Modal.Button asChild>
            <Button icon={<QuestionMarkCircledIcon />}>About</Button>
          </Modal.Button>
          <Modal.Content title="About Trelllo">
            <div className="mt-4 space-y-3 text-gray-600">
              <p>This a React app build with Radix UI!</p>
              <p>Technologies used:</p>
              <ul className="list-disc pl-4">
                <li>Radix UI Dialog</li>
                <li>React</li>
                <li>Tailwind CSS</li>
              </ul>
              <div className="flex justify-end">
                <Modal.Close>CLOSE</Modal.Close>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </header>
      <div className="py-10">
        <div className="mx-auto max-w-sm space-y-4 rounded-lg bg-gray-200 p-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
