import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
//  Esto es para "viajar al archivo index.html" y buscar el div donde se va a inyectar todos los componentes
createRoot(document.getElementById("root")).render(
  // "corrector" ortografico se asegura de no usar codigo viejo e inseguro, lanza alertas
  <StrictMode>
    <BrowserRouter>
      {/*envolvemos nuestra app para que pueda viajar entre rutas */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
