import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import { promises as fsPromises } from "fs";

// CREATE RESUME
export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET RESUME (PRIVATE)
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// GET RESUME (PUBLIC)
export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// UPDATE RESUME
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumeId = req.body.resumeId;
    const resumeData = req.body.resumeData;
    const removeBackground = req.body.removeBackground;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID missing" });
    }

    // Parse resume data safely
    let resumeDataCopy = {};
    if (resumeData) {
      try {
        resumeDataCopy = JSON.parse(resumeData);
      } catch {
        return res.status(400).json({ message: "Invalid resume data" });
      }
    }

    // Ensure personal_info exists
    if (!resumeDataCopy.personal_info) {
      resumeDataCopy.personal_info = {};
    }

    // Upload image to ImageKit (if provided)
    if (image) {
      const uploadRes = await imagekit.upload({
        file: fs.createReadStream(image.path),
        fileName: `resume-${Date.now()}.jpg`,
        folder: "user-resumes",
      });

      const imageUrl =
        `${process.env.IMAGEKIT_URL_ENDPOINT}${uploadRes.filePath}` +
        `?tr=w-300,h-300,c-fill,c-face${removeBackground ? ",e-bgremove" : ""}`;

      resumeDataCopy.personal_info.image = imageUrl;

      // Remove temp file
      await fsPromises.unlink(image.path);
    }

    // Ownership check
    const existingResume = await Resume.findOne({
      _id: resumeId,
      userId,
    });

    if (!existingResume) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update resume safely
    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { $set: resumeDataCopy },
      { new: true, runValidators: true }
    );

    return res
      .status(200)
      .json({ message: "Saved successfully", resume: updatedResume });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error while updating resume",
    });
  }
};
