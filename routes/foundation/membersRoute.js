import {
  index,
  remove,
  distorted,
} from "../../controllers/foundation/membersController.js";
import { Router } from "express";

const router = Router();

router.get("/", index);
router.get("/:id", remove);
router.delete("/:id", distorted);

export default router;
