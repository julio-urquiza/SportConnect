import { LayoutDashboard, CirclePlus, CalendarClock } from "lucide-react";
import StatCard from "../components/StatCard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate= useNavigate()

    const toDashboardPagos=()=>{
        navigate('/dashboard/pagos')
    }

    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto px-4 py-8">

                {/* Encabezado */}
                <div className="mb-8">
                    <p className="mb-1 text-sm text-gray-400">
                        Bienvenido, julio@gmail.com
                    </p>

                    <h1 className="text-4xl font-bold text-white">
                        Panel de Dueño
                    </h1>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <StatCard value="0" color="text-orange-500" label="Canchas publicadas" />
                        <StatCard value="0" color="text-white" label="Canchas totales" />
                        <StatCard value="3" color="text-green-400" label="Reservas entrantes" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex w-fit gap-1 rounded-2xl border border-gray-700 bg-white/5 p-1">

                    <button className="flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-5 py-2.5 font-semibold text-white">
                        <LayoutDashboard className="h-4 w-4" />
                        Mis Canchas
                    </button>

                    <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white">
                        <CirclePlus className="h-4 w-4" />
                        Publicar Cancha
                    </button>

                    <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white">
                        <CalendarClock className="h-4 w-4" />
                        Reservas Entrantes
                    </button>
                    <button 
                    onClick={toDashboardPagos}
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-gray-400 transition hover:bg-white/5 hover:text-white">
                    Configurar cobros con Mercado Pago
                    </button>
                </div>

                {/* Estado vacío */}
                <div className="flex flex-col items-center justify-center py-20 text-center">

                    <div className="mb-4 text-5xl">
                        🏟️
                    </div>

                    <h2 className="mb-2 text-xl font-bold text-white">
                        Aún no publicaste ninguna cancha
                    </h2>

                    <p className="mb-5 text-gray-400">
                        Publicá tu primera cancha y empezá a recibir reservas
                    </p>

                    <button className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-6 py-3 font-bold text-white hover:opacity-90">
                        <CirclePlus className="h-4 w-4" />
                        PUBLICAR MI PRIMERA CANCHA
                    </button>

                </div>

            </section>
        </main>
    )
}

export default Dashboard