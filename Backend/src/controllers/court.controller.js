import courtService from "../services/court.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class CourtController {
    constructor(service) {
        this.service = service;
    }
    getCourts = async (req, res) => {
        const courts = await this.service.getCourts(req.query)
        res.status(200).json({ courts })
    }

    getById = async (req, res) => {
        const { id } = req.params; 
        const court = await this.service.getCourtById(id);
        res.status(200).json({ message: "Cancha obtenida con éxito", court });
    }

    updateById = async (req, res) => {
        const { id } = req.params; 
        const court = await this.service.updateCourtById(id, req.body);
        res.status(200).json({ message: "Cancha obtenida con éxito", court });
    }

    create = async (req, res) => {
        const court = await this.service.createCourt(req.body);
        res.status(201).json({ message: "Cancha creada exitosamente", court });
    }

    delete =async (req, res) => {
        const { id } = req.params;
        const court = await this.service.deleteCourt(id)
        res.status(200).json({message: "Cancha eliminada con éxito", court})
    }
}

export default wrapRoutes(new CourtController(courtService))