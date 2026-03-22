import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const rendertemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;

      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
      <div
        id="resume-preview"
        className={
          "border border-gray-300 print:shadow-none print:border-none bg-white" +
          classes
        }
      >
        {rendertemplate()}
      </div>

      <style jsx>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          #resume-preview {
            width: 8.5in;
            margin: 0 auto;
            box-sizing: border-box;
          }

          @media (max-width: 1024px) {
            #resume-preview {
              width: 100%;
              max-width: 100%;
            }
          }

          @media (max-width: 768px) {
            #resume-preview {
              width: 100%;
              max-width: 100%;
              padding: 12px;
              font-size: 14px;
            }

            #resume-preview * {
              font-size: inherit;
            }
          }

          @media (max-width: 640px) {
            #resume-preview {
              width: 100%;
              max-width: 100%;
              padding: 12px;
              font-size: 13px;
            }

            #resume-preview * {
              font-size: inherit;
            }
          }

          @media print {
            html,
            body {
              width: 8.5in;
              height: 11in;
              overflow: hidden;
            }

            body * {
              visibility: hidden;
            }

            #resume-preview,
            #resume-preview * {
              visibility: visible;
            }

            #resume-preview {
              position: absolute;
              left: 0;
              top: 0;
              width: 8.5in;
              height: auto;
              margin: 0;
              padding: 0;
              box-shadow: none !important;
              border: none !important;
              transform: none;
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
