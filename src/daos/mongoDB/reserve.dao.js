import mongoose from "mongoose";
import reserveModel from "./models/reserve.model.js"
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

    getHorariosOcupados = async(idCancha, fecha) =>{


const horarios = await this.model.find({
    cancha: idCancha,
    estado: { $in: ["confirmada", "pendiente"] }
})

        return horarios
    }
}

export default new ReserveDao(reserveModel)