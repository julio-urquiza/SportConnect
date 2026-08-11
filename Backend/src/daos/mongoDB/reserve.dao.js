import reserveModel from "./models/reserve.model.js"
import MongoDao from "./mongo.dao.js"

class ReserveDao extends MongoDao{
    constructor(model){
        super(model)
    }

    getAllReserves = async (filtros = {}) => {
        return await this.model.find(filtros)
            .populate("cancha", "nombre deporte descripcion ubicacion direccion imagenes")
            .populate("usuario", "nombre email")
            .sort({fecha:-1})
    }

    findOne = async (filtro= {}) => {
        return await this.model.findOne(filtro);
    }

    getHistorialPagos = async (filtros = {}) => {
        return await this.model
            .find(filtros)
            .populate("cancha", "nombre deporte ubicacion direccion")
            .populate("usuario", "name surname email")
            .sort({ pagadoEn: -1, createdAt: -1 })
    }
}

export default new ReserveDao(reserveModel)