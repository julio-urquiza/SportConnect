import {
  EyeOff,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";

export default function CourtCardOwner({ court }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-orange-500/40 bg-[#00001A]/70">

      {/* Imagen */}

      <div className="relative h-44">

        <img
          src={court.image}
          alt={court.name}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#00001A]/90 to-transparent" />

        <span className="absolute right-3 top-3 rounded-full border border-green-500/40 bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-green-400">
          {court.status}
        </span>

        <div className="absolute bottom-3 left-3">

          <h3 className="font-bold text-white">
            {court.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
            <MapPin size={14} />
            {court.location}
          </div>

        </div>

      </div>

      {/* Información */}

      <div className="p-4">

        <div className="mb-3 flex items-center justify-between">

          <span className="text-xl font-bold text-orange-500">
            ${court.price.toLocaleString("es-AR")}/hr
          </span>

          <div className="flex items-center gap-1">
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />
            <span className="text-sm text-white">
              {court.rating}
            </span>
          </div>

        </div>

        <div className="flex gap-2">

          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-white/5 py-2 text-sm text-zinc-400 transition hover:border-orange-500 hover:text-orange-500">
            <EyeOff size={16} />
            Ocultar
          </button>

          <button className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500/20">
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}