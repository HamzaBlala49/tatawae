import { Router } from "express";

import { login,register,logout } from "../controllers/authController.js";

const router = Router();

router.get('/login', login);
router.get('/register',register);
router.get('/logout',logout);

export default router