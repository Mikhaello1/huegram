import e from "express";
import { getUser } from "../controllers/user.js";

const router = e.Router();

router.get('/', getUser)

export default router