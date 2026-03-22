import type { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { comparePassword, generateAccessToken, generateRefreshToken, hashPassword, hashToken } from "../../utility/index.js";
import jwt from "jsonwebtoken";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
});

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        console.log("password type:", typeof password, "value:", password);
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }
        const isEmailExist = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        const accessToken = generateAccessToken(String(user.id))
        const refreshToken = generateRefreshToken(String(user.id))

        const hashedRefreshToken = hashToken(refreshToken)

        await prisma.session.create({
            data: {
                userId: String(user.id),
                deviceInfo: req.headers["user-agent"] || "",
                refreshToken: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            }
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({ accessToken })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordCorrect = await comparePassword(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const accessToken = generateAccessToken(String(user.id))
        const refreshToken = generateRefreshToken(String(user.id))

        const hashedRefreshToken = hashToken(refreshToken)

        await prisma.session.create({
            data: {
                userId: String(user.id),
                deviceInfo: req.headers["user-agent"] || "",
                refreshToken: hashedRefreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            }
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({ accessToken })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string }
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const hashedRefreshToken = hashToken(refreshToken)

        const session = await prisma.session.findUnique({
            where: {
                refreshToken: hashedRefreshToken
            }
        })
        if (!session) {
            return res.status(401).json({ message: "Session not found" });
        }
        if (session.isRevoked) {
            return res.status(401).json({ message: "Session revoked" });
        }
        if (session.expiresAt < new Date()) {
            return res.status(401).json({ message: "Session expired" });
        }


        const accessToken = generateAccessToken(String(session.userId))
        res.json({ accessToken })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            res.clearCookie("refreshToken")
            return res.json({ message: "Logged out successfully" });
        }
        const hashedRefreshToken = hashToken(refreshToken)
        const session = await prisma.session.findUnique({
            where: {
                refreshToken: hashedRefreshToken
            }
        })
        if (!session) {
            return res.status(200).json({ message: "Logged out successfully" });
        }

        await prisma.session.update({
            where: {
                refreshToken: hashedRefreshToken
            },
            data: {
                isRevoked: true
            }
        })
        res.clearCookie("refreshToken")
        res.json({ message: "Logged out successfully" });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}