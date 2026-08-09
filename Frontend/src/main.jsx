import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext.jsx";
//Importo el ColorProvider para envolver la app y proveer el contexto de color
import { ColorProvider } from "./context/ColorContext.jsx"; 
//Luego, en la pila de abajo, agrego el ColorProvider envolviendo el BrowserRouter y el App, para que toda la app tenga acceso al contexto de color

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ColorProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorProvider>
    </AuthProvider>
  </StrictMode>,
)
