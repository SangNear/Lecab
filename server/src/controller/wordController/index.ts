
import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import { LEXIS_PROMPT_DICTIONARY, LEXIS_PROMPT_STORY } from "../../prompts/index.js";




const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string,
})

export async function addWord(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { categoryId, words } = req.body;

        if (!categoryId || !Array.isArray(words) || words.length === 0) {
            return res.status(400).json({
                message: "CategoryId and words array are required",
            });
        }


        const invalidWord = words.find(
            (item) => !item.word?.trim() || !item.meaning?.trim()
        );

        if (invalidWord) {
            return res.status(400).json({
                message: "Word and meaning are required for every item",
            });
        }


        const existedWords = await prisma.word.findMany({
            where: {
                userId,
                categoryId,
                word: {
                    in: words.map((item) => item.word),
                },
            },
            select: {
                word: true,
            },
        });

        const existedSet = new Set(existedWords.map((item) => item.word));


        const newWords = words.filter(
            (item) => !existedSet.has(item.word)
        );

        if (newWords.length === 0) {
            return res.status(400).json({
                message: "Tất cả từ này đã tồn tại trong bộ từ này rồi! Vui lòng chọn bộ khác hoặc thêm từ khác",
            });
        }

        await prisma.word.createMany({
            data: newWords.map((item) => ({
                userId,
                categoryId,
                word: item.word,
                meaning: item.meaning,
                example: item.example,
                pronunciation: item.pronunciation,
                partsofSpeech: item.partsofSpeech,
                collocations: item.collocations,
                synonyms: item.synonyms,
                correctCount: 0,
                wrongCount: 0,
                level: 0,
                isFavorite: false,
                lastReviewedAt: null,
                nextReviewDate: new Date(),
            })),
        });

        return res.status(201).json({
            message: "Thêm từ thành công",
            data: {
                inserted: newWords.length,
                skipped: existedWords.map((item) => item.word),
            },
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Thêm từ thất bại",
            error: error.message,
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
        const [wordsToReview, unReviewedCount, rememberedCount] = await Promise.all([
            prisma.$queryRaw`
                SELECT * FROM "words" WHERE "userId" = ${userId} AND "nextReviewDate" <= ${new Date()} ORDER BY RANDOM()
            `,
            prisma.word.count({
                where: {
                    userId,
                    status: "UNREVIEWED",
                },
            }),
            prisma.word.count({
                where: {
                    userId,
                    status: "REMEMBERED",
                },
            }),
        ])
        return res.status(200).json({
            success: true,
            data: {
                wordsToReview,
                stats: {
                    needReview: (wordsToReview as any[]).length,
                    unreviewed: unReviewedCount,
                    remembered: rememberedCount,
                },
            },
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
        let newCorrectCount = word.correctCount;
        let newWrongCount = word.wrongCount;
        let newStatus = word.status

        if (performance === "easy") {
            if (duration < 3000) newEF += 0.15;
            else if (duration < 6000) newEF += 0.10;
            else newEF -= 0.15;

            if (word.intervalDays === 0) newInterval = 1;
            else if (word.intervalDays === 1) newInterval = 3;
            else newInterval = Math.floor(word.intervalDays * newEF);

            newCorrectCount += 1;
            newStatus = "REMEMBERED";

        } else if (performance === "vague") {

            if (duration < 3000) newEF -= 0.05;
            else newEF -= 0.15;

            if (word.intervalDays === 0) newInterval = 1;
            else if (word.intervalDays <= 3) newInterval = word.intervalDays + 1;
            else newInterval = Math.floor(word.intervalDays * Math.min(newEF, 1.5));

            newCorrectCount += 1;
            newStatus = "REMEMBERED";

        } else {

            newWrongCount += 1;
            newInterval = 1;
            newEF = Math.max(1.3, newEF - 0.2);
            newStatus = "FORGOTTEN";
        }

        const nextReviewDate = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000);


        const updatedWord = await prisma.word.update({
            where: { id: wordId },
            data: {
                correctCount: newCorrectCount,
                wrongCount: newWrongCount,
                intervalDays: newInterval,
                easinessFactor: newEF,
                nextReviewDate: nextReviewDate,
                status: newStatus
            },
        });

        const formatDate = (date: Date): string => {
            const day = String(date.getUTCDate()).padStart(2, "0");
            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
            const year = date.getUTCFullYear();
            return `${day}-${month}-${year}`;
        };

        return res.status(200).json({
            nextInterval: updatedWord.intervalDays,
            nextEF: parseFloat(updatedWord.easinessFactor.toFixed(2)),
            nextReviewDate: formatDate(updatedWord.nextReviewDate)
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

async function waitForReady(headword: string, maxAttempts = 10) {
    for (let i = 0; i < maxAttempts; i++) {
        const entry = await prisma.dictionary.findUnique({ where: { word: headword } });

        if (entry === null) return null;
        if (entry.status === 'READY') return entry;
        if (entry.status === 'FAIL') throw new Error('Generation failed');

        await new Promise(resolve => setTimeout(resolve, 500));
    }
    throw new Error('Timeout waiting for entry');
}
function isUniqueConstraintError(error: unknown): boolean {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
    );
}

async function generateDictionary(headword: string) {
    const prompt = LEXIS_PROMPT_DICTIONARY(headword)
    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt
    });
    let textResponse = response.text;
    textResponse = textResponse?.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonResult = JSON.parse(textResponse as string);

    return jsonResult
}

// service — giữ nguyên logic hiện tại, chỉ đổi tên cho rõ vai trò
async function lookupWord(rawWord: string) {
    const headword = rawWord.trim().toLowerCase();

    let entry = await prisma.dictionary.findUnique({ where: { word: headword } });

    if (entry?.status === "READY") {
        return entry;
    }

    if (entry?.status === "PENDING") {
        return await waitForReady(headword);
    }

    try {
        entry = await prisma.dictionary.create({
            data: {
                word: headword,
                status: "PENDING",
            },
        });
    } catch (error) {
        if (isUniqueConstraintError(error)) {
            return await waitForReady(headword);
        }
        throw error;
    }

    const data = await generateDictionary(headword);
    if (data.length === 0) {
        await prisma.dictionary.delete({ where: { word: headword } });
        return null;
    }

    entry = await prisma.dictionary.update({
        where: { word: headword },
        data: {
            definitions: data, // gán trực tiếp mảng vào field definitions, KHÔNG spread
            status: "READY",
        },
    });
    return entry;
}

// controller — đúng chuẩn Express handler, dùng trong router.get
export async function lookup(req: Request, res: Response) {
    try {
        const rawWord = req.params.word as string; // hoặc req.query.word tuỳ mày dùng path param hay query param
        const entry = await lookupWord(rawWord);
        res.json(entry);
    } catch (error) {
        res.status(500).json({ message: "Lookup failed", error: (error as Error).message });
    }
}


