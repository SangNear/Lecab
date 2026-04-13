import express from "express";
import { addWord, generateSynonyms, generateWordDetail, getWordsToReview, getWordsWithFilter, updateWordReview } from "../../controller/wordController/index.js";
import { verifyAccessToken } from "../../middleware.js";


const router = express.Router();

router.post("/add-word", verifyAccessToken, addWord);
router.get("/get-words", verifyAccessToken, getWordsWithFilter);
router.get("/get-words-to-review", verifyAccessToken, getWordsToReview);
router.post("/update-word-review", verifyAccessToken, updateWordReview);
router.post("/generate-synonyms", verifyAccessToken, generateSynonyms);
router.get("/generate-word-detail/:wordParams", verifyAccessToken, generateWordDetail);
export default router;