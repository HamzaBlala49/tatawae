import { addVolunteer,index, create, add, find, deleteMasge, deleteEvent, edit, update, evaluation} from "../controllers/foundation/eventController.js";
import { Router } from "express";
import { upload } from "../middlewares/index.js";


const router = Router();

router.get("/", index);
router.get("/create", create);
router.post("/create",upload.single('image'), add);
router.post("/delete",deleteEvent);
router.get("/:id/evaluation",evaluation)
router.get("/addVolunteer",addVolunteer)
router.post("/edit/:id",upload.single('newImage'),update);
router.get("/edit/:id",edit);
router.get("/:id",find)
router.get("/delete/:id",deleteMasge);
export default router;