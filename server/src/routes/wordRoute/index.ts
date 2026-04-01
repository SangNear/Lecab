import express from "express";
import { addWord, generateCollocations, generateSynonyms, getSynonyms, getWordsToReview, getWordsWithFilter, updateWordReview } from "../../controller/wordController/index.js";
import { verifyAccessToken } from "../../middleware.js";


const router = express.Router();

router.post("/generate-collocations", generateCollocations);
router.post("/add-word", verifyAccessToken, addWord);
router.get("/get-words", verifyAccessToken, getWordsWithFilter);
router.get("/get-words-to-review", verifyAccessToken, getWordsToReview);
router.post("/update-word-review", verifyAccessToken, updateWordReview);
router.post("/generate-synonyms", verifyAccessToken, generateSynonyms);
router.get("/get-synonyms", verifyAccessToken, getSynonyms);
export default router;