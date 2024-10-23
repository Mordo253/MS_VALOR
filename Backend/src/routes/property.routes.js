import { Router } from "express";
import {
    createProperty,
    deleteProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
} from "../controllers/property.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import fileUpload from "express-fileupload";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createPropertySchema } from "../schemas/property.schema.js";

const router = Router();

router.get("/all-properties", getAllProperties);
router.get("/properties/:id", getPropertyById);
router.post("/properties",fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), createProperty);
router.put("/properties/:id",auth, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), updateProperty);
router.delete("/properties/:id", auth, deleteProperty);

export default router;

