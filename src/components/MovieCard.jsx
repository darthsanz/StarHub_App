import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // TMDB nos da solo el final de la URL de la imagen, nosotros ponemos el principio
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`;
  return (
    // Tarjeta con efecto hover (se levanta un poquito al pasar el mouse)
    <Link
      to={`/movie/${movie.id}`}
      className="bg-[#111118] rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      {/* Contenedor de la Imagen (Horizontal / Aspect Ratio 16:9) */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Etiqueta de Calificación con fondo transparente (Glassmorphism) */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-bold py-1 px-2 rounded-md flex items-center gap-1">
          <FaStar className="text-yellow-400" />
          {/* Formateamos la calificación a 1 decimal (ej. 8.5) */}
          <span>{movie.vote_average?.toFixed(1)} </span>
        </div>
      </div>
      {/* Textos abajo de la imagen */}
      <div className="p-4">
        <h3
          className="text-lg font-bold text-white truncate"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {/* Partimos la fecha '2025-10-12' para mostrar solo el año '2025' */}
          {movie.release_date?.split("-")[0]}
        </p>
      </div>
    </Link>
  );
};
export default MovieCard;
