import {
  invitePage,
  invitation,
  addVolunteer,
  index,
  create,
  add,
  find,
  deleteMasge,
  deleteEvent,
  edit,
  update,
  evaluationPage,
  eventMembers,
  evaluation
} from "../controllers/foundation/eventController.js";
import { Router } from "express";
import { upload } from "../middlewares/index.js";

const router = Router();

router.get("/", index);
router.get("/create", create);
router.post("/create", upload.single("image"), add);
router.post("/delete", deleteEvent);
router.get("/:eId/evaluation/:vId", evaluationPage);
router.post("/:eId/evaluation/:vId", evaluation);
router.get("/:id/members",eventMembers);
router.get("/invite/:id", invitePage);
router.post("/invite", invitation);
router.post("/edit/:id", upload.single("newImage"), update);
router.get("/edit/:id", edit);
router.get("/delete/:id", deleteMasge);
router.get("/:id", find);
export default router;
