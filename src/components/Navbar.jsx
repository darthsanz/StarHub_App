import { FiSearch } from "react-icons/fi";
import logoImg from "../assets/StarHub_logo.png";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const location = useLocation(); //leemos la url actual
  const isHome = location.pathname === "/"; //estamos en el inicio? true/false

  return (
    // Contenedor principal del Navbar (Sticky para que se quede arriba al scrollear)
    <nav className="flex items-center justify-between px-4 h-20 bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      {/* 1. SECCIÓN IZQUIERDA: Logo StarHub */}
      <div className="flex-1 flex items-center justify-start">
        <img
          src={logoImg}
          alt="StarHub_logo"
          // w-auto mantiene la proporción. h-12 ajusta la altura.
          // object-contain asegura que no se deforme.
          className="h-11 w-auto object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-transform hover:scale-105"
        />
      </div>

      {/* 2. SECCION CENTRO: Enlaces */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className="flex gap-6">
          <Link
            to="/"
            className={`font-medium transition ${location.pathname === "/" ? "text-blue-400" : "text-gray-300 hover:text-white"}`}
          >
            Inicio
          </Link>

          <Link
            to="/favorites"
            className={`font-medium transition ${location.pathname === "/favorites" ? "text-red-400" : "text-gray-300 hover:text-white"}`}
          >
            Favoritos
          </Link>
        </div>
      </div>

      {/* 3. SECCIÓN DERECHA: Buscador (Input blanco estilo píldora) */}
      <div className="flex-1 flex items-center justify-end">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar"
            className={`bg-white text-black font-regular rounded-full py-3 pl-5 pr-10 outline-none w-32 md:w-64 focus:ring-2 focus:ring-blue-500 transition-all ${isHome ? "block" : "hidden"}`}
            onChange={(evento) => onSearch(evento.target.value)}
          />
          {/* Ícono de lupa posicionado absolutamente dentro del input */}
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-black text-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
