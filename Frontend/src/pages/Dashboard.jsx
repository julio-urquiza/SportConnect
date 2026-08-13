import { LayoutDashboard, CirclePlus, CalendarClock } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState, useContext, useEffect } from "react";
import CourtForm from "../components/CourtForm"
import Reservations from "../components/Reservations"
import CourtGridOwner from "../components/CourtGridOwner";
import { useCourts } from "../hooks/useCourts";
import { AuthContext } from "../context/AuthContext.jsx"
import StatSpinner from "../components/StartSpinner";
import { useReserve } from "../hooks/useReserve.js"
import { useNavigate } from "react-router-dom";
import useTitulo from "../hooks/useTitle.js";

const Dashboard = () => {
    const navigate= useNavigate()
    const toDashboardPagos=()=>{
        navigate('/dashboard/pagos')
    }

    const [modo, setModo] = useState(1)
    const { user } = useContext(AuthContext);
    const { courts, courtsLoading, getCourts, createCourt, updateCourt, deleteCourt } = useCourts({ id: null, filters: { duenio: user.id } })
    const { reserves, reservesLoading, getReservesOwner } = useReserve()
    
    useEffect(() => {
        getCourts()
        getReservesOwner()
    }, [])

    useTitulo("Tus Canchas")

    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto px-4 py-8">

                {/* Encabezado */}
                <div className="mb-8">
                    <p className="mb-1 text-sm text-gray-400">
                        Bienvenido, {user.email}
                    </p>

                    <h1 className="text-4xl font-bold text-white">
                        Panel de Dueño
                    </h1>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <StatCard
                            value={courtsLoading ? (<StatSpinner />) : courts.length}
                            color="text-orange-500" label="Canchas publicadas" 
                        />
                        <StatCard 
                            value={courtsLoading ? (<StatSpinner />) : courts.filter(item => item.disponible==true).length} 
                            color="text-white" label="Canchas totales" 
                        />
                        <StatCard value={reservesLoading ? (<StatSpinner />) : reserves.length} color="text-green-400" label="Reservas entrantes" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex w-full flex-col gap-1 rounded-2xl border border-gray-700 bg-white/5 p-1 sm:w-fit sm:flex-row">

                    <button
                        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold sm:justify-start ${modo === 1 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(1)}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Mis Canchas
                    </button>

                    <button
                        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold sm:justify-start ${modo === 2 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(2)}
                    >
                        <CirclePlus className="h-4 w-4" />
                        Publicar Cancha
                    </button>

                    <button
                        className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold sm:justify-start ${modo === 3 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(3)}
                    >
                        <CalendarClock className="h-4 w-4" />
                        Reservas Entrantes
                    </button>
                  </div>

                    <button
                    onClick={toDashboardPagos}
                    className="payment-settings-button flex w-full items-center justify-center rounded-xl border border-orange-500/40 bg-orange-500/10 px-5 py-2.5 font-semibold text-orange-500 transition hover:bg-orange-500/20 md:w-auto">
                    Configurar cobros con Mercado Pago
                    </button>
                </div>

                {/* Contenido según el modo */}
                {!courtsLoading && !reservesLoading && 
                    (
                        <>
                            {modo === 1 && <CourtGridOwner courts={courts} onUpdate={updateCourt} onDelete={deleteCourt}/>}
                            {modo === 2 && <CourtForm onCreateCourt={createCourt} userId={user.id} />}
                            {modo === 3 && <Reservations reserves={reserves}/>}
                        </>
                    )
                }

            </section>
        </main>
    )
}

export default Dashboard
