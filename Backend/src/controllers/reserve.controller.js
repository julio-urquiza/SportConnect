import reserveService from "../services/reserve.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class ReserveController {
    constructor(service) {
        this.service = service
    }

    create = async (req, res) => {
        const idUsuario = req.user._id
        const { cancha, fecha, horaInicio, horaFin, precio } = req.body

        const nuevaReserva = await this.service.crearReserva(
            idUsuario, cancha, fecha, horaInicio, horaFin, precio
        )

        res.status(201).json({ status: "success", reserva: nuevaReserva })
    }

    cancelarReserva = async (req, res) => {
        const { id } = req.query
        const reserva = await this.service.cancelarReserva(id, req.user._id)

        res.status(200).json({
            estado: "Se canceló la reserva de la cancha",
            reserva
        })
    }

    getHorarios = async (req, res) => {
        const { idCancha, fecha } = req.query
        const horarios = await this.service.getHorarios(idCancha, fecha)

        res.status(200).json({ status: "success", horarios })
    }

    obtenerReservas = async (req, res) => {
        const reservas = await this.service.obtenerReservas(req.query)
        res.status(200).json({ status: "success", reservas })
    }

    obtenerReservasDuenio = async (req, res) => {
        const reservas = await this.service.obtenerReservasDuenio(req.user._id, req.query)

        res.status(200).json({
            status: "success",
            reservas
        });
    }

    modificarReserva = async (req, res) => {
        const { id } = req.query
        const reserva = await this.service.modificarReservas(id, req.body)
        res.status(200).json({ status: "success", reserva })
    }

    obtenerHistorialPagos = async (req, res) => {
        const historial = await this.service.obtenerHistorialPagos(req.user._id, req.query)
        res.status(200).json({ status: "success", historial })
    }
}

export default wrapRoutes(new ReserveController(reserveService))
