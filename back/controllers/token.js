import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import { queryDatabase } from "../helpers/queryDatabase.js";


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
    const updateQuery = "UPDATE tokens SET refresh_token = ? WHERE user_id = ?";

    console.log("СЮДА СМОТРИ ------", userId, refreshToken, "----------больше не смотри")

    try {
        const existingTokens = await new Promise((resolve, reject) => {
            db.query(checkQuery, [userId], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        if (existingTokens.length) {
            console.log("User already has a refresh token. Consider updating it.");
            const updatedToken = await new Promise((resolve, reject) => {
                db.query(updateQuery, [refreshToken, userId], (err, data) => {
                    if(err) return reject(err);
                    resolve(data)
                })
            })
            
        }
        else {
            await new Promise((resolve, reject) => {
                db.query(insertQuery, [userId, refreshToken], (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });
        }

        
    } catch (err) {
        console.error("Error saving refresh token:", err);
    }
};

export const removeToken = async (refreshToken) => {
    
    const q = "DELETE FROM tokens WHERE refresh_token = ?"
    try{
        const deleteToken = await new Promise((resolve, reject) => {
            db.query(q, [refreshToken], (err, data) => {
                if(err) return reject(err)
                resolve(data)
            })    
        })
    
        return deleteToken  
    }
    catch(err){
        console.log(err)
        return null
    }
    
}

export const validateAccess = async (access) => {
    try{
        const userData = jwt.verify(access, process.env.JWT_ACCESS_SECRET)
        return userData
    }
    catch(e){
        return null
    }
}
export const validateRefresh = async (refresh) => {
    try{
        const userData = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET)
        return userData
    }
    catch(e){
        return null
    }
}

export const findToken = async (token) => {
    try{
        
        const q = "SELECT * FROM tokens WHERE refresh_token = ?"

        const findToken = await queryDatabase(q, token)
        
        if(!findToken.length) throw new Error('Unauthorised')

        return findToken[0].refresh_token
    }
    catch(err){
        return null
    }
}