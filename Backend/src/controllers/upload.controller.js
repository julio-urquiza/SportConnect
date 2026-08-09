import { uploadImage } from "../services/cloudinary.service.js";
import wrapRoutes from "../utils/wrapRoutes.js";


class uploadController {
    constructor() {
        this.upload = uploadImage
    }
    
    uploadImg = async (req, res) => {
    
        if (!req.file) {
            return res.status(400).json({
                message: "No se recibió ninguna imagen"
            });
        }
    
        const result = await this.upload(req.file);
    
        res.status(201).json({
            url: result.secure_url,
            publicId: result.public_id
        });
    };
}

export default new uploadController()
