import { Calendar, Clock, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DayPicker } from "@daypicker/react";
import { es } from "@daypicker/react/locale";
import "@daypicker/react/style.css";
import { useReserve } from "../hooks/useReserve.js"
import { usePayment } from "../hooks/usePayment.js"
import { useHorarios } from "../hooks/useHorarios.js";

const ReservaForm = ({ horariosCancha, precioPorHora, idCancha }) => {
    const { createReserve, loading: creandoReserva, error: errorReserva } = useReserve()
    const { pagarReserva, loading: generandoPago, error: errorPago } = usePayment()

    const startOfDay = (d) => {
        if (!d) return null
        const dt = new Date(d)
        dt.setHours(0, 0, 0, 0)
        return dt
    }

    const [fecha, setFecha] = useState(startOfDay(new Date()));
    const [horario, setHorario] = useState([])

    const { horariosFiltrados } = useHorarios(idCancha, fecha)

    const puedeAgregar = (hora) => {
        if (horario.length === 0) return true
        const min = Math.min(...horario)
        const max = Math.max(...horario)
        return hora === min - 1 || hora === max + 1
    }

    const puedeQuitar = (hora) => {
        const min = Math.min(...horario)
        const max = Math.max(...horario)
        return hora === min || hora === max
    }

    const toggleHora = (hora) => {
        if (horario.includes(hora)) {
            if (puedeQuitar(hora)) {
                setHorario(prev => prev.filter(item => item !== hora))
            }
        } else if (puedeAgregar(hora)) {
            setHorario(prev => [...prev, hora].sort((a, b) => a - b))
        }
    }

    const fechaFormateada = fecha.toLocaleDateString("es-AR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    const diasCerrado = horariosCancha.reduce((acc, item) => {
        if (item.horas.length == 0) acc.push(item.dia)
        return acc
    }, []);

    const onClick = async () => {
        const horaInicio = Math.min(...horario)
        const horaFin = Math.max(...horario) + 1

        const respuesta = await createReserve({
            cancha: idCancha,
            fecha,
            horaInicio,
            horaFin,
            precio: precioPorHora * horario.length
        })

        if (respuesta?.reserva?._id) {
            await pagarReserva(respuesta.reserva._id)
        }
    }

    const cargando = creandoReserva || generandoPago

    return (
        <div className="sticky top-20 rounded-2xl border border-gray-700 bg-[#00001A]/60 p-5">

            <div className="mb-5 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-bold text-white">RESERVAR CANCHA</h3>
            </div>

            <div className="mb-5">
                <label className="mb-2 block text-xs text-gray-400">Fecha</label>
                <div className="flex justify-center items-center mb-5 rounded-xl border border-gray-700 bg-gray-1000 p-3 text-white [--rdp-accent-color:#f97316] [--rdp-accent-background-color:#7c2d12] [--rdp-cell_disabled_color:#6b7280] [--rdp-cell_today_color:#f97316]">
                    <DayPicker
                        animate
                        mode="single"
                        required
                        locale={es}
                        weekStartsOn={1}
                        selected={fecha}
                        onSelect={(nuevaFecha) => {
                            setFecha(nuevaFecha)
                            setHorario([])
                        }}
                        disabled={[{ before: new Date() }, { dayOfWeek: diasCerrado }]}
                    />
                </div>
            </div>

            <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <label className="text-xs text-gray-400">
                        {horariosFiltrados.length == 0 && "No hay "} Horarios disponibles
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {horariosFiltrados.map(item => {
                        const seleccionado = horario.includes(item.hora)
                        const habilitado = item.isReserved
                            ? false
                            : seleccionado ? puedeQuitar(item.hora) : puedeAgregar(item.hora)

                        return (
                            <button
                                key={item.hora}
                                disabled={!habilitado}
                                className={
                                    item.isReserved
                                        ? "cursor-not-allowed rounded-xl border border-gray-800 bg-white/5 py-2.5 text-sm text-gray-700 line-through"
                                        : !habilitado
                                            ? "cursor-not-allowed rounded-xl border border-gray-800 bg-white/5 py-2.5 text-sm text-gray-600"
                                            : `rounded-xl py-2.5 text-sm text-white transition ${
                                                seleccionado
                                                    ? "bg-linear-to-r from-orange-500/80 to-[#00001A]/70 hover:opacity-90"
                                                    : "border border-gray-700 bg-white/5"
                                            }`
                                }
                                onClick={() => toggleHora(item.hora)}
                            >
                                {item.hora}.00 - {item.hora}.59 hs {item.isReserved && "✓"}
                            </button>
                        )
                    })}
                </div>
                <p className="mt-2 text-[11px] text-gray-500">
                    Elegí un bloque continuo de horas — solo se puede extender desde los extremos.
                </p>
            </div>

            <div className="mb-4 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                <p className="mb-2 text-xs font-semibold text-orange-500">RESUMEN DE RESERVA</p>
                <div className="space-y-1 text-sm text-white">
                    <p><span className="text-gray-400">Fecha:</span> {fechaFormateada}</p>
                    <p>
                        <span className="text-gray-400">Horario:</span>{" "}
                        {horario.length > 0 && `${Math.min(...horario)}:00 - ${Math.max(...horario) + 1}:00 hs`}
                    </p>
                    <p>
                        <span className="text-gray-400">Total:</span>{" "}
                        <span className="font-semibold text-orange-500">
                            {precioPorHora * horario.length}
                        </span>
                    </p>
                </div>
            </div>

            <button
                disabled={horario.length === 0 || cargando}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-lg font-bold text-white shadow-lg shadow-green-500/35 ${
                    horario.length === 0 || cargando
                        ? "cursor-not-allowed bg-green-700 opacity-70"
                        : "bg-green-500 transition hover:bg-green-400"
                }`}
                onClick={onClick}
            >
                <CalendarCheck className="h-5 w-5" />
                {creandoReserva ? "CREANDO RESERVA" : generandoPago ? "REDIRIGIENDO A MERCADO PAGO" : "RESERVAR Y PAGAR"}
            </button>

            {(errorReserva || errorPago) && (
                <p className="mt-3 text-center text-xs text-red-400">{errorReserva || errorPago}</p>
            )}

            <Link
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-green-500/25 bg-green-500/10 py-2.5 text-sm text-green-400 transition-opacity hover:opacity-80"
                to={"/reservas"}
            >
                Ver todas mis reservas →
            </Link>

            <p className="mt-3 text-center text-xs text-gray-400">
                Al reservar vas a ser redirigido a Mercado Pago para completar el pago
            </p>
        </div>
    )
}

export default ReservaForm