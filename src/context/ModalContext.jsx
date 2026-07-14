import { createContext, useContext, useState } from "react";

// Create Context
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

  // Store currently open modal data
  const [modal, setModal] = useState(null);

  // Open modal and pass data
  const openModal = (payload) => {
    console.log("OPEN MODAL:", payload);
    setModal(payload);
  };

  // Close modal
  const closeModal = () => setModal(null);

  return (
    // Share modal state and functions across app
    <ModalContext.Provider
      value={{ modal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook to access modal context
export const useModal = () => useContext(ModalContext);