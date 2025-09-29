import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createProject, getOpenProjects, getProjectBids } from "../controllers/project.controller.js";
const router = express.Router();

router.post("/create", authMiddleware("user"), createProject);
router.get("/open", authMiddleware(), getOpenProjects);


router.get("/:id/bids", authMiddleware(), getProjectBids);

export default router;
