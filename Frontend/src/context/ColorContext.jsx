import { createContext, useState, useEffect } from "react";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  // Leemos la preferencia guardada en localStorage o por defecto 'dark'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    // Guardamos la preferencia
    localStorage.setItem("theme", theme);

    // Aplicamos la clase/atributo al elemento raíz html/body
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      document.body.style.backgroundColor = "#00001a"; // Color de fondo oscuro general
      document.body.style.color = "#ffffff";
    } else {
      root.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc"; // Color de fondo claro general
      document.body.style.color = "#0f172a";
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ColorContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorContext.Provider>
  );
};