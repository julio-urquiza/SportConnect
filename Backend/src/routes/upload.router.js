import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import uploadController from "../controllers/upload.controller.js";

const router = Router();

router.post(
    "/image",
    upload.single("image"),
    uploadController.uploadImg
);

export default router;