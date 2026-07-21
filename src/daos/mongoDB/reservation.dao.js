import reservationModel from "./models/reservation.model.js"
import MongoDao from "./mongo.dao.js"

class ReserveDao extends MongoDao{
    constructor(model){
        super(model)
    }

    findOne = async (filtro) => {
        return await this.model.findOne(filtro);
    }

    cancelarReserva = async(idReserva) =>{
        return await this.update(idReserva,
            {
                estado:"cancelada"
            }
        )
    }

    getByUsuario = async (usuarioId) => {
        return await this.model
            .find({ usuario: usuarioId })
            .populate("court")
            .sort({ fechaInicio: 1 });
    }
}

export default new ReserveDao(reservationModel)