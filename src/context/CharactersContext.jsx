import { createContext, useState, useContext, useEffect } from "react";

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [noResults, setNoResults] = useState(false); 

  const toggleFavourite = (nuevoItem) => {
    const indexExists = favourites.findIndex(item => item.id === nuevoItem.id);

    if (indexExists >= 0) {
      const newFavourites = favourites.filter(item => item.id !== nuevoItem.id);
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites)); 
    } else {
      const newFavourites = [...favourites, nuevoItem];
      setFavourites(newFavourites);
      localStorage.setItem("favourites", JSON.stringify(newFavourites)); 
    }
  };

  const isInFavourites = (id) => {
    return favourites.some(item => item.id === id);
  };

  useEffect(() => {
    try {
      const savedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
      setFavourites(savedFavourites);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      setFavourites([]);
    }
  }, []);

  return (
    <CharactersContext.Provider value={{
      characters,
      setCharacters,
      favourites,
      toggleFavourite,
      isInFavourites,
      noResults,
      setNoResults
    }}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharacters = () => useContext(CharactersContext);

