import React from 'react';
import { useModal } from '../context/ModalContext';

const Header = () => {
  const { toggleModal } = useModal();

  return (
    <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-lime-300 px-6 md:px-20 py-6 min-h-[120px] shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Títulos */}
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
        <button
          onClick={toggleModal}
          className="mt-4 md:mt-0 bg-lime-300 hover:bg-lime-400 text-purple-900 font-semibold px-4 py-2 rounded transition-colors shadow-sm"
        >
          Mis Favoritos
        </button>
      </div>
    </header>
  );
};

export default Header
