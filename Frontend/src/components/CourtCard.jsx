import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { SPORTS } from "../constants/sports.js";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";

function CourtCard({cancha}) {
  const navigate = useNavigate();
  // 1. Extraemos el tema actual
  const { theme } = useContext(ColorContext);

  return (
    <article 
      className={`group cursor-pointer overflow-hidden rounded-2xl border shadow-lg transition hover:-translate-y-1 hover:shadow-xl ${
        theme === 'dark' ? 'border-gray-700 bg-[#00001A]/80' : 'border-gray-200 bg-white'
      }`}
      onClick={() => navigate(`/cancha/${cancha._id}`)}
    >

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cancha.imagenes[0]}
          alt={cancha.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradiente dinámico sobre la imagen */}
        <div className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-linear-to-t from-[#00001A]/90 to-transparent' : ''
        }`} />

        {/* Etiqueta del deporte dinámica */}
        <span className={`absolute left-3 top-3 rounded-full border border-orange-500/40 px-3 py-1 text-xs font-medium text-orange-500 backdrop-blur ${
          theme === 'dark' ? 'bg-black/60' : 'bg-white/90'
        }`}>
          {SPORTS.find(s=> (cancha.deporte === s.deporte))?.logo} {SPORTS.find(s=> (cancha.deporte === s.deporte))?.label}
        </span>
      </div>

      {/* Contenido */}
      <div className="p-4">

        <h3 className={`truncate text-xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {cancha.nombre}
        </h3>

        <div className={`mt-1 mb-4 flex items-center gap-2 text-sm ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {cancha.direccion}
          </span>
        </div>

        <div className="flex items-end justify-between">

          <div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Precio / hora
            </p>

            <p className="text-2xl font-bold text-orange-500">
              ${cancha.precioPorHora}
            </p>
          </div>

          <button className="rounded-xl bg-green-500 px-4 py-2 font-bold text-white shadow-lg shadow-green-500/30 transition hover:bg-green-600">
            RESERVAR →
          </button>

        </div>
      </div>

    </article>
  );
}

export default CourtCard;