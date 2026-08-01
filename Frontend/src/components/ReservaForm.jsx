import { Calendar, Clock, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import { es } from "@daypicker/react/locale";
import "@daypicker/react/style.css";

const ReservaForm = ({ horariosCancha, precioPorHora}) => {
    const [fecha, setFecha] = useState(new Date());
    const [horario, setHorario] = useState([])

    const agregarHorario = (hora) => {
        setHorario(prev => [...prev, hora])
    }

    const quitarHorario = (hora) => {
        setHorario(prev => prev.filter(item => item !== hora))
    }

    const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const horarios = (() => {
        const dias = []
        horariosCancha.forEach(item => {
            if (item.dia == fecha.getDay()) {
                for (let i = item.inicio; i <= item.fin; i++) {
                    dias.push(i);
                }
            }
        })
        return dias
    })()

    const diasCerrado = [0, 1, 2, 3, 4, 5, 6].reduce((acc, numero) => {
        if (!(horariosCancha.map(item => item.dia).includes(numero))) {
            acc.push(numero)
        }
        return acc
    }, []);

    return (
        <div className="sticky top-20 rounded-2xl border border-gray-700 bg-[#00001A]/60 p-5">

            <div className="mb-5 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />

                <h3 className="text-lg font-bold text-white">
                    RESERVAR CANCHA
                </h3>
            </div>

            {/* fechas */}
            <div className="mb-5">
                <label className="mb-2 block text-xs text-gray-400">
                    Fecha
                </label>

                <div className="flex justify-center items-center mb-5 rounded-xl border border-gray-700 bg-gray-1000 p-3 text-white [--rdp-accent-color:#f97316] [--rdp-accent-background-color:#7c2d12] [--rdp-cell_disabled_color:#6b7280] [--rdp-cell_today_color:#f97316]">
                    <DayPicker
                        animate
                        mode="single"
                        required
                        locale={es}
                        weekStartsOn={1}
                        selected={fecha}
                        onSelect={(fecha)=>{
                            setFecha(fecha)
                            setHorario([])
                        }}
                        disabled={[{ before: new Date() }, { dayOfWeek: diasCerrado }]}
                    />
                </div>
            </div>

            {/* horarios */}
            <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />

                    <label className="text-xs text-gray-400">
                        {horarios.length == 0 && "No hay "} Horarios disponibles
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2">

                    {
                        horarios.map(item =>
                        (
                            <button
                                key={item}
                                className={`rounded-xl py-2.5 text-sm text-white transition 
                                        ${horario.includes(item)
                                        ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 hover:opacity-90"
                                        : "border border-gray-700 bg-white/5"
                                    }
                                    `}
                                onClick={horario.includes(item)
                                        ? () => quitarHorario(item)
                                        : () => agregarHorario(item)
                                    }
                                >
                                {item}.00 hs
                            </button>
                        ))
                    }
            </div>
        </div>

            {/* resumen */ }
    <div className="mb-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
        <p className="mb-2 text-xs font-semibold text-orange-500">
            RESUMEN DE RESERVA
        </p>

        <div className="space-y-1 text-sm text-white">
            <p>
                <span className="text-gray-400">Fecha:</span> {fechaFormateada}
            </p>

            <p>
                <span className="text-gray-400">Horario:</span> {horario.map((hora)=> `${hora}:00 hs, `)}
            </p>

            <p>
                <span className="text-gray-400">Total:</span>{" "}
                <span className="font-semibold text-orange-500">
                    {precioPorHora*horario.length}
                </span>
            </p>
        </div>
    </div>

    {/* botones */ }
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-3.5 text-lg font-bold text-white shadow-lg shadow-green-500/35 transition hover:bg-green-600">
                <CalendarCheck className="h-5 w-5" />
                CONFIRMAR RESERVA
            </button>

            <Link
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-500/25 bg-green-500/10 py-2.5 text-sm text-green-400 transition-opacity hover:opacity-80"
                to={"/reservas"}
            >
                Ver todas mis reservas →
            </Link>

            <p className="mt-3 text-center text-xs text-gray-400">
                Al confirmar aceptás los términos y condiciones
            </p>

        </div >
    )
}

export default ReservaForm