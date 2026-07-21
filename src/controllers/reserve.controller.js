import reserveService from "../services/reserve.service.js";
import wrapRoutes from "../utils/wrapRoutes.js";

class ReserveController{
    constructor(service){
        this.service=service
    }

    create = async (req, res) => {
        // 1. Extraemos el ID del usuario autenticado (inyectado por Passport)
        const idUsuario = req.user._id; 
        
        // 2. Extraemos los datos del turno que el usuario quiere reservar
        const {idCancha, idComplejo, fecha, horaInicio, horaFin, precio } = req.body; 

        // 3. Delegamos toda la lógica compleja al servicio
        const nuevaReserva = await this.service.crearReserva(idUsuario, idCancha, idComplejo, fecha, horaInicio, horaFin, precio);

        // 4. AC 5: Devuelve confirmación de reserva
        res.status(201).json({
            status: "success",
            message: "Cancha reservada con éxito",
            reserva: nuevaReserva
        });
    }

    cancelarReserva = async(req,res) =>{
        const id= req.query.id
        const reserva= await this.service.cancelarReserva(id)
        res.status(200).json({
            estado:"Se cancelo la reserva de la cancha",
            reserva
        })
    }



}

export default wrapRoutes(new ReserveController(reserveService))