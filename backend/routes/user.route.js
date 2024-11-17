import express from 'express';
import { CreateUser, getProfile, login, logout, refreshToken } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router=express.Router();

router.post("/user",CreateUser);
router.post("/login",login);
router.post("/logout",logout);
router.post("/refresh-token",refreshToken);
router.get("/profile",protectRoute,getProfile);

export default router;