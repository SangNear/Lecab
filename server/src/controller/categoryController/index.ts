import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
export async function addCategory(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        const iconSlugDefault = "library"
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const { name, description, iconSlug } = req.body
        if (!name) return res.status(400).json({ message: "Missing required fields" });


        const isCategoryExist = await prisma.category.findFirst({
            where: {
                userId,
                name,
            }
        });
        if (isCategoryExist) return res.status(400).json({ message: "Category already exists" });

        const newCategory = await prisma.category.create({
            data: {
                userId,
                name,
                description,
                iconSlug: iconSlug || iconSlugDefault,
            }
        });
        return res.status(201).json({ message: "Category added successfully", data: newCategory });
    } catch (error: any) {
        console.error("Error in addCategory:", error);
        return res.status(500).json({ message: "Failed to add category" });
    }
}

export async function getCategories(req: Request, res: Response) {
    try {
        const userId = req.user?.userId
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const categories = await prisma.category.findMany({
            where: { userId },
            include: {
                _count: {
                    select: {
                        words: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }

        });

        const result = categories.map(({ _count, ...rest }) => ({
            ...rest,
            wordCount: _count.words
        }))

        return res.status(200).json({
            message: "Categories fetched successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error in getCategories:", error);
        return res.status(500).json({ message: "Failed to get categories" });
    }
}

export async function getCategoriesWithoutWord(req: Request, res: Response) {
    try {
        const userId = req.user?.userId
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const { word } = req.query;
        if (!word) return res.status(400).json({ message: "Word is required" });

        const categories = await prisma.category.findMany({
            where: {
                words: {
                    none: {
                        word: {
                            equals: (word as string).trim(),
                            mode: 'insensitive'
                        }
                    }
                },
                userId
            },
            include: {
                _count: {
                    select: {
                        words: true
                    }
                }
            },
        });

        const data = categories.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
            wordCount: category._count.words,
            iconSlug: category.iconSlug,
        }));

        return res.status(200).json({
            message: "Categories without word fetched successfully",
            data,
        });
    } catch (error) {
        console.error("Error in getCategoriesWithoutWord:", error);
        return res.status(500).json({ message: "Failed to get categories without word" });
    }
}

export async function updateCategory(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const { categoryId, name, description } = req.body;

        const isCategoryExist = await prisma.category.findFirst({
            where: {
                userId,
                id: categoryId,
            }
        })
        if (!isCategoryExist) return res.status(404).json({ message: "Category not found" });

        const updatedCategory = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                name,
                description,
            }
        })
        return res.status(200).json({ message: "Category updated successfully", category: updatedCategory });
    } catch (error) {
        console.error("Error in updateCategory:", error);
        return res.status(500).json({ message: "Failed to update category" });
    }
}

export async function deleteCategory(req: Request, res: Response) {
    try {
        const userId = req.user?.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });
        const { categoryId } = req.body;

        const isCategoryExist = await prisma.category.findFirst({
            where: {
                userId,
                id: categoryId,
            }
        })
        if (!isCategoryExist) return res.status(404).json({ message: "Category not found" });
        await prisma.category.delete({
            where: {
                id: categoryId,
            }
        })
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error in deleteCategory:", error);
        return res.status(500).json({ message: "Failed to delete category" });
    }
}