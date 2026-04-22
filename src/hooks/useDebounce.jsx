import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setdebouncedValue] = useState(value);

  useEffect(() => {
    //Configuramos el temporizador
    const handler = setTimeout(() => {
      setdebouncedValue(value);
    }, delay);

    //Funcion de limpieza: si el usuario escribe otra letra antes de que acabe el tiempo
    //cancelamos el temporizador anterior y comenzamos de nuevo.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
