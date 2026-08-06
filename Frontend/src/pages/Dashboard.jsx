import { LayoutDashboard, CirclePlus, CalendarClock } from "lucide-react";
import StatCard from "../components/StatCard";
import { useState } from "react";
import CourtForm from "../components/CourtForm"
import Reservations from "../components/Reservations"
import CourtGridOwner from "../components/CourtGridOwner";

const Dashboard = () => {
    const [modo, setModo] = useState(1)

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

                    <button
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold ${modo === 1 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(1)}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Mis Canchas
                    </button>

                    <button
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold ${modo === 2 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(2)}
                    >
                        <CirclePlus className="h-4 w-4" />
                        Publicar Cancha
                    </button>

                    <button
                        className={`flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold ${modo === 3 ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 text-white" : "text-gray-400 transition hover:bg-white/5 hover:text-white"}`}
                        onClick={() => setModo(3)}
                    >
                        <CalendarClock className="h-4 w-4" />
                        Reservas Entrantes
                    </button>

                </div>

                {/* Contenido según el modo */}
                {modo === 1 && <CourtGridOwner />}
                {modo === 2 && <CourtForm />}
                {modo === 3 && <Reservations />}

            </section>
        </main>
    )
}

export default Dashboard