import { Router } from "express";
import { index,search } from "../../controllers/foundation/homeController.js";

const router = Router();

router.get("/", index);
router.get("/search",search);


export default router;
