import { findFoundation } from "../../controllers/volunteer/profileController.js";
import { Router } from "express";


const router =  Router();

router.get("/:id",findFoundation);

export default router