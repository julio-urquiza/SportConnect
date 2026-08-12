import { LayoutDashboard, CirclePlus, CalendarClock } from "lucide-react";
import StatCard from "../components/StatCard";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";

const Dashboard = () => {
    const { theme } = useContext(ColorContext);
    const isDark = theme === "dark";
    return (
        <main className={`min-h-screen transition-colors duration-200 ${isDark ? "bg-[#00001A]" : "bg-slate-50"}`}>
            <section className="container mx-auto px-4 py-8">

                {/* Encabezado */}
                <div className="mb-8">
                    <p className={`mb-1 text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                        Bienvenido, julio@gmail.com
                    </p>

                    <h1 className={`text-4xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        Panel de Dueño
                    </h1>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <StatCard value="0" color="text-orange-500" label="Canchas publicadas" />
                        <StatCard value="0" color={isDark ? "text-white" : "text-slate-900"} label="Canchas totales" />
                        <StatCard value="3" color="text-green-400" label="Reservas entrantes" />
                    </div>
                </div>

                {/* Tabs */}
                <div className={`mb-6 flex w-fit gap-1 rounded-2xl border p-1 ${isDark ? "border-gray-700 bg-white/5" : "border-slate-200 bg-white shadow-sm"}`}>

                    <button className="flex items-center gap-2 rounded-xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 px-5 py-2.5 font-semibold text-white">
                        <LayoutDashboard className="h-4 w-4" />
                        Mis Canchas
                    </button>

                    <button className={`flex items-center gap-2 rounded-xl px-5 py-2.5 transition ${isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <CirclePlus className="h-4 w-4" />
                        Publicar Cancha
                    </button>

                    <button className={`flex items-center gap-2 rounded-xl px-5 py-2.5 transition ${isDark ? "text-gray-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}>
                        <CalendarClock className="h-4 w-4" />
                        Reservas Entrantes
                    </button>

                </div>

                {/* Estado vacío */}
                <div className="flex flex-col items-center justify-center py-20 text-center">

                    <div className="mb-4 text-5xl">
                        🏟️
                    </div>

                    <h2 className={`mb-2 text-xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        Aún no publicaste ninguna cancha
                    </h2>

                    <p className={`mb-5 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
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
