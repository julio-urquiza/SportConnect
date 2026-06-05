import courtDao from "../daos/mongoDB/court.dao.js"
import CustomError from "../utils/customError.js"
import 'dotenv/config'

class CourtService {
    constructor(dao) {
        this.dao = dao;
    }

    getCourtById = async (id) => {
        // Aquí llamamos al método getById que descubrimos en tu mongo.dao.js
        const court = await this.dao.getById(id);

        // Si Mongoose no encuentra el ID, court será null. Disparamos el error.
        if (!court) {
            throw new Error("Cancha no encontrada"); 
        }

        // Si la encuentra, la devolvemos felizmente al controlador
        return court;
    }

    // ESTO ES PRUEBA CASERA SIN MONGODB PARA VER SI PUEDE ENCONTRAR LA CANCHA
    createCourt = async (courtData) => {
        // El DAO genérico ya sabe cómo hacer esto
        const newCourt = await this.dao.create(courtData);
        return newCourt;
    }
}

export default new CourtService(courtDao);