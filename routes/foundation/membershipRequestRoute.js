import { invite } from "../../controllers/foundation/membershipRequestController.js";
import { Router } from "express";

const router = Router();

router.post("/invite", invite);

export default router;
