import {
  index,
  foundationAction,
  checkedRequests
} from "../../controllers/foundation/eventRequestController.js";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.get("/checkRequests", checkedRequests);
router.post("/foundationAction", foundationAction);

export default router;
