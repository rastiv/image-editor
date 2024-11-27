import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { CONTACTS } from "../assets/contacts";

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ContactContext = createContext();

export const useContactContextState = () => useContext(ContactContext);

const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState(CONTACTS);
  const [updating, setUpdating] = useState(false);

  const updateContact = async (id, updatedContact) => {
    setUpdating(true);
    await sleep(1000);
    setUpdating(false);
    setContacts((pv) =>
      pv.map((contact) =>
        contact.id === id ? { ...updatedContact, id } : contact
      )
    );
  };

  return (
    <ContactContext.Provider value={{ contacts, updating, updateContact }}>
      {children}
    </ContactContext.Provider>
  );
};

ContactsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContactsProvider;
