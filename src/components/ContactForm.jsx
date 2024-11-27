import * as Dialog from "@radix-ui/react-dialog";
import { useContactContextState } from "../providers/ContactsProvider";
import { Spinner } from "./Spinner";
import Modal from "./modal/Modal";

const ContactForm = ({ contact, onAfterSave }) => {
  const { updating, updateContact } = useContactContextState();

  const handleSumbit = async (ev) => {
    ev.preventDefault();
    let data = Object.fromEntries(new FormData(ev.currentTarget));
    await updateContact(contact.id, data);
    onAfterSave();
  };

  return (
    <form onSubmit={handleSumbit}>
      <fieldset disabled={updating} className="group">
        <div className="mt-8 group-disabled:opacity-50">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                autoFocus
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.name}
                name="name"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Role
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.role}
                name="role"
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
                type="text"
                defaultValue={contact.email}
                name="email"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 text-right space-x-6">
          <Modal.Close className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-600">
            Cancel
          </Modal.Close>
          <button className="inline-flex justify-center items-center bg-green-500 text-white px-4 py-2 text-sm font-medium rounded hover:bg-green-600">
            <span className="group-disabled:opacity-0">Save</span>
            <Spinner className="h-4 absolute group-enabled:opacity-0" />
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default ContactForm;
