import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../configs/api";
import toast from "react-hot-toast";

const ProfessionalSummaryForm = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `enhance my professional summary "${data}"`;
      const response = await api.post(
        "/api/ai/enhance-pro-sum",
        { userContent: prompt },
        { headers: { Authorization: token } },
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhanceContent,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Sparkles className="size-5" />
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Highlight your key strengths and career objectives
          </p>
        </div>
        <button
          disabled={isGenerating || !data.trim()}
          onClick={generateSummary}
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-purple-500 text-white rounded-lg hover:bg-purple-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isGenerating ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              AI Enhance
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full p-3 sm:p-4 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives (3-4 sentences are ideal)..."
        />
        <p className="text-xs text-gray-500 text-center sm:text-left">
          💡 <strong>Tip:</strong> Keep it concise (3-4 sentences) and focus on
          your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
