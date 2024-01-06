import { Router } from "express";
import { upload } from "../middlewares/index.js";
import {registerFoundation,registerFoundationPage,registerVolunteer,registerVolunteerPage,login,loginUser ,logout} from "../controllers/authController.js";

const router = Router();

router.get('/login', login);
router.post('/login',loginUser);
router.get('/foundation/register',registerFoundationPage);
router.post('/foundation/register',upload.fields([{name:'avatar',maxCount:1},{name:'coverProfileImage',maxCount:1}]),registerFoundation);
router.get('/volunteer/register',registerVolunteerPage);
router.post('/volunteer/register',upload.fields([{name:'avatar',maxCount:1},{name:'coverProfileImage',maxCount:1}]),registerVolunteer);
router.get('/logout',logout);
export default router