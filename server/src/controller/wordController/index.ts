
import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { CefrLevel, Prisma } from "../../generated/prisma/client.js";
import { LEXIS_PROMPT_DICTIONARY, LEXIS_PROMPT_STORY, LEXIS_PROMPT_SYNONYMS } from "../../prompts/index.js";
import type { Definition, LexisDictionaryResponse, Synonym } from "../../types/index.js";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string,
})



export async function addWord(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { word, meaning, example, pronunciation, partsofSpeech, categoryId } = req.body;
        if (word === "" || meaning === "" || !categoryId) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const isWordExist = await prisma.word.findFirst({
            where: {
                word,
                userId,
                categoryId
            }
        });
        if (isWordExist) return res.status(400).json({ message: "Word already exists in this category" });
        const newWord = await prisma.word.create({
            data: {
                userId,
                word,
                meaning,
                partsofSpeech,
                example,
                pronunciation,
                categoryId,
                correctCount: 0,
                wrongCount: 0,
                level: 0,
                isFavorite: false,
                lastReviewedAt: null,
                nextReviewDate: new Date(),

            },

        })

        return res.status(201).json({ message: "Word added successfully", data: newWord });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to add word",
            error: error.message
        });
    }
}

export async function getWordById(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { wordId } = req.params;
        const { categoryId } = req.query;


        if (!categoryId) return res.status(400).json({ message: "Missing categoryId" });



        const word = await prisma.word.findFirst({
            where: {
                id: wordId as string,
                userId,
                categoryId: categoryId as string  // 👈 đảm bảo word thuộc đúng category
            }
        });

        if (!word) return res.status(404).json({ message: "Word not found" });
        return res.status(200).json(word);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({ message: "Failed to get word", error: message });
    }
}

export async function updateWord(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { categoryId, wordId, word, meaning, example, pronunciation, partsofSpeech, addCollocations, removeCollocations, addSynonyms, removeSynonyms } = req.body;

        if (!categoryId || !wordId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!word && !meaning && !example && !pronunciation && !partsofSpeech && !addCollocations && !removeCollocations && !addSynonyms && !removeSynonyms) {
            return res.status(400).json({ message: "No fields to update" });
        }

        if (addCollocations && !Array.isArray(addCollocations)) {
            return res.status(400).json({ message: "addCollocations must be an array" });
        }
        if (removeCollocations && !Array.isArray(removeCollocations)) {
            return res.status(400).json({ message: "removeCollocations must be an array" });
        }

        const existingWord = await prisma.word.findFirst({
            where: { id: wordId, userId, categoryId }
        });

        if (!existingWord) {
            return res.status(404).json({ message: "Word not found" });
        }

        const updateData: Prisma.WordUpdateInput = {
            ...(word && { word }),
            ...(meaning && { meaning }),
            ...(example && { example }),
            ...(pronunciation && { pronunciation }),
            ...(partsofSpeech && { partsofSpeech }),
        };

        if (addCollocations || removeCollocations) {
            let updated = [...existingWord.collocations];

            if (removeCollocations) {
                updated = updated.filter(c => !removeCollocations.includes(c));
            }
            if (addCollocations) {
                updated = [...new Set([...updated, ...addCollocations])];
            }

            updateData.collocations = { set: updated };
        }

        if (addSynonyms || removeSynonyms) {
            let updated = [...existingWord.synonyms];

            if (removeSynonyms) {
                updated = updated.filter(s => !removeSynonyms.includes(s));
            }
            if (addSynonyms) {
                updated = [...new Set([...updated, ...addSynonyms])];
            }

            updateData.synonyms = { set: updated };
        }

        const updatedWord = await prisma.word.update({
            where: { id: wordId },
            data: updateData,
        });

        return res.status(200).json({ message: "Word updated successfully", data: updatedWord });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return res.status(500).json({
            message: "Failed to update word",
            error: message
        });
    }
}

