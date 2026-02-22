// Borra la llave quemada y vuelve a usar la variable de entorno:
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Esta función irá a buscar las películas que están en tendencia hoy
export const getTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-MX`,
    );

    if (!response.ok) {
      throw new Error("Error al conectar con TMDB. ¿Revisaste tu API Key?");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Hubo un problema:", error);
    return [];
  }
};
