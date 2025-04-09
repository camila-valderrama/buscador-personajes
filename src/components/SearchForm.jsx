import React, { useCallback, useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCharacters } from '../context/CharactersContext';
import { useModal } from '../context/ModalContext';
import Favourites from './Favourites';
import { RotatingLines } from 'react-loader-spinner';

const SearchForm = () => {
  const [nombre, setNombre] = useState('');
  const [cantidadPedida, setCantidadPedida] = useState('');
  const [loading, setLoading] = useState(false);
  const idToast = useRef(null);

  const { setCharacters, setNoResults } = useCharacters();
  const { modalOpen } = useModal();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setCharacters([]);

    const cantidad = parseInt(cantidadPedida);
    let url = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
    let personajesAMostrar = [];
    let mostrarMas = true;

    try {
      while (mostrarMas) {
        const response = await axios.get(url);
        const { results, info } = response.data;

        personajesAMostrar = [...personajesAMostrar, ...results];

        if (personajesAMostrar.length >= cantidad || !info.next) {
          personajesAMostrar = personajesAMostrar.slice(0, cantidad);
          mostrarMas = false;
        } else {
          url = info.next;
        }
      }

      setCharacters(personajesAMostrar);
      setNoResults(personajesAMostrar.length === 0);

      toast.update(idToast.current, {
        render: `Se muestran ${personajesAMostrar.length} personajes`,
        type: 'success',
        isLoading: false,
        autoClose: 5000,
      });
    } catch (error) {
      setNoResults(true);
      const mensaje = error?.response?.status === 404
        ? 'No se encontraron personajes'
        : `Error al buscar personajes: ${error.message}`;

      toast.update(idToast.current, {
        render: mensaje,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [nombre, cantidadPedida]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cantidad = parseInt(cantidadPedida);

    if (nombre.trim().length < 3) {
      toast.error('Debe indicar al menos 3 caracteres del nombre a buscar', {
        position: 'top-center',
      });
      return;
    }

    if (!cantidad || cantidad <= 0) {
      toast.error('Debe indicar una cantidad válida de personajes', {
        position: 'top-center',
      });
      return;
    }

    idToast.current = toast.loading('Buscando...');
    fetchData();
  };

  return (
    <>
      {modalOpen && <Favourites />}

      {/* Fondo general funky alien */}
      <div className="flex flex-col min-h-screen w-full items-center relative bg-gradient-to-b from-purple-900 to-purple-700 text-lime-300">

        {/* Loader */}
        {loading && (
          <div className="absolute top-10 flex justify-center items-center z-50">
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="lime"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        )}

        {/* Formulario */}
        <div className="flex flex-col p-10 mt-10 bg-gray-900 bg-opacity-90 rounded-2xl shadow-lg justify-center items-center w-[90%] max-w-md">
          <h1
            className="text-3xl mb-6"
            style={{ fontFamily: 'Macondo, cursive' }}
          >
            Buscar
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full items-center">
            <input
              type="text"
              placeholder="Nombre del personaje"
              onChange={(e) => setNombre(e.target.value)}
              className="border border-lime-300 bg-transparent text-lime-200 p-2 rounded w-full placeholder:text-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />

            <input
              type="number"
              placeholder="Cantidad de personajes"
              onChange={(e) => setCantidadPedida(e.target.value)}
              className="border border-lime-300 bg-transparent text-lime-200 p-2 rounded w-full placeholder:text-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />

            <button
              type="submit"
              className="bg-lime-300 text-purple-900 font-semibold px-6 py-2 rounded hover:bg-lime-400 transition-colors mt-2"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchForm
