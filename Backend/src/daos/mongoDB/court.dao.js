import courtModel from "./models/court.model.js"
import MongoDao from "./mongo.dao.js"

class CourtDao extends MongoDao {
    constructor(model) {
        super(model)
    }

    async getAllCourts(query = {}, limit = 15, skip = 0, sort = "-createdAt") {
        const courts = await this.model
            .find(query)
            .sort(sort)
            .limit(limit)
            .skip(skip);

        return courts;
    }

    async countCourts(query = {}) {
        return this.model.countDocuments(query);
    }

}

export default new CourtDao(courtModel)