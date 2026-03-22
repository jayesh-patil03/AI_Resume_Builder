import React, { useEffect, useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Linkedin,
  Globe,
} from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  /* =========================
     NEW: Local preview state
     ========================= */
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  /* =========================
     Handle text field change
     ========================= */
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  /* =========================
     NEW: Handle image change
     ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Update parent state
    onChange({ ...data, image: file });

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  /* =========================
     NEW: Cleanup old object URLs
     ========================= */
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
      <p className="text-sm text-gray-600 mb-6">
        Get started with personal information
      </p>

      {/* =========================
          Image Upload + Preview
         ========================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pb-8 border-b border-gray-200">
        <label className="cursor-pointer flex-shrink-0">
          {preview || data.image ? (
            <img
              src={
                preview
                  ? preview
                  : typeof data.image === "string"
                    ? data.image
                    : undefined
              }
              alt="user-image"
              className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-300 hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-dashed border-slate-300 rounded-full hover:border-slate-400 transition-colors">
              <div className="text-center text-slate-600 hover:text-slate-700">
                <User className="size-8 mx-auto mb-1 opacity-50" />
                <span className="text-xs">Upload</span>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onClick={(e) => (e.target.value = null)}
            onChange={handleImageChange}
          />
        </label>

        {/* =========================
            Remove background toggle
           ========================= */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-700">
              Remove Background
            </p>
            <label className="relative inline-flex items-center cursor-pointer gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />

              <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>

              <span className="absolute left-1 top-1.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>

      {/* =========================
          Text Fields - Grid Layout
         ========================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Icon className="size-4 text-gray-500" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <input
                type={field.type}
                value={data[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm placeholder:text-gray-400"
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                required={field.required}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
