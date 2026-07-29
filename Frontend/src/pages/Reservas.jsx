import { ArrowLeft, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom"

const Reservas = () => {
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

                {/* Estado vacío */}
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
            </section>

        </main>
    )
}

export default Reservas