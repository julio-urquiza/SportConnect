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

    filtrarPorUbicacion= async(ubicacion) =>{
        if(!ubicacion || ubicacion.trim() == "") throw new CustomError(404, "No se recibio ninguna ubicacion")
        const canchas= await this.dao.getByUbicacion(ubicacion)
        if (canchas.length === 0) throw new CustomError (404, "No se encontraron canchas en esa ubicacion")
        return canchas
    }

    filtrarPorDeporte= async(deporte) => {
        if(!deporte || deporte.trim() == "") throw new CustomError(404, "No se recibio ningun deporte")
        const canchas= await this.dao.getByDeporte(deporte)
        if (canchas.length ===0) throw new CustomError(404, "No se encontraron canchas para ese deporte")
        return canchas
    }

    filtrarPorHorario= async(hora, fecha) => {
        if(!fecha || fecha.trim=="") throw new CustomError(404, "No se recibio ninguna fecha")
        if(!hora || hora.trim()=="") throw new CustomError(404, "No se recibio ninguna hora")

        const dia= createDay(fecha)
        const canchas= await this.dao.getByHorario(hora, dia)
        if (canchas.length === 0) throw new CustomError(404, "No se encontraron canchas con ese horario")
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