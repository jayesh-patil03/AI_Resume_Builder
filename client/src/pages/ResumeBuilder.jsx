import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TempleteSelector";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

function ResumeBuilder() {
  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    try {
      const { data } = await api.get("/api/resumes/get/" + resumeId, {
        headers: { Authorization: token },
      });
      if (data.resume) {
        setResumeData(data.resume);
        document.title = data.resume.title;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const section = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = section[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append(
        "resumeData",
        JSON.stringify({ public: !resumeData.public }),
      );

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: {
          Authorization: token,
        },
      });

      setResumeData({ ...resumeData, public: !resumeData.public });
      toast.success(data.message);
    } catch (error) {
      console.error("Error saving resume:", error);
    }
  };

  // create Url to view resume
  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  const downloadResume = () => {
    window.print();
  };

  const saveResume = async () => {
    try {
      let updatedResumeData = structuredClone(resumeData);

      if (!updatedResumeData.personal_info) {
        updatedResumeData.personal_info = {};
      }

      if (typeof resumeData.personal_info.image === "object") {
        delete updatedResumeData.personal_info.image;
      }
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", "yes");
      typeof resumeData.personal_info.image === "object" &&
        formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });
      setResumeData(data.resume);
      toast.success(data.message);
    } catch (error) {
      console.log("Error saving resume:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-colors text-sm"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-4 no-scrollbar">
              {/* Section Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-3 gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, section.length - 1),
                      )
                    }
                    className={`hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors ${
                      activeSectionIndex === section.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === section.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>

                  {/* Mobile nav dots */}
                  <div className="sm:hidden flex gap-1 ml-2">
                    {section.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSectionIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeSectionIndex
                            ? "bg-blue-600 w-6"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "projects" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <SkillsForm
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
              <button
                onClick={() => {
                  toast.promise(saveResume, { loading: "saving..." });
                }}
                className="w-full mt-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all text-sm"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            <div className="sticky top-4 space-y-3">
              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-200">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg hover:from-blue-200 hover:to-blue-300 transition-colors font-medium"
                  >
                    <Share2Icon className="size-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg hover:from-purple-200 hover:to-purple-300 transition-colors font-medium"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-4" />
                  ) : (
                    <EyeOffIcon className="size-4" />
                  )}
                  <span className="hidden sm:inline">
                    {resumeData.public ? "Public" : "Private"}
                  </span>
                </button>
                <button
                  onClick={downloadResume}
                  className="flex items-center justify-center gap-1 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg hover:from-blue-200 hover:to-blue-300 transition-colors font-medium"
                >
                  <DownloadIcon className="size-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              {/* resume preview */}
              <div className="rounded-lg shadow-sm bg-gray-100 p-2 sm:p-3 w-full no-scrollbar overflow-hidden">
                <div
                  className="bg-white rounded-md overflow-hidden w-full"
                  style={{
                    transform: "scale(0.85)",
                    transformOrigin: "top center",
                    width: "100%",
                    minHeight: "auto",
                  }}
                >
                  <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
