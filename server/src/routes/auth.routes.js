import { Router } from "express";
import { registerUser, getAllUsers, loginUser, getCurrentUserProfile, logout } from "../controllers/auth.controller.js";
import validate from "../middleware/zod.middleware.js";
import registerSchema from "../zod/registerSchema.js";
import loginSchema from "../zod/loginSchema.js";
import { verifyJWT } from "../middleware/jwt.middleware.js";

const router = Router(); 

router.post('/register',validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser)
router.get('/profile',verifyJWT, getCurrentUserProfile)
router.post('/logout', verifyJWT, logout);

export default router;