import { CirclePlus } from "lucide-react";

const EstadoVacioCanchas = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">

            <div className="mb-4 text-5xl">
                🏟️
            </div>

            <h2 className="mb-2 text-xl font-bold text-white">
                Aún no publicaste ninguna cancha
            </h2>

            <p className="mb-5 text-gray-400">
                Publicá tu primera cancha y empezá a recibir reservas
            </p>

            <button className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-6 py-3 font-bold text-white hover:opacity-90">
                <CirclePlus className="h-4 w-4" />
                PUBLICAR MI PRIMERA CANCHA
            </button>

        </div>
    )
}

export default EstadoVacioCanchas