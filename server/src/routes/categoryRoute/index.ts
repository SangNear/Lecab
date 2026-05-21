import express from "express";
import { verifyAccessToken } from "../../middleware.js";
import { addCategory, deleteCategory, getCategories, updateCategory } from "../../controller/categoryController/index.js";

const router = express.Router();

router.post("/add", verifyAccessToken, addCategory);
router.get("/get", getCategories);
router.put("/update", verifyAccessToken, updateCategory);
router.post("/delete", verifyAccessToken, deleteCategory);

export default router;