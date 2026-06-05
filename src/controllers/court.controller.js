import courtService from "../services/court.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class CourtController {
    constructor(service) {
        this.service = service;
    }

    getById = async (req, res) => {
        // Leer Path Param
        const { id } = req.params; 

        // Delegamos la búsqueda al servicio
        const court = await this.service.getCourtById(id);

        // Devolver el resultado solicitado
        res.status(200).json({ 
            message: "Cancha obtenida con éxito", 
            court 
        });
    }

    // PRUEBA PARA VER SI FUNCIONA EL POST Y EL GET
    create = async (req, res) => {
        const court = await this.service.createCourt(req.body);
        res.status(201).json({ message: "Cancha creada exitosamente", court });
    }
}

export default wrapRoutes(new CourtController(courtService))