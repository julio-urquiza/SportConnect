import reserveModel from "./models/reserve.model.js"
import MongoDao from "./mongo.dao.js"

class ReserveDao extends MongoDao{
    constructor(model){
        super(model)
    }

    getAllReserves = async (filtros = {}) => {
        return await this.model
            .find(filtros)
            .populate("cancha")
    }

    findOne = async (filtro= {}) => {
        return await this.model.findOne(filtro);
    }

}

export default new ReserveDao(reserveModel)