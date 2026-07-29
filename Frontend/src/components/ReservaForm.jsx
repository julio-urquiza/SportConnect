import { Calendar, Clock, CalendarCheck } from "lucide-react";

const ReservaForm = () => {
    return (
        <div className="sticky top-20 rounded-2xl border border-gray-700 bg-[#00001A]/60 p-5">

            <div className="mb-5 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />

                <h3 className="text-lg font-bold text-white">
                    RESERVAR CANCHA
                </h3>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-xs text-gray-400">
                    Fecha
                </label>

                <input
                    type="date"
                    min="2026-07-21"
                    defaultValue="2026-07-21"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-black outline-none"
                />
            </div>


            <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />

                    <label className="text-xs text-gray-400">
                        Horarios disponibles
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <button className="rounded-xl border border-gray-700 bg-white/5 py-2.5 text-sm text-white transition">
                        12:00
                    </button>

                    <button
                        disabled
                        className="cursor-not-allowed rounded-xl border border-gray-800 bg-white/5 py-2.5 text-sm text-gray-700 line-through"
                    >
                        15:00 ✓
                    </button>

                    <button className="rounded-xl bg-linear-to-r from-orange-500/80 to-[#00001A]/70 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
                        17:00
                    </button>
                </div>
            </div>

            <div className="mb-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                <p className="mb-2 text-xs font-semibold text-orange-500">
                    RESUMEN DE RESERVA
                </p>

                <div className="space-y-1 text-sm text-white">
                    <p>
                        <span className="text-gray-400">Fecha:</span> martes, 21 de julio
                    </p>

                    <p>
                        <span className="text-gray-400">Horario:</span> 17:00
                    </p>

                    <p>
                        <span className="text-gray-400">Total:</span>{" "}
                        <span className="font-semibold text-orange-500">
                            $15.000
                        </span>
                    </p>
                </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-3.5 text-lg font-bold text-white shadow-lg shadow-green-500/35 transition hover:bg-green-600">
                <CalendarCheck className="h-5 w-5" />
                CONFIRMAR RESERVA
            </button>

            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-500/25 bg-green-500/10 py-2.5 text-sm text-green-400 transition-opacity hover:opacity-80">
                Ver todas mis reservas →
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
                Al confirmar aceptás los términos y condiciones
            </p>

        </div>
    )
}

export default ReservaForm