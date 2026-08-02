import courtModel from "./models/court.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    async getAllCourts(query, limit = {}, skip = {}, sort={}) {
        const courts = await this.model.find(query).sort(sort).limit(limit).skip(skip);
        return courts;
    }

}

export default new CourtDao(courtModel)