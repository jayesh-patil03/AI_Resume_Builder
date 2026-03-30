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
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

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

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, [resumeId, token]);

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
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-4 sm:py-6">
        <Link
          to={"/app"}
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          <ArrowLeftIcon className="size-4" /> Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-4 sm:pb-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-8">
          {/* Left Panel - Form */}
          <div className="order-1 print:hidden lg:order-1 lg:col-span-4">
            <div className="no-scrollbar rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:sticky lg:top-4">
              {/* Section Navigation */}
              <div className="mb-5 flex flex-col gap-3 border-b border-gray-200 pb-4 sm:mb-6">
                <div className="w-full">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  {activeSectionIndex !== 0 && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:flex"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`ml-auto hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 sm:flex ${
                      activeSectionIndex === sections.length - 1 && "opacity-50"
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>

                  {/* Mobile nav dots */}
                  <div className="flex w-full justify-center gap-1 sm:hidden">
                    {sections.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSectionIndex(idx)}
                        type="button"
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
                type="button"
                onClick={() => {
                  toast.promise(saveResume, { loading: "saving..." });
                }}
                className="mt-6 w-full rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-blue-700 active:scale-95"
              >
                Save changes
              </button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="order-2 lg:order-2 lg:col-span-8 print:col-span-12">
            <div className="space-y-3 lg:sticky lg:top-4 print:static">
              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4 print:hidden">
                {resumeData.public && (
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:from-blue-200 hover:to-blue-300 sm:text-sm"
                  >
                    <Share2Icon className="size-4" />
                    <span className="hidden sm:inline">Share</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={changeResumeVisibility}
                  className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 px-3 py-2 text-xs font-medium text-purple-600 transition-colors hover:from-purple-200 hover:to-purple-300 sm:text-sm"
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
                  type="button"
                  onClick={downloadResume}
                  className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 px-3 py-2 text-xs font-medium text-blue-600 transition-colors hover:from-blue-200 hover:to-blue-300 sm:px-4 sm:text-sm"
                >
                  <DownloadIcon className="size-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
              </div>

              {/* resume preview */}
              <div className="no-scrollbar w-full overflow-hidden rounded-2xl bg-gray-100 p-2 shadow-sm sm:p-3 lg:p-4 print:overflow-visible print:bg-white print:p-0 print:shadow-none">
                <div
                  className="w-full overflow-hidden rounded-xl bg-white print:overflow-visible"
                  style={{
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
