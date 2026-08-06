import {  MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import { SPORTS } from "../constants/sports.js";
function CourtCard({cancha}) {
  const navigate = useNavigate()
  console.log(cancha)
  return (
    <article 
      className="group overflow-hidden rounded-2xl border border-gray-700 bg-[#00001A]/80 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      onClick={() => navigate(`/cancha/${cancha._id}`)}
      // onClick={() => navigate("/cancha/1")}
      >

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={cancha.imagenes[0]}
          alt={cancha.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#00001A]/90 to-transparent" />

        <span className="absolute left-3 top-3 rounded-full border border-orange-500/40 bg-black/60 px-3 py-1 text-xs font-medium text-orange-500 backdrop-blur">
          {SPORTS.find(s=> (cancha.deporte=== s.deporte)).logo} {SPORTS.find(s=> (cancha.deporte===s.deporte)).label}
        </span>
        {/* clasificacion */}
        {/* <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs text-yellow-400 backdrop-blur">
          <Star className="h-3 w-3 fill-yellow-400" />
          4.8
        </div> */}
      </div>

      {/* Contenido */}
      <div className="p-4">

        <h3 className="truncate text-xl font-bold text-white">
          {cancha.nombre}
        </h3>

        <div className="mt-1 mb-4 flex items-center gap-2 text-sm text-gray-400">
          <MapPin className="h-4 w-4 shrink-0" />
          <span className="truncate">
            {cancha.direccion}
          </span>
        </div>

        <div className="flex items-end justify-between">

          <div>
            <p className="text-xs text-gray-400">
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

export default CourtCard