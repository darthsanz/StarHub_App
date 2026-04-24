import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
//creamos el contexto "almacen de datos"
const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState(() => {
    const peliculasGuardadas = localStorage.getItem("starhub_watchlist");
    return peliculasGuardadas ? JSON.parse(peliculasGuardadas) : [];
  });

    //Cada que la lista cambie la guardamos automaticamente
  useEffect(() => {
    localStorage.setItem("starhub_watchlist", JSON.stringify(watchList));
  }, [watchList]);
    
//Si la peli esta en la lista la quita si no la agrega
  const toggleWatchList = (movie) => {
    setWatchList((listaActual) => {
      const yaExiste = listaActual.some((m) => m.id === movie.id);
      if (yaExiste) {
        return listaActual.filter((m) => m.id !== movie.id);//la borramos
      } else {
        return [...listaActual, movie];//la agregamos al final
      }
    });
    };
    //Funcion para saber si el icono debe ir pintado o no
  const isSaved = (movieId) => {
    return watchList.some((m) => m.id === movieId);
  };
  return (
    <WatchListContext.Provider value={{ watchList, toggleWatchList, isSaved }}>
      {children}
    </WatchListContext.Provider>
  );
};

//exportar un hook aqui es la practica oficial de react
// eslint-disable-next-line react-refresh/only-export-components
export const useWatchList = () => useContext(WatchListContext);
