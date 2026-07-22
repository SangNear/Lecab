import express from "express";
import { getMe, googleLogin, login, logout, refreshToken, register } from "../../controller/authController/index.js";
import { verifyAccessToken } from "../../middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
router.get("/me", verifyAccessToken, getMe);
router.post("/google-login", googleLogin);
export default router;