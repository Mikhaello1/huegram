import { queryDatabase } from "../helpers/queryDatabase.js";



export const getUser = async (req, res) => {
    try{
    
        const q = "SELECT * FROM users WHERE username = ?";
        
        const findUser = await queryDatabase(q, req.query.username)    
        
        if(!findUser.length) throw new Error('No such user')

        const {id, email, fullname, username, about, profilePic} = findUser[0]
        return res.json({id, email, fullname, username, about, profilePic})
    }
    catch(err){
        return res.status(400).json(err.message)
    }

    
    

}