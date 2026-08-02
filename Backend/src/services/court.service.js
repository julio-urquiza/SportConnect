import courtDao from "../daos/mongoDB/court.dao.js"
import CustomError from "../utils/customError.js"
import createDay from "../utils/createDay.js";
class CourtService {
    constructor(dao) {
        this.dao = dao;
    }
    getCourts = async (filtro = {}) => {
        let { limit, page, sort, nombre, ubicacion, ...query } = filtro

        if (nombre) {
            query.nombre = { $regex: this.#escapeRegex(nombre), $options: "i" }
        }
        if (ubicacion) {
            query.ubicacion = { $regex: this.#escapeRegex(ubicacion), $options: "i" }
        }

        const courts = await this.dao.getAllCourts(query, limit, page*limit, sort ?? "-createdAt")
        if (!courts) throw new CustomError(400, 'No se pudieron obtener las canchas')
        return courts
    }
// Evita que caracteres especiales de regex (., *, +, etc.) rompan la búsqueda
// o generen un patrón no intencionado si el usuario los tipea.
    #escapeRegex = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
  
    getCourtById = async (id) => {
        if(!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.getById(id)
        if (!court) throw new CustomError(404, "Cancha no encontrada")
        return court;
    }

    updateCourtById = async (id, body) => {
        if(!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.update(id, body)
        if (!court) throw new CustomError(404, "No se pudo modificar la cancha")
        return court;
    }

    createCourt = async (courtData) => {
        const newCourt = await this.dao.create(courtData);
        if (!newCourt) throw new CustomError(500, "Error al crear la cancha")
        return newCourt;
    }
}

export default new CourtService(courtDao);