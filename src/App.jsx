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
      {/* Notificaciones emergentes tipo toast */}
      <ToastContainer position="top-center" />

      {/* Provider del modal */}
      <ModalProvider>
        {/* Provider del contexto de personajes */}
        <CharactersProvider>

          {/* Fondo con capa oscura para mejorar la visibilidad del contenido */}
          <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-lime-20">
            {/* Capa de oscurecimiento */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            {/* Contenido principal sobre el fondo */}
            <div className="relative z-10 text-white">
              <header>
                <Header />
              </header>

              <main className="py-8">
                <SearchForm />
                <Characters />
              </main>
            </div>
          </div>

          {/* Pie de página fuera del fondo */}
          <footer>
            <Footer />
          </footer>

        </CharactersProvider>
      </ModalProvider>
    </>
  );
}

export default App
