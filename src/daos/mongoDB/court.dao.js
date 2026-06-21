import courtModel from "./models/court.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    async getByUbicacion(ubicacion){
        return await this.model.find({ ubicacion: { $regex: `^${ubicacion}$`, $options: "i" } })
    }

    async getByDeporte(deporte){
        return await this.model.find({deporte})
    }

    async getByHorario(hora, dia){
    return await this.model.find({
        horariosDisponibles: {
            $elemMatch: {
                dia,
                inicio: { $lte: hora },
                fin: { $gte: hora }
            }
        }
    });
    }

}

export default new CourtDao(courtModel)