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
}

export default new ReserveDao(reserveModel)