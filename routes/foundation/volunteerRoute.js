import { search,find} from "../../controllers/foundation/volunteerController.js";
import { Router } from "express";

const router = Router();

router.get("/search", search);
router.get("/:id", find);

export default router;
