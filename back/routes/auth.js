import e from "express";
import { activate, deleteUser, login, logout, refresh, register } from "../controllers/auth.js";
import {body} from "express-validator";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = e.Router();

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 12}),
    register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.post('/refresh', refresh);

router.delete('/delete', deleteUser)

export default router;