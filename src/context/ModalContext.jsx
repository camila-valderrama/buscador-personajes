import { createContext, useState, useContext } from "react";

// Creamos el contexto del modal
export const ModalContext = createContext();

// Proveedor del contexto del modal
export const ModalProvider = ({ children }) => {
  // Estado para controlar si el modal está abierto
  const [modalOpen, setModalOpen] = useState(false);

  // Alterna el estado del modal entre abierto y cerrado
  const toggleModal = () => {
    setModalOpen(prev => !prev); // Uso seguro del valor anterior
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <ModalContext.Provider value={{ modalOpen, toggleModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// Custom Hook para usar el contexto del modal fácilmente
export const useModal = () => useContext(ModalContext);
