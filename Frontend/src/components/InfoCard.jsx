import { MapPin, Star } from "lucide-react";

const InfoCard = ({ubicacion, puntuacion, precioHora}) => {
    return (
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-700">

            <div className="flex flex-col items-center justify-center border-r border-gray-700 bg-[#00001A]/60 px-2 py-4 text-center">
                <MapPin className="mb-1 h-4 w-4 text-gray-400" />

                <p className="text-xs text-gray-400">
                    Ubicación
                </p>

                <p className="font-bold text-white">
                    {ubicacion}
                </p>
            </div>

            <div className="flex flex-col items-center justify-center border-r border-gray-700 bg-[#00001A]/60 px-2 py-4 text-center">
                <Star className="mb-1 h-4 w-4 fill-yellow-400 text-yellow-400" />

                <p className="text-xs text-gray-400">
                    Calificación
                </p>

                <p className="font-bold text-white">
                    {puntuacion} / 5.0
                </p>
            </div>

            <div className="flex flex-col items-center justify-center bg-[#00001A]/60 px-2 py-4 text-center">
                <span className="mb-1 text-orange-500">$</span>

                <p className="text-xs text-gray-400">
                    Precio/hora
                </p>

                <p className="font-bold text-orange-500">
                    {precioHora} $
                </p>
            </div>

        </div>
    )
}

export default InfoCard