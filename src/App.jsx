import SearchForm from './components/SearchForm';
import Characters from './components/Characters';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { CharactersProvider } from './context/CharactersContext';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <>
      {/* Notificaciones tipo toast */}
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-purple-800 text-lime-300 font-semibold rounded-xl shadow-lg shadow-lime-400"
        bodyClassName="text-sm font-macondo"
        progressClassName="bg-lime-300"
      />


      <CharactersProvider>
        <ModalProvider>

          {/* Fondo general con degradado */}
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-900 to-purple-700 text-lime-300">

            {/* Cabecera */}
            <Header />

            {/* Contenido principal */}
            <main className="flex-1 py-6 px-4">
              <SearchForm />
              <Characters />
            </main>

            {/* Pie de página */}
            <Footer />
          </div>

        </ModalProvider>
      </CharactersProvider>
    </>
  );
}

export default App
