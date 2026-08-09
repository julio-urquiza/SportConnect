import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext';

const Footer = () => {
  // Extraemos el tema actual del contexto
  const { theme } = useContext(ColorContext);

  return (
    <footer 
      className={`flex h-12 w-full items-center justify-between border-t px-8 ${
        theme === 'dark' 
          ? 'border-[#1a1a3a] bg-[#00001a]' 
          : 'border-gray-300 bg-white'
      }`}
    >
      {/* El logo se mantiene del mismo color en ambos temas */}
      <p className="font-jura text-base font-bold text-[#ff5a00]">
        SportConnect
      </p>

      {/* Cambiamos el color del texto del copyright para que se lea en modo claro */}
      <p 
        className={`text-xs ${
          theme === 'dark' ? 'text-white/35' : 'text-gray-500'
        }`}
      >
        2026. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;