import { useWatchList } from "../context/WatchlistContext";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi";

const Favorites = () => {
  const { watchList } = useWatchList();

  return (
    <main className="p-6 mt-3 max-w-7xl mx-auto animation-aparecer min-h-[80vh]">
      <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold mb-8 bg-linear-to-r from-red-400 to-pink-600 bg-clip-text text-transparent">
        <HiHeart className="text-red-500 text-4xl drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        Mi lista
      </h2>

      {watchList.length === 0 ? (
        //Si no hay pelis motivamos a buscar
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-gray-400 text-xl mb-6">
            Aún no has guardado ninguna película
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Explorar películas
          </Link>
        </div>
      ) : (
        //la grilla
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchList.map((movie, index) => (
            <MovieCard key={`${movie.id}-${index}`} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
};
 
export default Favorites;