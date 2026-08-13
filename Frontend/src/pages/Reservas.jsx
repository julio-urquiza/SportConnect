import { ArrowLeft, CalendarCheck } from "lucide-react";
import ListReserves from "../components/ListReserves.jsx";
import useTitulo from "../hooks/useTitle.js";



const Reservas = () => {
    useTitulo("Tus Reservas")
    return (
        <main className="min-h-screen bg-[rgb(0,0,26)]">
            <section className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-3">
                    <button className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" />
                        Inicio
                    </button>

                    <span className="text-gray-700">/</span>

                    <span className="text-sm text-white">
                        Mis Reservas
                    </span>
                </div>

                {/* Título */}
                <div className="mb-8 flex items-center gap-3">
                    <CalendarCheck className="h-7 w-7 text-orange-500" />

                    <h1 className="text-3xl font-bold text-white">
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