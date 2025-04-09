import React from 'react';
import { useCharacters } from '../context/CharactersContext';
import { motion } from 'framer-motion';

const CharactersCard = ({ id, name, species, image }) => {
  const { toggleFavourite, isInFavourites } = useCharacters();
  const isFav = isInFavourites(id);

  const statusColor = {
    Human: 'text-green-400',
    Alien: 'text-purple-400',
    Robot: 'text-yellow-300',
  }[species] || 'text-gray-200';

  return (
    <motion.div
      className="flex flex-col justify-between border border-green-400 rounded-lg p-5 bg-gray-800 bg-opacity-85 m-3 basis-64 shadow-md shadow-green-700 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={`Retrato de ${name}`} className="w-64 rounded-sm mx-auto" />

      <p className="text-gray-100 text-xl pt-2">{name}</p>
      <p className={`pt-1 ${statusColor}`}>Especie: {species}</p>

      <button
        className="absolute top-2 right-2 text-xl"
        onClick={() => toggleFavourite({ id, name, image, species })}
        aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
        title={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}
      >
        <i className={`bi ${isFav ? 'bi-heart-fill text-red-600' : 'bi-heart text-white'}`}></i>
      </button>
    </motion.div>
  );
};

export default CharactersCard
