import Developer from "../models/Developer.js";
import bcrypt from "bcrypt";


export const getMyProfile = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "developer") {
      return res.status(403).json({ message: "Only developers can view their profile" });
    }
    const developer = await Developer.findById(req.user.id).select("-password");
    if (!developer) return res.status(404).json({ message: "Developer not found" });
    res.json({ developer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "developer") {
      return res.status(403).json({ message: "Only developers can update profile" });
    }

    const { name, email, password, skills } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (skills) updateData.skills = skills;

    if (password) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");
      updateData.password = await bcrypt.hash(password, saltRounds);
    }

    const updated = await Developer.findByIdAndUpdate(req.user.id, updateData, { new: true }).select("-password");
    res.json({ message: "Profile updated", developer: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const listDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find().select("-password");
    res.json({ developers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
