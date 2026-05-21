import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
export async function hashPassword(password: string) {
    console.log("=== hashPassword ===");
    console.log("type:", typeof password);
    console.log("value:", password);
    return await bcrypt.hash(password, 12)
  }



export async function comparePassword(inputPassword: string, hashedPassword: string) {
    return await bcrypt.compare(inputPassword, hashedPassword)
}

export function generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" })
}

export function generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" })
}

export function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex")
}


