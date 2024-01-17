import { index , actionToEvent,actionToMembership,checkRequests} from "../../controllers/volunteer/notificationsController.js";
import { Router } from "express";



const router = Router();



router.get('/', index);
router.post('/actionToEvent', actionToEvent);
router.post('/actionToMembership', actionToMembership);
router.get('/checkRequests', checkRequests);



export default router;