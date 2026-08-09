import { Link } from "react-router-dom"
import ReservaCard from "./ReservaCard.jsx";
import { useReserve } from "../hooks/useReserve.js"
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx"
// 1. Importamos el contexto de color
import { ColorContext } from "../context/ColorContext.jsx";
import Spinner from "./Spinner.jsx";

const ListReserves = () => {
    const { user } = useContext(AuthContext)
    // 2. Extraemos el tema actual
    const { theme } = useContext(ColorContext)
    const { reserves, loading, error, loadReserves, updateReserve } = useReserve()

    useEffect(() => {
        loadReserves({ usuario: user.id })
    }, [])

    const handleCancelReserve = async (id, state) => {
        const cancelledReserve = await updateReserve(id, { estado: state })
        console.log(cancelledReserve)
        if (cancelledReserve) {
            await loadReserves({ usuario: user.id })
        }
    }

    if (loading) return (<Spinner />)

    if (error) return ("error")

    // --- ESTADO 1: Sin reservas ---
    if (reserves.length == 0) return (
        <div className="py-24 text-center">
            <div className="mb-4 text-6xl">📅</div>

            {/* Título dinámico */}
            <h2 className={`mb-2 text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
                No tenés reservas todavía
            </h2>

            {/* Subtítulo dinámico */}
            <p className={`mb-6 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
                Buscá una cancha y hacé tu primera reserva
            </p>

            <Link
                className="rounded-2xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-8 py-3 text-lg font-bold text-white transition-opacity hover:opacity-90"
                to={"/"}
            >
                BUSCAR CANCHAS
            </Link>
        </div>
    )

    // --- ESTADO 2: Con reservas ---
    return (
        <div className="space-y-10">
            <section>
                {/* Título de sección dinámico (Cambiamos la intensidad del verde para que resalte en blanco) */}
                <p className={`mb-4 font-jura text-lg font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                    ✅ Próximas ({reserves.length})
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        reserves.map((reserve) => (
                            <ReservaCard key={reserve._id} reserve={reserve} onClickCancel={handleCancelReserve} />
                        ))
                    }
                </div>
            </section>
        </div>
    )
}

export default ListReserves