// import bcrypt from "bcrypt";
// import { db } from "../connect.js";
// import {v4 as uuidv4} from "uuid";
// import { sendActivationLink } from "./mail.js";
// import { generateTokens, saveRefreshToken } from "./token.js";

// export const register = async (req, res) => {

//     const { email, password, fullname, username } = req.body 

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const activationLink = uuidv4();
    

//     const values = [email, hashedPassword, fullname, username, activationLink]

//     const q = "INSERT INTO users (email, password, fullname, username, activationLink) VALUES (?, ?, ?, ?, ?)";
//     const q1 = "SELECT * FROM users WHERE email = ?"
//     const q2 = "SELECT * FROM users WHERE username = ?"

//     db.query(q1, email, (err, data) => {
//         if(err) return res.status(500).json(err);
//         if(data.length){
//             return res.status(400).json("email is already used")
//         }
//     })

//     db.query(q2, username, (err, data) => {
//         if(err) return res.status(500).json(err);
//         if(data.length){
//             return res.status(400).json("username is already used")
//         }
//     })

    
    
//     const createdUser = db.query(q, values);

//     console.log(createdUser.insertId)

//     const tokens = generateTokens(createdUser.email);
//     saveRefreshToken(createdUser.id, tokens.refreshToken);
//     res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});

//     sendActivationLink(createdUser.email, activationLink);

    
    
    

    
// }


import bcrypt from "bcrypt";
import { db } from "../connect.js";
import { v4 as uuidv4 } from "uuid";
import { sendActivationLink } from "./mail.js";
import { generateTokens, saveRefreshToken } from "./token.js";

export const register = async (req, res) => {
    const { email, password, fullname, username } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const emailQuery = "SELECT * FROM users WHERE email = ?";
        const usernameQuery = "SELECT * FROM users WHERE username = ?";

        const emailResults = await new Promise((resolve, reject) => {
            db.query(emailQuery, [email], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        if (emailResults.length) {
            return res.status(400).json("Email is already used");
        }

        const usernameResults = await new Promise((resolve, reject) => {
            db.query(usernameQuery, [username], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });

        if (usernameResults.length) {
            return res.status(400).json("Username is already used");
        }

        const insertQuery = "INSERT INTO users (email, password, fullname, username, activationLink) VALUES (?, ?, ?, ?, ?)";
        const values = [email, hashedPassword, fullname, username, activationLink];

        const insertResult = await new Promise((resolve, reject) => {
            db.query(insertQuery, values, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        console.log(insertResult)

        const tokens = generateTokens({email, userId: insertResult.insertId });
        saveRefreshToken(insertResult.insertId, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        await sendActivationLink(email, `${process.env.URL}/activate/${activationLink}`);

        return res.status(201).json({ message: "User registered successfully", userId: insertResult.insertId });
    } catch (err) {
        console.error("Error during registration:", err);
        return res.status(500).json("Server error");
    }
};