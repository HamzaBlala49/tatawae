import { index,find,join,eventMember,evaluationInfo } from "../../controllers/volunteer/eventController.js";
import { Router } from "express";


const router =  Router();

router.get("/",index);
router.post("/join",join);
router.get("/eventMember",eventMember);
router.get("/:id/evaluation",evaluationInfo);
router.get("/:id",find);

export default router