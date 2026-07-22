import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
export async function hashPassword(password: string) {
    console.log("=== hashPassword ===");
    console.log("type:", typeof password);
    console.log("value:", password);
    return await bcrypt.hash(password, 12)
}


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

export async function verifyGoogleToken(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID as string,
    })

    const payload = ticket.getPayload()

    if (!payload || !payload.email_verified) {
        throw new Error("Invalid or unverified Google account");
    }
    return {
        googleId: payload.sub,
        email: payload.email as string,
        name: payload.name,
        avatarUrl: payload.picture,
    };
}


