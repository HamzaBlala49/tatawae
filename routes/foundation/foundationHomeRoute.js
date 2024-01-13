import { Router } from "express";
import { index } from "../../controllers/foundation/homeController.js";

const router = Router();

router.get("/", index);

export default router;
