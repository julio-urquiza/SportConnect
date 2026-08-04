import { Link } from "react-router-dom"
import ReservaCard from "./ReservaCard.jsx";
import { useReserve } from "../hooks/useReserve.js"
import { useEffect } from "react";
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import Spinner from "./Spinner.jsx";

const ListReserves = () => {
    const { user } = useContext(AuthContext)
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

    if (reserves.length == 0) return (
        <div className="py-24 text-center">
            <div className="mb-4 text-6xl">📅</div>

            <h2 className="mb-2 text-2xl font-bold text-white">
                No tenés reservas todavía
            </h2>

            <p className="mb-6 text-gray-400">
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

    return (
        <div className="space-y-10">
            <section>
                <p className="mb-4 font-jura text-lg font-bold text-green-400">
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
