import courtService from "../services/court.service.js"
import wrapRoutes from "../utils/wrapRoutes.js"

class CourtController {
    constructor(service) {
        this.service = service;
    }

    filtrarPorUbicacion = async(req,res) =>{
        const ubicacion=req.query.ubicacion
        const canchas= await this.service.filtrarPorUbicacion(ubicacion)
        res.status(200).json({
           canchas
        })
    }

    filtrarPorDeporte = async(req,res) =>{
        const deporte= req.query.deporte

        const canchas= await this.service.filtrarPorDeporte(deporte)
        res.status(200).json({
            canchas
        })
    }
    
    getById = async (req, res) => {
        const { id } = req.params; 
        const court = await this.service.getCourtById(id);
        res.status(200).json({ 
            message: "Cancha obtenida con éxito", 
            court 
        });
    }

    create = async (req, res) => {
        const court = await this.service.createCourt(req.body);
        res.status(201).json({ message: "Cancha creada exitosamente", court });
    }
}

export default wrapRoutes(new CourtController(courtService))