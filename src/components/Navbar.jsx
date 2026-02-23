import { FiSearch } from "react-icons/fi";
//import { FaStar } from "react-icons/fa";
import logoImg from "../assets/StarHub_logo.png";

const Navbar = ({ onSearch }) => {
  return (
    // Contenedor principal del Navbar (Sticky para que se quede arriba al scrollear)
    <nav className="flex items-center justify-between px-4 py-3 bg-transparent sticky top-0 z-50">
      {/* 1. SECCIÓN IZQUIERDA: Logo StarHub */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={logoImg}
          alt="StarHub_logo"
          // w-auto mantiene la proporción. h-12 ajusta la altura.
          // object-contain asegura que no se deforme.
          className="h-11 w-auto object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-transform hover:scale-105"
        />
      </div>

      {/* 2. SECCIÓN CENTRO: Link de Inicio */}
      <div>
        <span className="text-gray-300 font-regular cursor-pointer hover:text-white transition">
          Inicio
        </span>
      </div>

      {/* 3. SECCIÓN DERECHA: Buscador (Input blanco estilo píldora) */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-white text-black font-regular rounded-full py-3 pl-5 pr-10 outline-none w-32 md:w-64 focus:ring-2 focus:ring-blue-500 transition-all"
          onChange={(evento) => onSearch(evento.target.value)}
        />
        {/* Ícono de lupa posicionado absolutamente dentro del input */}
        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg" />
      </div>
    </nav>
  );
};

export default Navbar;
