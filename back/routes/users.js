import e from "express";
import { getUser } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = e.Router();

router.get('/getUser/:id',
    authMiddleware,
    getUser)

export default router