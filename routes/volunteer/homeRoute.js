import { index,search } from "../../controllers/volunteer/homeController.js";
import { Router } from "express";
import {checkRole}  from "../../middlewares/index.js"
const router = Router();

router.get("/",index);
router.get("/search",search);

export default router