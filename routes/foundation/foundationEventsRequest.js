import {
  index,
  foundationAction,
} from "../../controllers/foundation/eventRequestController.js";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.post("/foundationAction", foundationAction);

export default router;
