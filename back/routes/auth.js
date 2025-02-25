import e from "express";
import { register } from "../controllers/auth.js"

const router = e.Router();

router.post('/registration', register);
// router.post('/login', login);
// router.post('/logout', logout);
// router.get('/activate/:link', activate);
// router.get('/refresh', refresh);

export default router;