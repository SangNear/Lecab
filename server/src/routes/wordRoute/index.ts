import express from "express";
import { addWord, generateStory, generateWordDetail, getWordsToReview, getWordsWithFilter, updateWordReview } from "../../controller/wordController/index.js";
import { verifyAccessToken } from "../../middleware.js";


const router = express.Router();

router.post("/add-word", verifyAccessToken, addWord);
router.get("/get-words", verifyAccessToken, getWordsWithFilter);
router.get("/get-words-to-review", verifyAccessToken, getWordsToReview);
router.post("/update-word-review", verifyAccessToken, updateWordReview);
router.get("/generate-word-detail/:wordParams", verifyAccessToken, generateWordDetail);
router.get("/generate-story", verifyAccessToken, generateStory);
export default router;