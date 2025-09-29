import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { placeBid } from "../controllers/bid.controller.js";
const router = express.Router();

router.post("/place", authMiddleware("developer"), placeBid);

export default router;
