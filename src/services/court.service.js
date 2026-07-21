import courtDao from "../daos/mongoDB/court.dao.js"
import CustomError from "../utils/customError.js"
import createDay from "../utils/createDay.js";
class CourtService {
    constructor(dao) {
        this.dao = dao;
    }
    
    getCourts = async () => {
        const courts = await this.dao.getAll()
        if (!courts) throw new CustomError(400, 'No se pudieron obtener las canchas')
        return courts
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

    filtrar= async({ ubicacion, deporte, hora, fecha }) => {
        if (!ubicacion && !deporte && !hora && !fecha) {
            throw new CustomError(404, "No se recibieron parametros de busqueda")
        }

        if (ubicacion !== undefined && ubicacion.trim() === "") {
            throw new CustomError(404, "No se recibio ninguna ubicacion")
        }

        if (deporte !== undefined && deporte.trim() === "") {
            throw new CustomError(404, "No se recibio ningun deporte")
        }

        if (hora !== undefined && hora.trim() === "") {
            throw new CustomError(404, "No se recibio ninguna hora")
        }

        if (fecha !== undefined && fecha.trim() === "") {
            throw new CustomError(404, "No se recibio ninguna fecha")
        }

        const dia = fecha ? createDay(fecha) : undefined
        const canchas = await this.dao.getBy({ ubicacion, deporte, hora, dia, fecha })

        if (!canchas || canchas.length === 0) {
            throw new CustomError(404, "No se encontraron canchas con esos parametros")
        }

        return canchas
    }
}

export default new CourtService(courtDao);