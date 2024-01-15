import { index,search } from "../../controllers/volunteer/homeController.js";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.get("/search",search);

export default router