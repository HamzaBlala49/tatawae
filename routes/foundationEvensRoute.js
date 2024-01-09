import { index,create,add, find} from "../controllers/foundation/eventController.js";
import { Router } from "express";
import {upload} from "../middlewares/index.js";


const router = Router();

router.get("/", index);
router.get("/create", create);
router.post("/create",upload.single('image'), add);
router.get("/:id",find);
export default router;