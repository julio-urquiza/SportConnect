import courtDao from "../daos/mongoDB/court.dao.js"
import CustomError from "../utils/customError.js"

class CourtService {
    constructor(dao) {
        this.dao = dao;
    }

    filtrarPorUbicacion= async(ubicacion) =>{
        if(!ubicacion || ubicacion.trim() == "") throw new CustomError(404, "No se recibio ninguna ubicacion")
        const canchas= await this.dao.getByUbicacion(ubicacion)
        if (canchas.length === 0) throw new CustomError (404, "No se encontraron canchas en esa ubicacion")
        return canchas
    }

    getCourtById = async (id) => {
        if(!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.getById(id)
        if (!court) throw new CustomError(404, "Cancha no encontrada")
        return court;
    }

    createCourt = async (courtData) => {
        const newCourt = await this.dao.create(courtData);
        if (!newCourt) throw new CustomError(500, "Error al crear la cancha")
        return newCourt;
    }
}

export default new CourtService(courtDao);