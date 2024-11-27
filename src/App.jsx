import "./App.css";
import Contacts from "./pages/Contacts";
import ContactsProvider from "./providers/ContactsProvider";

function App() {
  return (
    <div className="w-full py-4 flex flex-col items-center  bg-neutral-100">
      <ContactsProvider>
        <Contacts />
      </ContactsProvider>
    </div>
  );
}

export default App;
