import { useEffect } from "react"
import { Receipt } from "lucide-react"
import { useHistorialPagos } from "../hooks/useHistorialPagos"
import { usePayment } from "../hooks/usePayment"
import Spinner from "./Spinner"

const ETIQUETAS_ESTADO = {
    confirmada: { texto: "Pagada", clase: "bg-green-600" },
    reembolsada: { texto: "Reembolsada", clase: "bg-purple-600" },
    finalizada: { texto: "Finalizada", clase: "bg-blue-600" }
}

const TablaHistorialPagos = () => {
    const { historial, loading, error, cargarHistorial } = useHistorialPagos()
    const { reembolsar, loading: reembolsando } = usePayment()

    useEffect(() => {
        cargarHistorial()
    }, [cargarHistorial])

    const handleReembolsar = async (reserva) => {
        if (!window.confirm(`¿Reembolsar $${reserva.montoTotal} de esta reserva? Esta acción no se puede deshacer.`)) {
            return
        }
        const resultado = await reembolsar(reserva._id)
        if (resultado) {
            await cargarHistorial()
        }
    }

    if (loading && historial.length === 0) return <Spinner />

    if (error) return <p className="text-sm text-red-400">{error}</p>

    return (
        <div className="rounded-2xl border border-gray-700 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-2">
                <Receipt className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">Historial de pagos</h3>
            </div>

            {historial.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">Todavía no recibiste pagos</p>
            ) : (
                <div className="space-y-3">
                    {historial.map((reserva) => {
                        const estado = ETIQUETAS_ESTADO[reserva.estado] || { texto: reserva.estado, clase: "bg-gray-600" }

                        return (
                            <div
                                key={reserva._id}
                                className="flex flex-col gap-2 rounded-xl border border-gray-800 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-white">{reserva.cancha?.nombre}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(reserva.fecha).toLocaleDateString("es-AR")} · {reserva.horaInicio}:00-{reserva.horaFin}:00 hs
                                    </p>
                                    <p className="text-xs text-gray-500">{reserva.usuario?.email}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-orange-500">$ {reserva.montoTotal}</p>
                                        {reserva.comisionSportConnect > 0 && (
                                            <p className="text-[11px] text-gray-500">
                                                Comisión: ${reserva.comisionSportConnect}
                                            </p>
                                        )}
                                    </div>

                                    <span className={`rounded-full px-3 py-1 text-xs text-white ${estado.clase}`}>
                                        {estado.texto}
                                    </span>

                                    {reserva.estado === "confirmada" && (
                                        <button
                                            disabled={reembolsando}
                                            onClick={() => handleReembolsar(reserva)}
                                            className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20 disabled:opacity-50"
                                        >
                                            Reembolsar
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default TablaHistorialPagos