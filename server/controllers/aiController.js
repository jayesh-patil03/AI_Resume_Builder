import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// Enhance Professional Summary

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Gemini Interactions API DOES NOT support:
    // - input as array
    // - role / content
    // So we combine everything into ONE STRING prompt
    const prompt = `
You are an expert in resume writing.

Enhance the professional summary below into 1–2 ATS-friendly sentences.
Highlight skills, experience, and career objectives.
Return ONLY the improved text. No options. No explanation.

Professional Summary:
${userContent}
    `;


    // Use input as STRING (not array)
    const response = await ai.interactions.create({
      model: process.env.GEMINI_MODEL, // e.g. gemini-3-flash-preview
      input: prompt,
    });

    const enhanceContent =
      response.outputs[response.outputs.length - 1].text;

    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// Enhance Job Description

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    // Same fix: NO role/content, NO array input
    const prompt = `
You are an expert resume writer.

Enhance the job description below into 1–2 ATS-friendly sentences.
Use action verbs and quantifiable achievements.
Return ONLY the improved text.

Job Description:
${userContent}
    `;

    const response = await ai.interactions.create({
      model: process.env.GEMINI_MODEL,
      input: prompt,
    });

    const enhanceContent =
      response.outputs[response.outputs.length - 1].text;

    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

/**
 * =========================================
 * Upload Resume & Extract Data
 * =========================================
 */
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

  
    // Gemini DOES NOT support JSON mode config (res_format)
    // JSON must be enforced ONLY via prompt
    const prompt = `
You are an expert AI agent that extracts structured data from resumes.

Extract data from the resume below and return ONLY valid JSON.
- No markdown
- No explanation
- No extra text
- Output MUST start with { and end with }

Resume:
${resumeText}

JSON FORMAT:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}
    `;

    // REMOVE res_format COMPLETELY
    const response = await ai.interactions.create({
      model: process.env.GEMINI_MODEL,
      input: prompt,
    });

    const rawText =
      response.outputs[response.outputs.length - 1].text;

    // Safe JSON parsing
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (err) {
      return res.status(400).json({
        message: "AI returned invalid JSON. Please try again.",
      });
    }

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
