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
    let personajesEncontrados = [];
    let mostrarMas = true;

    try {
      while (mostrarMas) {
        const response = await axios.get(url);
        const { results, info } = response.data;

        personajesEncontrados = [...personajesEncontrados, ...results];

        if (!info.next) {
          mostrarMas = false;
        } else {
          url = info.next;
        }
      }

      const resultadosFiltrados = personajesEncontrados.slice(0, cantidad);
      setCharacters(resultadosFiltrados);
      setNoResults(resultadosFiltrados.length === 0);

      toast.update(idToast.current, {
        render: `Se encontraron ${resultadosFiltrados.length} personaje${resultadosFiltrados.length !== 1 ? 's' : ''}`,
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

      <div className="flex flex-col min-h-screen w-full items-center relative bg-gradient-to-b from-purple-900 to-purple-700 text-lime-300">
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
        <div className="flex flex-col items-center w-full px-4">
          <div className="bg-purple-800 bg-opacity-90 p-10 mt-6 rounded-3xl shadow-xl shadow-lime-400 w-full max-w-xl">
            <h2 className="text-3xl text-center text-lime-400 mb-6" style={{ fontFamily: 'Macondo, cursive' }}>
              Buscador interdimensional
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Nombre del personaje"
                onChange={(e) => setNombre(e.target.value)}
                className="bg-purple-900 text-lime-100 p-3 rounded-full ring-2 ring-lime-400 focus:ring-4 focus:outline-none transition w-full placeholder:text-lime-300"
              />

              <input
                type="number"
                placeholder="Cantidad de personajes"
                onChange={(e) => setCantidadPedida(e.target.value)}
                className="bg-purple-900 text-lime-100 p-3 rounded-full ring-2 ring-lime-400 focus:ring-4 focus:outline-none transition w-full placeholder:text-lime-300"
              />

              <button
                type="submit"
                className="bg-lime-300 text-purple-900 font-semibold py-3 rounded-full hover:scale-105 transition-transform shadow-md hover:shadow-lg">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchForm
