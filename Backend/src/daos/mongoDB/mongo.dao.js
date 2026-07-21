export default class MongoDao {
    constructor(model) {
        this.model = model
    }

    getAll = async () => {
        return await this.model.find({})
    }

    getById = async (id) => {
        return await this.model.findById(id)
    }

    create = async (body) => {
        return await this.model.create(body)
    }

    update = async (id, body) => {
        return await this.model.findByIdAndUpdate(id, body, { new: true })
    }

    updateOne = async (params, body) => {
        return await this.model.findOneAndUpdate(params, body, { new: true })
    }

    delete = async (id) => {
        return await this.model.findByIdAndDelete(id)
    }

    exists = async (param) => {
        return await this.model.exists(param)
    }
}  