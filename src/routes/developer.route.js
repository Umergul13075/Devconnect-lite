import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getMyProfile, updateProfile, listDevelopers } from "../controllers/developer.controller.js";

const router = express.Router();


router.get("/me", authMiddleware("developer"), getMyProfile);


router.put("/me", authMiddleware("developer"), updateProfile);


router.get("/", authMiddleware(), listDevelopers);

export default router;
