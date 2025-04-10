import React from 'react';
import { useCharacters } from '../context/CharactersContext';
import { motion } from 'framer-motion';

const CharactersCard = ({ id, name, species, image }) => {
  const { toggleFavourite, isInFavourites } = useCharacters();
  const isFav = isInFavourites(id);

  return (
    <motion.div
      className="flex flex-col items-center justify-between border border-lime-400 rounded-2xl p-5 bg-purple-900 bg-opacity-90 shadow-lg shadow-lime-400 m-3 w-64 text-lime-200 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={image}
        alt={`Retrato de ${name}`}
        className="w-48 h-48 object-cover rounded-full border-4 border-lime-400 mb-3"
      />

      <p className="text-xl font-bold text-center" style={{ fontFamily: 'Macondo, cursive' }}>
        {name}
      </p>
      <p className="text-sm mt-1">Especie: <span className="text-lime-300">{species}</span></p>
      

      <button
        className="absolute top-2 right-2 text-xl"
        onClick={() => toggleFavourite({ id, name, image, species })}
        aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <i className={`bi ${isFav ? 'bi-heart-fill text-red-600' : 'bi-heart text-lime-200'} hover:scale-110 transition-transform`}></i>
      </button>
    </motion.div>
  );
};

export default CharactersCard
