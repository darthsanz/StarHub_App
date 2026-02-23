import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../tmdb";
import { FaStar, FaArrowLeft } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams(); //Leemos el id dela URL
  const [movie, setMovie] = useState(null); //empezamos sin pelicula (null)
  //Cuando carga el componente, vamos a buscar la pelicula
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };
    fetchDetails();
  }, [id]);

  // Si la pelicula no carga, mostramos este mensaje
  if (!movie) {
    return (
      <div className="text-center text-white mt-20 text-2xl">
        Cargando la magia... 🪄
      </div>
    );
  }

  //guardamos las imagenes para fondos grandes
  const imageUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`;

  return (
    <div className="relative min-h[90vh] flex items-center justify-center p-6">
      {/* boton para regresar al inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 text-white bg-black/50 p-3 rounded-full hover:bg-blue-500 transition-colors"
      >
        <FaArrowLeft />
      </Link>

      {/* Imagen gigante con fondo con efecto borroso */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        {/* degradado para que se vea bien el texto */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050510] via-[#050510]/80 to-transparent"></div>
      </div>

      {/* contenedor del contenido principal (arriba del fondo) */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md-flex-row items-center gap-10">
        {/* poster nitido ala izq */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 md:w-96 rounded-2xl shadow-2xl shadow-blue-500/20"
        />

        {/* textos a la derecha */}
        <div className="text-white flex-1">
          <h1 className="text-4xl md:text-6xl font font-extrabold mb-4">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-300 mb-6">
            <span className="flex-items-center gap-1 bg-black/50 px-3 py-1 rounded-full text-yellow-400 font-bold">
              <FaStar /> {movie.vote_average?.toFixed(1)}
            </span>
            <span>{movie.realese_date?.split("-")[0]}</span>
            <span>{movie.runtime}min</span>
          </div>

          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            {movie.overview ||
              "Esta película no tiene sinopsis disponible en español."}
          </p>

          {/* etiqueta de generos  */}
          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-4 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
