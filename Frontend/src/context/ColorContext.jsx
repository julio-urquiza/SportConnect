// src/context/ColorContext.jsx
import { createContext, useEffect, useMemo, useState } from 'react';

// 1. Creamos el contexto (el canal de comunicación)
export const ColorContext = createContext();

// 2. Creamos el Provider (el componente que envuelve y provee los datos)
export const ColorProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('sportconnect-theme') || 'light';
    });

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        localStorage.setItem('sportconnect-theme', theme);
    }, [theme]);

    // Función para alternar entre oscuro y claro
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Empaquetamos lo que queremos compartir con el resto de la app
    const data = useMemo(() => ({ theme, toggleTheme }), [theme]);

    return (
        <ColorContext.Provider value={data}>
            {children}
        </ColorContext.Provider>
    );
};
