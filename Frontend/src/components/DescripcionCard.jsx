
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext";

const DescripcionCard = ({ descripcion }) => {
    // Extraemos el tema actual del contexto
    const { theme } = useContext(ColorContext);

    return (
        <div className={`rounded-2xl border p-5 transition-colors duration-300 ${
            theme === 'dark' ? 'border-gray-700 bg-[#00001A]/60' : 'border-gray-200 bg-gray-50'
        }`}>
            
            {/* Título dinámico */}
            <h3 className={`mb-4 text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
                Descripción
            </h3>
            
            {/* Párrafo de la descripción dinámico */}
            <p className={`${
                theme === 'dark' ? 'text-white' : 'text-gray-700'
            }`}>
                {descripcion}
            </p>
            
        </div>
    )
}

export default DescripcionCard;