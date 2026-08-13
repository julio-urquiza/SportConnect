import courtDao from "../daos/mongoDB/court.dao.js"
import CustomError from "../utils/customError.js"
import createDay from "../utils/createDay.js";
class CourtService {
    constructor(dao) {
        this.dao = dao;
    }
    getCourts = async (filtro = {}) => {
        let {
            limit = 15,
            page = 1,
            sort,
            nombre,
            ubicacion,
            ...query
        } = filtro;

        // Convertimos los query params, que llegan como strings, a números seguros.
        const parsedLimit = Math.min(
            Math.max(Number.parseInt(limit, 10) || 15, 1),
            50
        );

        const parsedPage = Math.max(
            Number.parseInt(page, 10) || 1,
            1
        );

        // Búsqueda por nombre.
        if (nombre?.trim()) {
            query.nombre = {
                $regex: this.#escapeRegex(nombre.trim()),
                $options: "i",
            };
        }

        // Búsqueda por ubicación.
        if (ubicacion?.trim()) {
            query.ubicacion = {
                $regex: this.#escapeRegex(ubicacion.trim()),
                $options: "i",
            };
        }

        const sortOptions = {
            relevancia: { createdAt: -1, _id: -1 },
            "-createdAt": { createdAt: -1, _id: -1 },
            createdAt: { createdAt: 1, _id: 1 },
            precioPorHora: { precioPorHora: 1, _id: 1 },
            "-precioPorHora": { precioPorHora: -1, _id: -1 },
        };

        const safeSort = sortOptions[sort] ?? sortOptions.relevancia;

        // La página 1 empieza en 0.
        // Página 2 con limit 15 empieza en 15.
        // Página 3 empieza en 30, etc.
        const skip = (parsedPage - 1) * parsedLimit;

        // Traemos las canchas de esta página y el total en paralelo.
        const [courts, total] = await Promise.all([
            this.dao.getAllCourts(
                query,
                parsedLimit,
                skip,
                safeSort
            ),
            this.dao.countCourts(query),
        ]);

        if (!courts) {
            throw new CustomError(
                400,
                "No se pudieron obtener las canchas"
            );
        }

        const totalPages = Math.ceil(total / parsedLimit);

        return {
            courts,
            pagination: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages,
                hasPreviousPage: parsedPage > 1,
                hasNextPage: parsedPage < totalPages,
            },
        };
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