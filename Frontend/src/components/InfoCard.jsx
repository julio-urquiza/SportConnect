import { MapPin, Star } from "lucide-react";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";

const InfoCard = ({ubicacion, puntuacion, precioHora}) => {
    const { theme } = useContext(ColorContext);

    return (
        <div className={`grid grid-cols-3 overflow-hidden rounded-2xl border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>

            <div className={`flex flex-col items-center justify-center border-r px-2 py-4 text-center ${
                theme === 'dark' ? 'border-gray-700 bg-[#00001A]/60' : 'border-gray-200 bg-gray-50'
            }`}>
                <MapPin className={`mb-1 h-4 w-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />

                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Ubicación
                </p>

                <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {ubicacion}
                </p>
            </div>

            <div className={`flex flex-col items-center justify-center border-r px-2 py-4 text-center ${
                theme === 'dark' ? 'border-gray-700 bg-[#00001A]/60' : 'border-gray-200 bg-gray-50'
            }`}>
                <Star className="mb-1 h-4 w-4 fill-yellow-400 text-yellow-400" />

                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Calificación
                </p>

                <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {puntuacion} / 5.0
                </p>
            </div>

            <div className={`flex flex-col items-center justify-center px-2 py-4 text-center ${
                theme === 'dark' ? 'bg-[#00001A]/60' : 'bg-gray-50'
            }`}>
                <span className="mb-1 text-orange-500">$</span>

                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Precio/hora
                </p>

                <p className="font-bold text-orange-500">
                    {precioHora} $
                </p>
            </div>

        </div>
    )
}

export default InfoCard;