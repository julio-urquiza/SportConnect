import CourtCard from "./CourtCard.jsx";

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
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-4 p-4">
      {
        [1,2,3,4].map((_, index) => (
          <CourtCard key={index} cancha={cancha} />
        ))
      }
    </div>
  ); 
}
export default CourtGrid