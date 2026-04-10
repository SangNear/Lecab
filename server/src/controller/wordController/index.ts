
import { GoogleGenAI } from "@google/genai";
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { CefrLevel } from "../../generated/prisma/client.js";
import { LEXIS_PROMPT_SYNONYMS } from "../../prompts/index.js";


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY as string,
})


export async function generateCollocations(req: Request, res: Response) {
    try {
        const { word } = req.body;
        if (!word) {
            return res.status(400).json({ message: "Word is required" });
        }
        const prompt = `Generate 5 natural English collocations for the word "${word}".
                        Return JSON format:
                        [
                            { "collocation": "", "meaning": "", "example": "", "type": "" }
                        ]
                        Rules:
                            - Each collocation MUST be a natural phrase used by native speakers (2–5 words, not just 2 words).
                            - Prefer full phrases or extended collocations (e.g. "deeply arrogant attitude", "come across as arrogant", "arrogant in the way he speaks").
                            - Include a mix of patterns:
                                + adjective + noun phrase
                                + verb + collocation
                                + prepositional phrase
                            - Avoid simple/basic pairs like "arrogant tone".
                            - Make them sound natural in real conversations.
                            - Example sentence must use the full collocation naturally.
                            - "type" should describe the pattern (e.g. "verb phrase", "noun phrase", "prepositional phrase").
                            - No explanation, only valid JSON.
                        `

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt
        })

        // 1. Lấy text từ AI
        let textResponse = response.text;

        // 2. Dự phòng trường hợp AI tự bọc kết quả trong ```json ... ```
        textResponse = textResponse?.replace(/```json/g, "").replace(/```/g, "").trim();

        // 3. Chuyển String thành JSON Object rồi mới trả về
        const jsonResult = JSON.parse(textResponse as string);

        return res.status(200).json(jsonResult);
    } catch (error) {
        throw new Error("Invalid JSON from AI");
    }
}

export async function addWord(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { word, meaning, example, cefrLevel, correctCount, wrongCount, level, pronunciation, isFavorite, } = req.body;
        if (word === "" || meaning === "" || example.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newWord = await prisma.word.create({
            data: {
                userId,
                word,
                meaning,
                example,
                pronunciation,

                cefrLevel,
                correctCount: 0,
                wrongCount: 0,
                level: 0,
                isFavorite: false,
                lastReviewedAt: null,
                nextReviewDate: new Date(),

            }
        })

        if (newWord) {

            const prompt = LEXIS_PROMPT_SYNONYMS(newWord.word).trim();
            const response = await ai.models.generateContent({
                model: 'gemma-3-27b-it',
                contents: prompt

            });

            let textResponse = response.text;

            textResponse = textResponse?.replace(/```json/g, "").replace(/```/g, "").trim();

            const jsonResult = JSON.parse(textResponse as string);

            await prisma.synonym.create({
                data: {
                    wordId: newWord.id,
                    data: jsonResult
                }
            })
        }
        return res.status(201).json({ message: "Word added successfully", word: newWord });
    } catch (error: any) {
        return res.status(500).json({
            message: "Failed to add word",
            error: error.message
        });
    }
}

export async function getWordsWithFilter(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const sort = Number(req.query.sort) || 1;
        const { cefrLevel, isFavorite, search } = req.query;

        let whereClause: any = { userId };

        // Check CEFR Level
        if (cefrLevel && Object.values(CefrLevel).includes(cefrLevel as CefrLevel)) {
            whereClause.cefrLevel = cefrLevel as CefrLevel;
        }

        // Check isFavorite: Chỉ lọc khi nó là 'true' hoặc 'false'
        if (isFavorite === 'true' || isFavorite === 'false') {
            whereClause.isFavorite = isFavorite === 'true';
        }

        // Check Search: Trim để tránh người dùng nhập toàn dấu cách
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
            success: true,
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
            // 1. Cập nhật EF trước để dùng cho tính toán interval
            if (duration < 2000) newEF += 0.15;
            else if (duration < 5000) newEF += 0.1;
            else newEF -= 0.15;

            // Chặn ngưỡng EF ngay
            if (newEF < 1.3) newEF = 1.3;
            if (newEF > 2.8) newEF = 2.8;

            // 2. Tính toán Interval
            if (word.intervalDays === 0) newInterval = 1;
            else if (word.intervalDays === 1) newInterval = 3;
            else newInterval = Math.floor(word.intervalDays * newEF);
            
            word.correctCount += 1;
        } else {
            // Trường hợp "Chưa thuộc"
            word.wrongCount += 1;
            newInterval = 1;
            newEF = Math.max(1.3, newEF - 0.2);
        }

        const nextReviewDate = new Date(Date.now() + newInterval * 24 * 60 * 60 * 1000);

        // Cập nhật Database
        const updatedWord = await prisma.word.update({
            where: { id: wordId },
            data: {
                correctCount: word.correctCount,
                wrongCount: word.wrongCount,
                intervalDays: newInterval,
                easinessFactor: newEF,
                nextReviewDate: nextReviewDate // Đừng quên update ngày này vào DB nhé!
            },
        });

        // Trả về kết quả cho Client
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

export async function generateSynonyms(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { word } = req.body;
        if (!word) return res.status(400).json({ message: "Word is required" });

        const prompt = LEXIS_PROMPT_SYNONYMS(word).trim();


        const response = await ai.models.generateContent({
            model: 'gemma-3-27b-it',
            contents: prompt

        });

        let textResponse = response.text;

        textResponse = textResponse?.replace(/```json/g, "").replace(/```/g, "").trim();


        const jsonResult = JSON.parse(textResponse as string);

        return res.status(200).json(jsonResult);

    } catch (error: any) {
        console.error("Error in generateSynonyms:", error);

        if (error.status === 503 || error.status === 429) {
            return res.status(503).json({
                message: "Dịch vụ đang quá tải, thử lại sau vài giây nhé!"
            });
        }

        return res.status(500).json({ message: "Lỗi server nội bộ." });
    }
}
export async function getSynonyms(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const wordId = req.query.wordId;
        if (!wordId || typeof wordId !== "string") {
            return res.status(400).json({ message: "Word ID is required" });
        }

        const synonyms = await prisma.synonym.findMany({
            where: {
                wordId: wordId,
            },
        });
        return res.status(200).json({ success: true, data: synonyms[0]?.data });
    } catch (error) {
        console.error("Error in getSynonyms:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}