import { Link } from "react-router-dom"
import { usePayment } from "../hooks/usePayment.js"
import { SPORTS } from "../constants/sports.js"

const ESTILOS_ESTADO = {
    pendiente_pago: "bg-amber-600 border border-amber-500",
    confirmada: "bg-green-600 border border-green-500",
    cancelada: "bg-red-600 border border-red-500",
    expirada: "bg-gray-600 border border-gray-500",
    finalizada: "bg-blue-600 border border-blue-500",
    reembolsada: "bg-purple-600 border border-purple-500"
}

const ETIQUETAS_ESTADO = {
    pendiente_pago: "Pago pendiente",
    confirmada: "Confirmada",
    cancelada: "Cancelada",
    expirada: "Expirada",
    finalizada: "Finalizada",
    reembolsada: "Reembolsada"
}

const ReservaCard = ({ reserve, onClickCancel }) => {
    const { pagarReserva, loading: pagando } = usePayment()

    const puedeCancelar = ["pendiente_pago", "confirmada"].includes(reserve.estado)
    const puedePagar = reserve.estado === "pendiente_pago"

    return (
        <div className="rounded-2xl overflow-hidden flex flex-col bg-[#00001a]/70 border border-gray-700 shadow-lg">

            <div className="relative h-36 overflow-hidden bg-[#000030]">
                <img
                    src={reserve.cancha.imagenes[0]}
                    alt={reserve.cancha.nombre}
                    className="w-full h-full object-cover"
                />
                <div className="image-overlay absolute inset-0 bg-linear-to-t from-[#00001a]/90 to-transparent" />

                <span className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs bg-black/70 border border-orange-500/40 text-orange-500">
                    {SPORTS.find(s =>(s.deporte===reserve.cancha.deporte).logo)} {SPORTS.find(s =>(s.deporte===reserve.cancha.deporte).label)}
                </span>

                <span className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs text-white ${ESTILOS_ESTADO[reserve.estado] || "bg-gray-600"}`}>
                    {ETIQUETAS_ESTADO[reserve.estado] || reserve.estado}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg">{reserve.cancha.nombre}</h3>

                <p className="text-gray-400 text-sm">
                    📍 {reserve.cancha.direccion}, {reserve.cancha.ubicacion}
                </p>

                <p className="text-gray-200 text-sm">
                    📅 {new Date(reserve.fecha).toLocaleDateString("es-AR", {
                        weekday: "long", day: "numeric", month: "long"
                    })}
                </p>

                <p className="text-gray-200 text-sm">
                    🕒 {Math.min(...reserve.horarios.horas)}:00 - {Math.max(...reserve.horarios.horas) + 1}:00 hs{" "}
                    <span className="text-orange-500 font-semibold">$ {reserve.precio}</span>
                </p>

                <div className="flex gap-2 mt-3">
                    <Link
                        className="flex flex-1 items-center justify-center py-2 rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 text-white"
                        to={`/cancha/${reserve.cancha._id}`}
                    >
                        Ver cancha
                    </Link>

                    {puedePagar && (
                        <button
                            disabled={pagando}
                            className="px-4 py-2 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-50 cursor-pointer"
                            onClick={() => pagarReserva(reserve._id)}
                        >
                            {pagando ? "..." : "Pagar ahora"}
                        </button>
                    )}

                    {puedeCancelar && (
                        <button
                            className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 hover:bg-red-500/20 cursor-pointer"
                            onClick={() => onClickCancel(reserve._id)}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReservaCard
