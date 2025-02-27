import { db } from "../connect.js";
import { queryDatabase } from "./auth.js";


export const getUser = async (req, res) => {
    try{
        const q = "SELECT * FROM users WHERE id = ?";
        
        const findUser = await queryDatabase(q, req.params.id)    
        
        if(!findUser.length) throw new Error('No such user')
        return res.json(findUser[0])
    }
    catch(err){
        return res.status(400).json(err.message)
    }

    
    

}