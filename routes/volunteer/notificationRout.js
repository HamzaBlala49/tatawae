import { index , actionToEvent,actionToMembership} from "../../controllers/volunteer/notificationsController.js";
import { Router } from "express";



const router = Router();



router.get('/', index);
router.post('/actionToEvent', actionToEvent);
router.post('/actionToMembership', actionToMembership);



export default router;