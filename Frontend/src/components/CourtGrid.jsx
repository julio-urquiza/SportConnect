import CourtCard from "./CourtCard.jsx";
import { useCourts } from "../hooks/useCourts.js";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";

const cancha = {
  id: 1,
  nombre: "Cancha 1",
  complejo: "Complejo Deportivo Norte",
  tipo: "Fútbol 5",
  descripcion: "Césped sintético de última generación.",
  direccion: "Av. Siempre Viva 123",
  capacidad: 10,
  precio: 15000,
  rating: 4.8,
  cantidadResenas: 124,
  imagen:
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
};


function CourtGrid() {
  const { courts } = useCourts();
  // Extraemos el tema actual
  const { theme } = useContext(ColorContext);

  return (
    <div className={`mx-auto flex flex-wrap justify-center gap-4 p-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#00001A]' : 'bg-gray-50'
    }`}>
      {
        courts.map((court, index) => (
          <CourtCard key={index} cancha={court} />
        ))
      }
    </div>
  ); 
}
export default CourtGrid;