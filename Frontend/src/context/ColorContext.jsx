// src/context/ColorContext.jsx
import { createContext, useState } from 'react';

// 1. Creamos el contexto (el canal de comunicación)
export const ColorContext = createContext();

// 2. Creamos el Provider (el componente que envuelve y provee los datos)
export const ColorProvider = ({ children }) => {
    // Definimos el estado inicial (por defecto, modo claro)
    const [theme, setTheme] = useState('light');

    // Función para alternar entre oscuro y claro
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Empaquetamos lo que queremos compartir con el resto de la app
    const data = { theme, toggleTheme };

    return (
        <ColorContext.Provider value={data}>
            {children}
        </ColorContext.Provider>
    );
};