import express from "express";
import { login, logout, refreshToken, register } from "../../controller/authController/index.js";
import { verifyAccessToken } from "../../middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);
export default router;