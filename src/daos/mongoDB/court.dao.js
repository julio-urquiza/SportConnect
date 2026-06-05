import courtModel from "./models/court.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }
    // aca se declaran los nuevos metodos


}

export default new CourtDao(courtModel)