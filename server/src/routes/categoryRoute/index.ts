import express from "express";
import { verifyAccessToken } from "../../middleware.js";
import { addCategory, deleteCategory, getCategories, getCategoriesWithoutWord, updateCategory } from "../../controller/categoryController/index.js";

const router = express.Router();

router.post("/add", verifyAccessToken, addCategory);
router.get("/get", verifyAccessToken, getCategories);
router.put("/update", verifyAccessToken, updateCategory);
router.post("/delete", verifyAccessToken, deleteCategory);
router.get("/get-without-word", verifyAccessToken, getCategoriesWithoutWord);
export default router;