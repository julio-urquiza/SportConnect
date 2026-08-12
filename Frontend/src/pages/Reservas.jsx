import { ArrowLeft, CalendarCheck } from "lucide-react";
import ListReserves from "../components/ListReserves.jsx";
import { useContext } from "react";
import { ColorContext } from "../context/ColorContext.jsx";



const Reservas = () => {
    const { theme } = useContext(ColorContext);
    const isDark = theme === "dark";
    return (
        <main className={`min-h-screen transition-colors duration-200 ${isDark ? "bg-[#00001A]" : "bg-slate-50"}`}>
            <section className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-3">
                    <button className={`flex items-center gap-2 text-sm transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}>
                        <ArrowLeft className="h-4 w-4" />
                        Inicio
                    </button>

                    <span className={isDark ? "text-gray-700" : "text-slate-300"}>/</span>

                    <span className={`text-sm ${isDark ? "text-white" : "text-slate-900"}`}>
                        Mis Reservas
                    </span>
                </div>

                {/* Título */}
                <div className="mb-8 flex items-center gap-3">
                    <CalendarCheck className="h-7 w-7 text-orange-500" />

                    <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                        Mis Reservas
                    </h1>
                </div>

                {/* Lista */}
                <ListReserves />

            </section>

        </main>
    )
}

export default Reservas