export async function getWordsWithFilter(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { categoryId } = req.params
        if (!categoryId) {
            return res.status(400).json({ message: "Category not found" });
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 50;
        const sort = Number(req.query.sort) || 1;
        const { search } = req.query;

        console.log("Received query params:", { categoryId, page, limit, sort, search });
        let whereClause: any = categoryId === "all"
            ? { userId }                    // Lấy tất cả, không filter theo category
            : { userId, categoryId };


        const searchStr = search?.toString().trim();
        if (searchStr) {
            whereClause.OR = [
                { word: { contains: searchStr, mode: 'insensitive' } },
                { meaning: { contains: searchStr, mode: 'insensitive' } },
            ];
        }

        const skip = (page - 1) * limit;

        const [words, totalItems] = await Promise.all([
            prisma.word.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: {
                    createdAt: sort === 1 ? 'desc' : 'asc',
                },
            }),
            prisma.word.count({ where: whereClause }),
        ]);

        return res.status(200).json({
            message: "Words fetched successfully",
            data: words,
            pagination: {
                totalItems,
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                limit: limit,
            },
        });

    } catch (error) {
        console.error("Error in getWordsWithFilter:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getWordsToReview(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const wordsToReview = await prisma.$queryRaw`
            SELECT * FROM "words" 
            WHERE "userId" = ${userId} AND "nextReviewDate" <= ${new Date()}
            ORDER BY RANDOM()
        `;
        return res.status(200).json({
            success: true,
            data: wordsToReview,
        });
    } catch (error) {
        console.error("Error in getWordsToReview:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateWordReview(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { wordId, performance, duration } = req.body;

        if (!wordId || !performance || !duration) return res.status(400).json({ message: "Missing required fields" });

        const word = await prisma.word.findUnique({
            where: { id: wordId, userId: userId },
        });

        if (!word) return res.status(404).json({ message: "Word not found" });

        let newEF = word.easinessFactor;
        let newInterval = word.intervalDays;

        if (performance === "easy") {

            if (duration < 2000) newEF += 0.15;
            else if (duration < 5000) newEF += 0.1;
            else newEF -= 0.15;

            // Chặn ngưỡng EF
            if (newEF < 1.3) newEF = 1.3;
            if (newEF > 2.8) newEF = 2.8;

            // Tính toán Interval
            if (word.intervalDays === 0) newInterval = 1;
            else if (word.intervalDays === 1) newInterval = 3;
            else newInterval = Math.floor(word.intervalDays * newEF);

            word.correctCount += 1;
        } else {

            word.wrongCount += 1;
            newInterval = 1;
            newEF = Math.max(1.3, newEF - 0.2);
        }

        const nextReviewDate = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000);


        const updatedWord = await prisma.word.update({
            where: { id: wordId },
            data: {
                correctCount: word.correctCount,
                wrongCount: word.wrongCount,
                intervalDays: newInterval,
                easinessFactor: newEF,
                nextReviewDate: nextReviewDate
            },
        });


        return res.status(200).json({
            nextInterval: updatedWord.intervalDays,
            nextEF: parseFloat(updatedWord.easinessFactor.toFixed(2)),
            nextReviewDate: updatedWord.nextReviewDate
        });

    } catch (error) {
        console.error("Error in updateWordReview:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function generateStory(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { topic, tone, level, vocabList } = req.body;

        if (!topic || !tone || !level || !vocabList) return res.status(400).json({ message: "Missing required fields" });

        const prompt = LEXIS_PROMPT_STORY(topic, tone, level, vocabList).trim();
        const response = await ai.models.generateContent({
            model: 'gemma-3-27b-it',
            contents: prompt
        });

        let textResponse = response.text;
        textResponse = textResponse?.replace(/```json/g, "").replace(/```/g, "").trim();
        const jsonResult = JSON.parse(textResponse as string);

        return res.status(200).json(jsonResult);
    } catch (error: any) {
        console.error("Error in generateStory:", error);
        return res.status(500).json({ message: "Internal Server Errors!", error: error.message });
    }
}

export async function quiz(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
        return res.status(400).json({ message: "categoryId is required" });
    }

    try {
        const wordsInCategory = await prisma.word.findMany({
            where: {
                categoryId: categoryId as string
            }
        });

        if (wordsInCategory.length < 4) {
            return res.status(400).json({
                message: "Cần ít nhất 4 từ trong category để tạo quiz"
            });
        }

        const quizData = wordsInCategory.map(currentWord => {
            const otherWords = wordsInCategory.filter(w => w.id !== currentWord.id);

            const distractors = otherWords
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(w => w.meaning);

            const options = [currentWord.meaning, ...distractors]
                .sort(() => 0.5 - Math.random());

            return {
                wordId: currentWord.id,
                question: currentWord.word,
                options,
                answer: currentWord.meaning,
            };
        });

        return res.status(200).json(quizData.sort(() => 0.5 - Math.random()))
    } catch (error) {
        console.error("Error in quiz:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}