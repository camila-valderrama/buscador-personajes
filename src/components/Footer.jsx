import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-700 text-lime-300 px-6 md:px-20 py-6 min-h-[100px] shadow-inner">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Enlaces */}
        <ul className="space-y-2 text-center md:text-left">
          <li>
            <span className="hover:text-white hover:underline cursor-pointer">
              Sobre la app
            </span>
          </li>
          <li>
            <span className="hover:text-white hover:underline cursor-pointer">
              Política interdimensional
            </span>
          </li>
          <li>
            <span className="hover:text-white hover:underline cursor-pointer">
              Contacto galáctico
            </span>
          </li>
        </ul>

        {/* Redes sociales */}
        <div className="flex gap-6 text-2xl justify-center">
          <i className="bi bi-instagram hover:text-white cursor-pointer transition-colors" title="Instagram"></i>
          <i className="bi bi-facebook hover:text-white cursor-pointer transition-colors" title="Facebook"></i>
          <i className="bi bi-twitter-x hover:text-white cursor-pointer transition-colors" title="Twitter X"></i>
        </div>
      </div>

      {/* Créditos */}
      <div className="mt-6 text-center text-sm text-lime-200">
        <p>© {new Date().getFullYear()} Rick y Morty Fandom · Hecho por Camila Valderrama</p>
      </div>
    </footer>
  );
};

export default Footer

