import { useContext } from 'react';
import { ColorContext } from '../context/ColorContext'; 

const PortadaCard = ({ imagen, nombre }) => {
    
    // 1. Consumimos el estado del tema desde el contexto
    const { theme } = useContext(ColorContext);

    return (
        <div 
            className={`relative h-80 overflow-hidden rounded-2xl transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#000030] text-white' : 'bg-gray-100 text-gray-900 border border-gray-200'
            }`}
        >
            <img
                src={imagen}
                alt={nombre}
                className="h-full w-full object-cover"
            />

            {/* El degradado se adapta al fondo según el tema */}
            <div 
                className={`absolute inset-0 ${
                    theme === 'dark' 
                        ? 'bg-linear-to-t from-[#00001A]/90 to-transparent' 
                        : 'bg-linear-to-t from-white/90 via-white/30 to-transparent'
                }`} 
            />

            <div className="absolute bottom-5 left-5">
                <span className={`mb-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium backdrop-blur ${
                    theme === 'dark' 
                        ? 'border-orange-500/40 bg-black/60 text-orange-400' 
                        : 'border-orange-500/30 bg-white/80 text-orange-600 shadow-sm'
                }`}>
                    🎾 Tenis
                </span>

                <h1 className={`text-4xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                    {nombre}
                </h1>
            </div>
        </div>
    )
}

export default PortadaCard;