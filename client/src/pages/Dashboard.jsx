import {
  UploadCloudIcon,
  PlusIcon,
  FilePenIcon,
  TrashIcon,
  XIcon,
  PencilIcon,
  LoaderCircleIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";
import pdfToText from "react-pdftotext";

function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResumes, setShowCreateResumes] = useState(false);
  const [showUploadResumes, setShowUploadResumes] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loadAllResume = async () => {
    try {
      const { data } = await api.get("/api/users/resumes", {
        headers: { Authorization: token },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        { headers: { Authorization: token } },
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResumes(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResumes(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Resume title cannot be empty");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("resumeId", editResumeId);
      formData.append("resumeData", JSON.stringify({ title }));

      const { data } = await api.put("/api/resumes/update", formData, {
        headers: { Authorization: token },
      });

      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        "Are yoy sure you want to delete this resume? ",
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: { Authorization: token },
        });
        setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResume();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Manage and create your professional resumes
          </p>
        </div>

        {/* create and upload resume buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setShowCreateResumes(true)}
            className="flex flex-col items-center justify-center gap-3 py-8 sm:py-12 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 group transition-all duration-300"
          >
            <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
              <PlusIcon className="size-8 text-blue-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Create New Resume</p>
              <p className="text-sm text-gray-500 mt-1">Start from scratch</p>
            </div>
          </button>

          <button
            onClick={() => setShowUploadResumes(true)}
            className="flex flex-col items-center justify-center gap-3 py-8 sm:py-12 bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 hover:bg-purple-50 group transition-all duration-300"
          >
            <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
              <UploadCloudIcon className="size-8 text-purple-600" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">Upload Resume</p>
              <p className="text-sm text-gray-500 mt-1">Import PDF</p>
            </div>
          </button>
        </div>

        <hr className="border-gray-200 my-8" />

        {/* available Resumes */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Your Resumes
        </h2>

        {allResumes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <FilePenIcon className="size-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 font-medium">No resumes yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Create your first resume to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allResumes.map((resume, index) => {
              const baseColor = colors[index % colors.length];

              return (
                <button
                  key={index}
                  onClick={() => navigate(`/app/builder/${resume._id}`)}
                  className="relative group rounded-lg border-2 overflow-hidden hover:shadow-lg transition-all duration-300 text-left bg-white"
                  style={{
                    borderColor: baseColor + "40",
                  }}
                >
                  {/* Background color */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{ backgroundColor: baseColor }}
                  />

                  {/* Content */}
                  <div className="relative p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div
                          className="inline-flex p-2 rounded-lg mb-3"
                          style={{ backgroundColor: baseColor + "20" }}
                        >
                          <FilePenIcon
                            className="size-5 group-hover:scale-110 transition-transform"
                            style={{ color: baseColor }}
                          />
                        </div>
                        <p
                          className="font-semibold text-gray-900 text-sm sm:text-base truncate group-hover:text-opacity-80 transition-colors"
                          style={{ color: baseColor }}
                        >
                          {resume.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Updated{" "}
                          {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <button
                          onClick={() => {
                            setEditResumeId(resume._id);
                            setTitle(resume.title);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Edit resume"
                        >
                          <PencilIcon className="size-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteResume(resume._id)}
                          className="p-1.5 hover:bg-red-100 rounded transition-colors"
                          title="Delete resume"
                        >
                          <TrashIcon className="size-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Create Resume Modal */}
        {showCreateResumes && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResumes(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  setShowCreateResumes(false);
                  setTitle("");
                }}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <XIcon className="size-5 text-gray-500" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Create a Resume
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Give your resume a descriptive name
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="e.g., Software Engineer Resume 2024"
                className="w-full px-4 py-2.5 mb-6 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                required
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg active:scale-95 transition-all text-sm"
              >
                Create Resume
              </button>
            </div>
          </form>
        )}

        {/* Upload Resume Modal */}
        {showUploadResumes && (
          <form
            onSubmit={uploadResume}
            onClick={() => setShowUploadResumes(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  setShowUploadResumes(false);
                  setTitle("");
                  setResume(null);
                }}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <XIcon className="size-5 text-gray-500" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Upload Resume
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Import your existing resume (PDF only)
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2.5 mb-4 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                required
              />

              <div>
                <label htmlFor="resume-input" className="block mb-3">
                  <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition-all duration-300">
                    {resume ? (
                      <>
                        <div className="p-2 bg-green-100 rounded-full">
                          <UploadCloudIcon className="size-6 text-green-600" />
                        </div>
                        <p className="text-center">
                          <span className="text-sm font-medium text-green-600">
                            File selected
                          </span>
                          <span className="text-xs text-gray-600 block mt-1">
                            {resume.name}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <UploadCloudIcon className="size-8 text-gray-400" />
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-700">
                            Click to upload
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF files only
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !resume}
                className="w-full mt-6 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                {isLoading && (
                  <LoaderCircleIcon className="animate-spin size-4" />
                )}
                {isLoading ? "Uploading..." : "Upload Resume"}
              </button>
            </div>
          </form>
        )}

        {/* Edit Resume Title Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <XIcon className="size-5 text-gray-500" />
              </button>

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Edit Resume Title
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Update the name of your resume
              </p>

              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full px-4 py-2.5 mb-6 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                required
                autoFocus
              />

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg active:scale-95 transition-all text-sm"
              >
                Update Title
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
