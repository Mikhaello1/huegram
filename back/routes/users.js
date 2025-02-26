import e from "express";
import { getUser } from "../controllers/user.js";

const router = e.Router();

router.get('/getUser', getUser)

export default router