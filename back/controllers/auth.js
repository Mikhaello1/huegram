import bcrypt from "bcrypt";
import { db } from "../connect.js";
import { v4 as uuidv4 } from "uuid";
import { sendActivationLink } from "./mail.js";
import { findToken, generateTokens, removeToken, saveRefreshToken, validateRefresh } from "./token.js";
import { validationResult } from "express-validator";

export const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        const { email, password, fullname, username } = req.body;

        if(!errors.isEmpty()){
            console.log(errors)
            throw new Error('Ошибка при валидации')
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const emailResults = await queryDatabase("SELECT * FROM users WHERE email = ?", [email]);
        if (emailResults.length) {
            return res.status(400).json("Email is already used");
        }

        const usernameResults = await queryDatabase("SELECT * FROM users WHERE username = ?", [username]);
        if (usernameResults.length) {
            return res.status(400).json("Username is already used");
        }

        const insertQuery = "INSERT INTO users (email, password, fullname, username, activationLink) VALUES (?, ?, ?, ?, ?)";
        const values = [email, hashedPassword, fullname, username, activationLink];
        const insertResult = await queryDatabase(insertQuery, values);

        const tokens = generateTokens({ email, userId: insertResult.insertId });
        await saveRefreshToken(insertResult.insertId, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        await sendActivationLink(email, `${process.env.API_URL}/auth/activate/${activationLink}`);

        return res.status(201).json({ message: "User registered successfully", ...tokens });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(400).json(err.message);
    }
};

export const activate = async (req, res) => {

    try{
        const activationLink = req.params.link;

        let q = "SELECT * FROM users WHERE activationLink = ?";
        const candidate = await queryDatabase(q, activationLink)
        console.log(candidate)
        if(!candidate.length) throw new Error("Incorrect Link")

        q = "UPDATE users SET isActivated = ? WHERE id = ?";

        const activationResult = await queryDatabase(q, [1, candidate[0].id])

        if(activationResult.affectedRows === 0) throw new Error("Error during activation")

        console.log(activationResult)


        
        return res.redirect(process.env.CLIENT_URL)
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message: err.message || "Server Error"})
    }

    
}


export const login = async (req, res) => {
    try{
        const {email, password} = req.body
        const q = "SELECT * FROM users WHERE email = ?"
        const findUser = await queryDatabase(q, email)
        if(!findUser.length) throw new Error('Пользователь не найден')

        const isPassEquals = await bcrypt.compare(password, findUser[0].password)

        if(!isPassEquals){
            throw new Error('Неверный пароль')
        }

        const tokens = generateTokens({ email, userId: findUser[0].id });
        await saveRefreshToken(findUser[0].id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.json({...findUser, ...tokens})
    }
    catch(err){
        res.status(400).json(err.message)
    }
}


export const logout = async (req, res) => {
    try{
        const { refreshToken } = req.cookies;
        const token = await removeToken(refreshToken)
        res.clearCookie('refreshToken')
        return res.json({refreshToken})
    }
    catch(err){
        res.json(err.message)
    }
}

export const refresh = async (req, res) => {
    try {
        const {refreshToken} = req.cookies;
        if(!refreshToken){
            throw new Error('Unauthorized')
        }
        const userData = await validateRefresh(refreshToken)
        console.log('userData = ', userData)
        const tokenFromDb = await findToken(refreshToken)
        if(!userData || !tokenFromDb) throw new Error('Unauthorised')

        const findUser = await queryDatabase("SELECT * FROM users WHERE id = ?", userData.userId);

        

        const tokens = generateTokens({ email: userData.email, userId: findUser[0].id });
        await saveRefreshToken(findUser[0].id, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(201).json({refresh: tokens.refreshToken, ...findUser[0]})
    } catch (error) {
        
        return res.json(error.message)
    }
}


export const deleteUser = async (req, res) => {
    try{

        const {email} = req.body;
        const q = "DELETE FROM users WHERE email = ?"
        const deleteResult = await queryDatabase(q, email)
        console.log(deleteResult)

        return res.status(200).json({message: 'user deleted', email})
    }
    catch(err){
        return res.status(500).json(err.message)
    }
}
