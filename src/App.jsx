import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies } from "./tmdb";
import { searchMovies } from "./tmdb";
import { HiTrendingUp } from "react-icons/hi";

function App() {
  // Aquí guardaremos la lista de películas. Empieza como un arreglo vacío [].
  const [movies, setMovies] = useState([]);
  // Esta función se activará cuando el usuario busque algo en el Navbar
  const handleSearch = async (searchTerm) => {
    //En caso de que el usuario borre todo traemos de nuevo las tendencias
    if (searchTerm === "") {
      const trending = await getTrendingMovies();
      setMovies(trending);
      return;
    }
    //Si escribe algo usamos la funcion searchmovies
    const resultados = await searchMovies(searchTerm);
    setMovies(resultados); //actualizamos la memoria con los resultados de la busqueda
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const peliculas = await getTrendingMovies();
      setMovies(peliculas);
    };
    fetchMovies();
  }, []);

  return (
    // contenedor principal
    <div className="min-h-screen text-white font-sans relative">
      {/* Fondos inamovibles para que no se rompan */}
      {/* degradado al fondo -z-20 */}
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,#170020,#300B3A,#2A1855,#1D1572,#010B31)] -z-20"></div>
      {/* capa negra encima del degradado -z-10 */}
      <div className="fixed inset-0 bg-black/40 -z-10"></div>
      {/* texto cards nivel del suelo */}
      <div className="relative z-0 pb-10 ">
        {/* Aquí llamamos al componente/bloque navbar*/}
        <Navbar onSearch={handleSearch} />

        {/* Ruta 1: el inicio (la grilla) */}
        <Routes>
          {/* Contenido si la ruta es / osea seria tendencias */}
          <Route
            path="/"
            element={
              <main className="p-6 mt-3 max-w-7xl mx-auto animation-aparecer">
                <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold mb-8 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  <HiTrendingUp className="text-blue-400 text-4xl drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  Tendencias
                </h2>
                {/* LA GRILLA MAGICA: 1 columna en móvil, 2 en tablets, 4 en PC */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Por cada película en la memoria, dibujamos un MovieCard */}
                  {movies.map((pelicula) => (
                    <MovieCard key={pelicula.id} movie={pelicula} />
                  ))}
                </div>
              </main>
            }
          />
          {/* Contenido si la ruta es: Ruta 2:Los detalles de la pelicula */}
          {/* El: id es un comodin significa que puede ser /movie/123 o /movie/999 */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
