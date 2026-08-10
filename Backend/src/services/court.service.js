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

        const courts = await this.dao.getAllCourts(query, limit, page * limit, sort ?? "-createdAt")
        if (!courts) throw new CustomError(400, 'No se pudieron obtener las canchas')
        return courts
    }
    // Evita que caracteres especiales de regex (., *, +, etc.) rompan la búsqueda
    // o generen un patrón no intencionado si el usuario los tipea.
    #escapeRegex = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    }

    getCourtById = async (id) => {
        if (!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.getById(id)
        if (!court) throw new CustomError(404, "Cancha no encontrada")
        return court;
    }

    updateCourtById = async (id, body) => {
        if (!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.update(id, body)
        if (!court) throw new CustomError(404, "No se pudo modificar la cancha")
        return court;
    }

    createCourt = async (courtData) => {
        // Validaciones siguiendo court.model.js
        if (!courtData || typeof courtData !== "object") {
            throw new CustomError(400, "Datos de la cancha no proporcionados o inválidos")
        }

        const {
            nombre,
            deporte,
            descripcion,
            ubicacion,
            direccion,
            precioPorHora,
            imagenes,
            disponible,
            servicios,
            horariosDisponibles,
            duenio,
        } = courtData

        if (!nombre || typeof nombre !== "string" || !nombre.trim()) {
            throw new CustomError(400, "Nombre de la cancha inválido")
        }

        if (!deporte || typeof deporte !== "string") {
            throw new CustomError(400, "Deporte inválido")
        }

        if (descripcion !== undefined && typeof descripcion !== "string") {
            throw new CustomError(400, "Descripción inválida")
        }

        if (!ubicacion || typeof ubicacion !== "string" || !ubicacion.trim()) {
            throw new CustomError(400, "Ubicación de la cancha inválida")
        }

        if (!direccion || typeof direccion !== "string" || !direccion.trim()) {
            throw new CustomError(400, "Dirección inválida")
        }

        if (precioPorHora === undefined || typeof precioPorHora !== "number" || Number.isNaN(precioPorHora) || precioPorHora < 0) {
            throw new CustomError(400, "Precio por hora inválido")
        }

        if (imagenes !== undefined) {
            if (!Array.isArray(imagenes)) throw new CustomError(400, "Imágenes deben ser un arreglo")
            for (const img of imagenes) if (typeof img !== 'string') throw new CustomError(400, 'Imagen inválida')
        }

        if (disponible !== undefined && typeof disponible !== 'boolean') {
            throw new CustomError(400, "Disponible debe ser booleano")
        }

        if (servicios !== undefined) {
            if (!Array.isArray(servicios)) throw new CustomError(400, "Servicios deben ser un arreglo")
            for (const s of servicios) if (typeof s !== 'string') throw new CustomError(400, 'Servicio inválido')
        }

        if (horariosDisponibles !== undefined) {
            if (!Array.isArray(horariosDisponibles)) throw new CustomError(400, "Horarios disponibles deben ser un arreglo")
            for (const hd of horariosDisponibles) {
                if (!hd || typeof hd !== 'object') throw new CustomError(400, 'Horario disponible inválido')
                const { dia, horas } = hd
                if (typeof dia !== 'number' || dia < 0 || dia > 6) throw new CustomError(400, 'Día inválido en horariosDisponibles')
                if (!Array.isArray(horas)) throw new CustomError(400, 'Horas deben ser un arreglo')
                for (const hour of horas) if (typeof hour !== 'number' || hour < 0 || hour > 23) throw new CustomError(400, 'Hora inválida en horariosDisponibles')
            }
        }

        if (!duenio || typeof duenio !== 'string') {
            throw new CustomError(400, 'Dueño inválido')
        }

        // Normalizaciones mínimas
        courtData.nombre = nombre.trim()
        courtData.ubicacion = ubicacion.trim()
        courtData.direccion = direccion.trim()


        const newCourt = await this.dao.create(courtData)
        if (!newCourt) throw new CustomError(500, "Error al crear la cancha")
        return newCourt
    }

    deleteCourt = async (id) => {
        if (!id) throw new CustomError(400, "ID de cancha no proporcionado")
        const court = await this.dao.delete(id)
        if (!court) throw new CustomError(404, "No se pudo eliminar la cancha")
        return court; 
    }
}

export default new CourtService(courtDao);