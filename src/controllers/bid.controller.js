import Bid from "../models/Bid.js";
import Project from "../models/Project.js";

export const placeBid = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "developer") {
      return res.status(403).json({ message: "Only developers can place bids" });
    }
    const { projectId, amount, message } = req.body;
    if (!projectId || !amount) return res.status(400).json({ message: "projectId and amount required" });

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.status !== "open") return res.status(400).json({ message: "Project is not open for bids" });

    const existing = await Bid.findOne({ project: projectId, developer: req.user.id });
    if (existing) {
      
      return res.status(400).json({ message: "You already placed a bid on this project" });
    }

    const bid = await Bid.create({
      project: projectId,
      developer: req.user.id,
      amount,
      message
    });

    res.status(201).json({ message: "Bid placed", bid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
