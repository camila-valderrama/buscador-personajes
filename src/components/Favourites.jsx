import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { useCharacters } from '../context/CharactersContext';
import CharactersCard from './CharacterCard';
import { motion, AnimatePresence } from 'framer-motion';

const Favourites = () => {
  const { toggleModal } = useModal();
  const { favourites } = useCharacters();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      {/* Fondo oscuro con animación de aparición */}
      <motion.div
        className="fixed inset-0 z-40 bg-black bg-opacity-60 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Contenedor del modal animado */}
        <motion.div
          className="relative bg-gray-800 bg-opacity-95 p-10 rounded-lg w-full max-w-screen-lg max-h-[calc(100vh-100px)] overflow-y-auto z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Botón para cerrar */}
          <button
            onClick={toggleModal}
            className="absolute top-2 right-3 text-green-600 hover:text-green-400"
            aria-label="Cerrar favoritos"
            title="Cerrar favoritos"
          >
            <i className="bi bi-x-square text-3xl"></i>
          </button>

          <h1 className="text-yellow-300 text-5xl p-3 text-center font-creepster">
            Mis Favoritos
          </h1>

          <div className="flex flex-wrap justify-center gap-3 p-3">
            {favourites.length > 0 ? (
              favourites.map((fav) => (
                <CharactersCard
                  key={fav.id}
                  id={fav.id}
                  name={fav.name}
                  image={fav.image}
                  species={fav.species}
                />
              ))
            ) : (
              <p className="text-white text-lg text-center">
                No tienes personajes favoritos aún.
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Favourites

