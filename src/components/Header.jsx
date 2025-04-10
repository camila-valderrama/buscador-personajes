import React from 'react';
import { useModal } from '../context/ModalContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { toggleModal } = useModal();

  return (
    <motion.header
      className="w-full bg-gradient-to-r from-purple-900 to-purple-700 text-lime-300 px-6 md:px-20 py-6 min-h-[140px] shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Título y subtítulo */}
        <div className="text-center md:text-left">
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: 'Macondo, cursive' }}
          >
            Buscador de personajes
          </h1>
          <p className="text-lg font-light tracking-wide">Rick y Morty Fandom</p>
        </div>

        {/* Botón de favoritos */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleModal}
          className="mt-4 md:mt-0 bg-lime-300 hover:bg-lime-400 text-purple-900 font-semibold px-4 py-2 rounded transition-colors shadow-sm"
        >
          Mis Favoritos
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
