import { Link, useSearchParams } from "react-router-dom"
import ReservaCard from "./ReservaCard.jsx";
import { useReserve } from "../hooks/useReserve.js"
import { useEffect } from "react";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import Spinner from "./Spinner.jsx";

const MENSAJES_PAGO = {
    exitoso: { texto: "¡Pago aprobado! Tu reserva está confirmada.", clase: "border-green-500/30 bg-green-500/10 text-green-400" },
    fallido: { texto: "El pago no pudo procesarse. Podés intentar de nuevo.", clase: "border-red-500/30 bg-red-500/10 text-red-400" },
    pendiente: { texto: "Tu pago está pendiente de confirmación.", clase: "border-amber-500/30 bg-amber-500/10 text-amber-400" }
}

const ListReserves = () => {
    const { user } = useContext(AuthContext)
    const { reserves, reservesLoading, error, loadReserves, cancelReserve } = useReserve()
    const [searchParams] = useSearchParams()
    const mensajePago = MENSAJES_PAGO[searchParams.get("pago")]

    useEffect(() => {
        loadReserves({ usuario: user.id })
    }, [])

    // Mientras haya reservas pendientes de pago, refresco cada 5s
    // para reflejar la confirmación en cuanto llegue el webhook.
    useEffect(() => {
        const hayPendientes = reserves.some(r => r.estado === "pendiente_pago")
        if (!hayPendientes) return

        const intervalo = setInterval(() => {
            loadReserves({ usuario: user.id })
        }, 5000)

        return () => clearInterval(intervalo)
    }, [reserves])

    const handleCancelReserve = async (id) => {
        const cancelledReserve = await cancelReserve(id)
        if (cancelledReserve) {
            await loadReserves({ usuario: user.id })
        }
    }

    if (reservesLoading) return (<Spinner />)

    if (error) return ("error")

    return (
        <div className="space-y-6">
            {mensajePago &&
                (
                    <div className={`rounded-xl border px-4 py-3 text-sm ${mensajePago.clase}`}>
                        {mensajePago.texto}
                    </div>
                )
            }

            {reserves.length === 0 ? (
                <div className="py-24 text-center">
                    <div className="mb-4 text-6xl">📅</div>
                    <h2 className="mb-2 text-2xl font-bold text-white">No tenés reservas todavía</h2>
                    <p className="mb-6 text-gray-400">Buscá una cancha y hacé tu primera reserva</p>
                    <Link
                        className="rounded-2xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-8 py-3 text-lg font-bold text-white transition-opacity hover:opacity-90"
                        to={"/"}
                    >
                        BUSCAR CANCHAS
                    </Link>
                </div>
            ) : (
                <section>
                    <p className="mb-4 font-jura text-lg font-bold text-green-400">
                        Reservas ({reserves.length})
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reserves.map((reserve) => (
                            <ReservaCard key={reserve._id} reserve={reserve} onClickCancel={handleCancelReserve} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}


export default ListReserves