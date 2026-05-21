import express from "express";
import { addWord, generateStory, getWordById, getWordsToReview, getWordsWithFilter, quiz, updateWord, updateWordReview } from "../../controller/wordController/index.js";
import { verifyAccessToken } from "../../middleware.js";


const router = express.Router();

router.post("/add-word", verifyAccessToken, addWord);
router.put("/update-word", verifyAccessToken, updateWord);
router.get("/get-word/:wordId", verifyAccessToken, getWordById);
router.get("/get-words/:categoryId", verifyAccessToken, getWordsWithFilter);
router.get("/get-words-to-review", verifyAccessToken, getWordsToReview);
router.post("/update-word-review", verifyAccessToken, updateWordReview);
// router.get("/generate-word-detail/:wordParams", verifyAccessToken, generateWordDetail);
router.get("/generate-story", verifyAccessToken, generateStory);
router.get("/quiz/:categoryId", quiz);
export default router;