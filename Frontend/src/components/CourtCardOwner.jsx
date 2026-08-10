import {
    Eye,
    EyeOff,
    MapPin,
    Star,
    Trash2,
} from "lucide-react";

export default function CourtCardOwner({ court, onUpdate, onDelete }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-orange-500/40 bg-[#00001A]/70">

            {/* Imagen */}

            <div className="relative h-44">

                <img
                    src={court.imagenes[0]}
                    alt={court.nombre}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#00001A]/90 to-transparent" />

                <span className={`absolute right-3 top-3 rounded-full border border-green-500/40 bg-green-500/20 px-2.5 py-1 text-xs font-semibold text-white 
                    ${court.disponible 
                    ? "bg-green-600 border border-green-500"
                    : "bg-red-600 border border-red-500"}`}>
                    {court.disponible ? "Pública" : "Oculta"}
                </span>

                <div className="absolute bottom-3 left-3">

                    <h3 className="font-bold text-white">
                        {court.nombre}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
                        <MapPin size={14} />
                        {court.direccion}
                    </div>

                </div>

            </div>

            {/* Información */}

            <div className="p-4">

                <div className="mb-3 flex items-center justify-between">

                    <span className="text-xl font-bold text-orange-500">
                        {court.precioPorHora} /hr
                    </span>

                    <div className="flex items-center gap-1">

                        {court.rating &&
                            <>
                                <Star
                                    size={14}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                                <span className="text-sm text-white">
                                    {court.rating}
                                </span>
                            </>
                        }
                    </div>

                </div>

                <div className="flex gap-2">

                    <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-white/5 py-2 text-sm text-zinc-400 transition hover:border-orange-500 hover:text-orange-500"
                        onClick={() => onUpdate(court._id, { disponible: court.disponible ? false : true })}
                    >
                        {
                            court.disponible
                                ? <EyeOff size={16} />
                                : <Eye size={16} />
                        }
                        {court.disponible ? "Ocultar" : "Publicar"}
                    </button>

                    <button
                        className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-500 transition hover:bg-red-500/20"
                        onClick={() => onDelete(court._id)}
                    >
                        <Trash2 size={18} />
                    </button>

                </div>

            </div>

        </div>
    );
}