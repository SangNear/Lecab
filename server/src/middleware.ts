import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token is required" });
    }
    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
          ) as { userId: string };
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = {userId: decoded.userId as string}

        next()                                    
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
}