import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume format with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with strategic use of color and modern font choices",
    },
    {
      id: "minimal-image",
      name: "Minimal-image",
      preview: "Minimal design with a single image and clean typography",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Ultra-clean design that puts your content front and center",
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white text-gray-700 border border-gray-300 rounded-xl hover:border-blue-400 hover:shadow-md transition-all duration-200 active:scale-95"
      >
        <Layout size={16} className="text-blue-600" />
        <span className="max-sm:hidden">Template</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-semibold">
          {currentTemplate?.name || "Select"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 p-4 mt-3 z-50 bg-white rounded-xl border border-gray-200 shadow-xl">
          <div className="space-y-2">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => {
                  onChange(template.id);
                  setIsOpen(false);
                }}
                className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md"
                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 text-white font-bold" />
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-gray-900 text-base">
                    {template.name}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {template.preview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
