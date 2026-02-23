import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { getTrendingMovies } from "./tmdb";
import { searchMovies } from "./tmdb";

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
    // Este div es el fondo principal de tu app. Usamos un azul mega oscuro casi negro.
    <div className="min-h-screen bg-[#050510] text-white font-sans">
      {/* Aquí llamamos a tu nuevo componente */}
      <Navbar onSearch={handleSearch} />

      {/* Ruta 1: el inicio (la grilla) */}
      <Routes>
        {/* Aquí irá el resto de tu contenido más adelante */}
        <Route
          path="/"
          element={
            <main className="p-6 mt-4 max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-8 border-l-4 border-blue-500 pl-4">
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
        {/* Ruta 2:Los detalles de la pelicula */}
        {/* El: id es un comodin significa que puede ser /movie/123 o /movie/999 */}
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
