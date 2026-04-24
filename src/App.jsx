import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
import MovieDetails from "./components/MovieDetails";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { getTrendingMovies } from "./tmdb";
import { searchMovies } from "./tmdb";
import { HiTrendingUp } from "react-icons/hi";
import Favorites from "./components/Favorites";

function App() {
  // Aquí guardaremos la lista de películas. Empieza como un arreglo vacío [].
  const [movies, setMovies] = useState([]);
  //Estado para saber si estamos esperando a la API
  const [isLoading, setIsLoading] = useState(true);

  const [isFetchingMore, setIsFetchingMore] = useState(false);

  //NUEVOS ESTADOS PARA EL SCROLL INFINITO
  const [page, setPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");
  //Vigilante
  const vigilanteRef = useRef(null);

  // 1. MANEJADOR DE BÚSQUEDA (limpio, sin llamadas a la API)
  const handleSearch = (searchTerm) => {
    setCurrentQuery(searchTerm); // Le decimos a la app qué palabra buscar
    setPage(1); // Volvemos a la página 1 siempre
    setIsLoading(true); // Prendemos los Skeletons
    setMovies([]); // Limpiamos la pantalla
  };

  // 2. CEREBRO DE CARGA (Unico que se comunica con tmdb.js)
  useEffect(() => {
    const fetchMovies = async () => {
      // Si es página 1, usamos la carga principal. Si es página 2+, activamos el candado.
      if (page === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      let nuevosResultados = [];
      // Si no hay búsqueda, trae tendencias. Si hay búsqueda, trae resultados.
      if (currentQuery === "") {
        nuevosResultados = await getTrendingMovies(page);
      } else {
        nuevosResultados = await searchMovies(currentQuery, page);
      }

      if (page === 1) {
        // Página 1: Reemplaza todo
        setMovies(nuevosResultados);
        setIsLoading(false);
      } else {
        // Página 2 en adelante: Juntamos sin duplicados para evitar errores de React
        setMovies((prevMovies) => {
          const peliculasFiltradas = nuevosResultados.filter(
            (nueva) => !prevMovies.some((prev) => prev.id === nueva.id),
          );
          return [...prevMovies, ...peliculasFiltradas];
        });
        setIsFetchingMore(false);
      }
    };

    fetchMovies();
  }, [page, currentQuery]);

  // 3. EL OJO DEL VIGILANTE (Intersection Observer API)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        // Solo pide más películas SI lo estamos viendo Y NO está cargando nada
        if (entradas[0].isIntersecting && !isFetchingMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (vigilanteRef.current) {
      observer.observe(vigilanteRef.current);
    }

    return () => observer.disconnect();
  }, [movies, isFetchingMore, isLoading]); 

  const skeletons = Array(8).fill(0);

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
                  {/* Si esta cargando mostramos skeletons si no las peliculas */}
                  {isLoading && page === 1
                    ? skeletons.map((_, index) => <SkeletonCard key={index} />)
                    : movies.map((pelicula, index) => (
                        <MovieCard
                          key={`${pelicula.id}-${index}`}
                          movie={pelicula}
                        />
                      ))}
                </div>

                {/*VIGILANTE*/}
                {!isLoading && (
                  <div
                    ref={vigilanteRef}
                    className="h-10 w-full mt-10 flex justify-center items-center"
                  >
                    {isFetchingMore && (
                      <span className="text-gray-500 animate-pulse text-lg font-semibold tracking-wider">
                        Cargando más películas...
                      </span>
                    )}
                  </div>
                )}
              </main>
            }
          />
          {/* Contenido si la ruta es: Ruta 2:Los detalles de la pelicula */}
          {/* El: id es un comodin significa que puede ser /movie/123 o /movie/999 */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Ruta para favoritos */}
          <Route path="/favorites" element={<Favorites/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
