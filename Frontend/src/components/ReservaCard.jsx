import { Link } from "react-router-dom"

const ReservaCard = ({ reserve, onClickCancel}) => {
    // console.log(reserve)
    
    const onclick = async () => {
        await onClickCancel(reserve._id, reserve.estado == "confirmada" ? "cancelada" : "confirmada" )
    }

    return (

        <div className="rounded-2xl overflow-hidden flex flex-col bg-[#00001a]/70 border border-green-400/30 shadow-lg shadow-green-400/10">

            <div className="relative h-36 overflow-hidden bg-[#000030]">
                <img
                    src={reserve.cancha.imagenes[0]}
                    alt="Tenis Recoleta"
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-[#00001a]/90 to-transparent" />

                <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs bg-black/70 border border-orange-500/40 text-orange-500">
                    {reserve.cancha.deporte}
                </span>

                <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs text-white 
                    ${reserve.estado == "confirmada" 
                    ? "bg-green-600 border border-green-500"
                    : "bg-red-600 border border-red-500"}
                    
                    `}>
                    {reserve.estado}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg">
                    {reserve.cancha.nombre}
                </h3>

                <p className="text-gray-400 text-sm">
                    📍 {reserve.cancha.direccion}, {reserve.cancha.ubicacion},
                </p>

                <p className="text-gray-200 text-sm">
                    📅 {new Date(reserve.fecha).toLocaleDateString("es-AR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                    })}
                </p>

                <p className="text-gray-200 text-sm">
                    🕒 {reserve.horarios.horas.map(item => `${item}:00-${item}:59 hs, `)}
                    <span className="text-orange-500 font-semibold">$ {reserve.precio}</span>
                </p>

                <div className="flex gap-2 mt-3">
                    <Link 
                        className="flex flex-1 items-center justify-center py-2 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 text-white"
                        to={`/cancha/${reserve.cancha._id}`}
                        >
                        Ver cancha
                    </Link>

                    <button 
                        className={`px-4 py-2 rounded-xl border 
                            ${reserve.estado == "confirmada" 
                                ? "border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20" 
                                : "border-green-500/30 bg-green-500/10 text-green-500 hover:bg-green-500/20"}
                            `}
                        onClick={onclick}
                        >
                        {reserve.estado == "confirmada" ? "Cancelar" : "Confirmar"}
                    </button>
                </div>
            </div>

        </div>

    )
}

export default ReservaCard