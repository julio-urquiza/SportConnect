import courtModel from "./models/court.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    async getByUbicacion(ubicacion){
        return await this.model.find({ ubicacion: { $regex: `^${ubicacion}$`, $options: "i" } })
    }


}

export default new CourtDao(courtModel)