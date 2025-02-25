import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken 
    };
};

export const saveRefreshToken = async (userId, refreshToken) => {
    const checkQuery = "SELECT * FROM tokens WHERE user_id = ?";
    const insertQuery = "INSERT INTO tokens (user_id, refresh_token) VALUES (?, ?)";

    try {
        const existingTokens = await new Promise((resolve, reject) => {
            db.query(checkQuery, [userId], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        if (existingTokens.length) {
            console.log("User already has a refresh token. Consider updating it.");
            return;
        }

        await new Promise((resolve, reject) => {
            db.query(insertQuery, [userId, refreshToken], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        console.log("Refresh token saved successfully for user ID:", userId);
    } catch (err) {
        console.error("Error saving refresh token:", err);
    }
};