import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies } from "./tmdb";

function App() {
  // Aquí guardaremos la lista de películas. Empieza como un arreglo vacío [].
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const peliculas = await getTrendingMovies();
      setMovies(peliculas);
    };
    fetchMovies();
  }, []);

  return (
    // Este div es el fondo principal de tu app. Usamos un azul mega oscuro casi negro.
    <div className="min-h-screen bg-[#050510] text-white font-sans">
      {/* Aquí llamamos a tu nuevo componente */}
      <Navbar />

      {/* Aquí irá el resto de tu contenido más adelante */}
      <main className="p-6 mt-4">
        <h2 className="text-4xl font-extrabold mb-6">Tendencias</h2>
        {/* LA GRILLA MAGICA: 1 columna en móvil, 2 en tablets, 4 en PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Por cada película en la memoria, dibujamos un MovieCard */}
          {movies.map((pelicula) => (
            <MovieCard key={pelicula.id} movie={pelicula} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
