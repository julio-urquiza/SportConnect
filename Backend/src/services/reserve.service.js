import reserveDao from "../daos/mongoDB/reserve.dao.js";
import courtDao from "../daos/mongoDB/court.dao.js";
import CustomError from "../utils/customError.js";

class ReserveService{
    constructor(dao){
        this.dao=dao;
    }

    crearReserva = async (idUsuario, idCancha, idComplejo, fecha, horaInicio, horaFin, precio) => {
        // Paso de seguridad extra: Verificar que la cancha exista
        const canchaExiste = await courtDao.getById(idCancha);
        if (!canchaExiste) {
            throw new Error("La cancha solicitada no existe");
        }

        // AC 2: Valida que el horario siga disponible
        // Le pedimos al DAO que busque si ya hay un documento con esos datos exactos
        const reservaExistente = await this.dao.findOne({
            cancha: idCancha,
            fecha: fecha,
            horaInicio: horaInicio,
            horaFin: horaFin,
            estado: "confirmada" // Asumiendo que manejas estados
        });

        if (reservaExistente) {
            // Si encuentra algo, frenamos la ejecución inmediatamente
            throw new Error("El horario seleccionado ya no está disponible");
        }

        // AC 3 y AC 4: Crea la reserva y marca el horario como ocupado
        // Al insertar este documento en la base de datos, el horario queda bloqueado 
        // para cualquier otra petición futura gracias a la validación de arriba.
        const nuevaReserva = await this.dao.create({
            usuario: idUsuario,
            cancha: idCancha,
            complejo: idComplejo,   // Extraído del req.body
            fecha: fecha,
            horaInicio: horaInicio, // Adaptado al esquema real
            horaFin: horaFin,       // Adaptado al esquema real
            precio: precio, // Adaptado al esquema real
            estado: 'confirmada' // Estado inicial de la reserva
        });

        return nuevaReserva;
    }

    cancelarReserva= async(idReserva) => {
        if(!idReserva) throw new CustomError(400, "No se recibio la informacion")
        const reserva= await this.dao.getById(idReserva)
        if(!reserva) throw new CustomError(404, "No se encontro una reserva con esa información")
        return await this.dao.cancelarReserva(idReserva)
    }

}

export default new ReserveService(reserveDao)