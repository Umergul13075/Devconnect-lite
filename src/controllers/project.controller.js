import Project from "../models/Project.js";
import Bid from "../models/Bid.js";

export const createProject = async (req, res) => {
  try {
    
    if (!req.user || req.user.role !== "user") {
      return res.status(403).json({ message: "Only users can create projects" });
    }
    const { title, description, techStack, estimatedBudget } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const project = await Project.create({
      title,
      description,
      techStack: techStack || [],
      estimatedBudget,
      createdBy: req.user.id
    });
    res.status(201).json({ message: "Project created", project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOpenProjects = async (req, res) => {
  try {
    const openProjects = await Project.find({ status: "open" }).populate("createdBy", "name email");
    res.json({ projects: openProjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getProjectBids = async (req, res) => {
  try {
    const projectId = req.params.id;
    const bids = await Bid.find({ project: projectId }).populate("developer", "name email skills");
    res.json({ bids });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
