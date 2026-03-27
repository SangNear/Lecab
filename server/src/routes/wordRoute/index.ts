import express from "express";
import { addWord, generateCollocations, getWordsToReview, getWordsWithFilter } from "../../controller/wordController/index.js";
import { verifyAccessToken } from "../../middleware.js";


const router = express.Router();

router.post("/generate-collocations", generateCollocations);
router.post("/add-word", verifyAccessToken, addWord);
router.get("/get-words", verifyAccessToken, getWordsWithFilter);
router.get("/get-words-to-review", verifyAccessToken, getWordsToReview);
export default router;