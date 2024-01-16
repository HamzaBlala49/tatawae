import { index,edit,update,find} from "../../controllers/volunteer/profileController.js";
import { Router } from "express";
import upload from "../../middlewares/upload.js";

const router = Router();

router.get('/', index);
router.get('/edit',edit);
router.post('/update',upload.fields([
    { name: "newAvatar", maxCount: 1 },
    { name: "newCoverProfileImage", maxCount: 1 },
  ]),update);
router.get('/:id',find);




export default router;