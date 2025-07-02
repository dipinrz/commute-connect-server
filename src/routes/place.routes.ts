import { Router } from "express";
import { addPlaceController, getPlacesController } from "../controllers/place.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware);

router.post("/", addPlaceController);
router.get("/", getPlacesController); 

export default router;
