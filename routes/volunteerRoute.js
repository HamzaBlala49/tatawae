import { search } from "../controllers/volunteer/volunteerController.js";
import { Router } from "express";


const router = Router();


router.get("/search", search);

export default router