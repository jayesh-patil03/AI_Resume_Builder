import { Check, Layout } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { resumeTemplates } from "./templates/templateRegistry";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  const currentTemplate = resumeTemplates.find(
    (template) => template.id === selectedTemplate,
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectorRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectorRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-blue-400 hover:shadow-md active:scale-95"
      >
        <span className="flex items-center gap-2">
          <Layout size={16} className="text-blue-600" />
          <span className="max-sm:hidden">Template</span>
        </span>
        <span className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
          {currentTemplate?.name || "Select"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-3 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)]">
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-lg font-semibold leading-6 text-slate-900">
                Resume Templates
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Select a layout for your resume.
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {resumeTemplates.length}
            </span>
          </div>

          <div className="max-h-[22rem] space-y-2.5 overflow-y-auto pr-1">
            {resumeTemplates.map((template) => {
              const isSelected = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => {
                    onChange(template.id);
                    setIsOpen(false);
                  }}
                  className={`w-full rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-base font-semibold text-slate-900">
                          {template.name}
                        </h4>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                          ATS
                        </span>
                        {template.hasImage && (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                            Image
                          </span>
                        )}
                      </div>
                      <p
                        className="mt-2 text-sm leading-6 text-slate-600"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {template.preview}
                      </p>
                    </div>

                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                        isSelected
                          ? "border-blue-500 bg-blue-600 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
