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
      <motion.div
        className="fixed inset-0 z-40 bg-black bg-opacity-60 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-purple-800 bg-opacity-90 p-10 rounded-3xl shadow-xl shadow-lime-400 w-full max-w-screen-lg max-h-[90vh] overflow-y-auto text-lime-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Botón cerrar */}
          <button
            onClick={toggleModal}
            className="absolute top-2 right-3 text-lime-300 hover:text-white transition"
            aria-label="Cerrar favoritos"
            title="Cerrar favoritos"
          >
            <i className="bi bi-x-square text-3xl"></i>
          </button>

          {/* Título */}
          <h1
            className="text-4xl text-center mb-6"
            style={{ fontFamily: 'Macondo, cursive' }}
          >
            Mis Favoritos
          </h1>

          {/* Lista de personajes favoritos */}
          <div className="flex flex-wrap justify-center gap-4">
            {favourites.length > 0 ? (
              favourites.map((fav) => (
                <CharactersCard
                  key={fav.id}
                  id={fav.id}
                  name={fav.name}
                  image={fav.image}
                  status={fav.status}
                  species={fav.species}
                />
              ))
            ) : (
              <p className="text-center text-lime-300">No tienes personajes favoritos aún.</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Favourites;
