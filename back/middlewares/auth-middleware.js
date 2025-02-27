import { validateAccess } from "../controllers/token.js";


export const authMiddleware = async (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization;
        
        if(!authorizationHeader) throw new Error('Unauthorized');

        const access = authorizationHeader.split(' ')[1];
        
        if(!access) throw new Error('Unauthorized');

        const userData = await validateAccess(access);

        console.log(userData)

        if(!userData) throw new Error('Unauthorized');

        req.user = userData;

        next();
        
    }
    catch(err){
        res.status(401).json(err.message)
    }
}