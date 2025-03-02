import e from "express";
import { authMiddleware } from "../middlewares/auth-middleware.js";
import { follow, getFollowed, getFollowers, unfollow } from "../controllers/relationships.js";


const router = e.Router();

router.get("/getFollowers", authMiddleware, getFollowers)
router.get("/getFollowed", authMiddleware, getFollowed)
router.post("/follow", authMiddleware, follow)
router.delete("/unfollow", authMiddleware, unfollow)

export default router