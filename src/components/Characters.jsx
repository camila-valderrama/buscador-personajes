import React from 'react';
import { useCharacters } from '../context/CharactersContext';
import CharactersCard from './CharacterCard';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Characters = () => {
  const { characters, noResults } = useCharacters(); 

  if (noResults) {
    return (
      <div className="text-center text-white py-10">
        <p>No se encontraron personajes.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-3 p-3"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {characters.map((character) => (
          <motion.div
            key={character.id}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <CharactersCard
              id={character.id}
              name={character.name}
              species={character.species}
              image={character.image}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Characters
