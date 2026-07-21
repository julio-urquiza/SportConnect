import complexModel from "./models/complex.model.js"
import MongoDao from "./mongo.dao.js"

class ComplexDao extends MongoDao {
    constructor(model) {
        super(model)
    }

}

export default new ComplexDao(complexModel)