import React, { useEffect, useRef, useState } from "react";
import { templateComponents } from "./templates/templateRegistry";

const PAGE_WIDTH = 816;
const PAGE_HEIGHT = 1056;

const ResumePreview = ({ data, template, accentColor, classes = "" }) => {
  const TemplateComponent =
    templateComponents[template] || templateComponents.classic;
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [previewHeight, setPreviewHeight] = useState(PAGE_HEIGHT);

  useEffect(() => {
    const updatePreviewLayout = () => {
      if (!containerRef.current || !previewRef.current) {
        return;
      }

      const containerWidth = containerRef.current.clientWidth;
      const nextScale = containerWidth
        ? Math.min(1, containerWidth / PAGE_WIDTH)
        : 1;

      setScale(nextScale);
      setPreviewHeight(Math.max(previewRef.current.scrollHeight, PAGE_HEIGHT));
    };

    updatePreviewLayout();

    const resizeObserver = new ResizeObserver(updatePreviewLayout);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (previewRef.current) {
      resizeObserver.observe(previewRef.current);
    }

    window.addEventListener("resize", updatePreviewLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePreviewLayout);
    };
  }, [data, template, accentColor]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden rounded-lg bg-gray-100 print:overflow-visible print:bg-white"
    >
      <div
        className="mx-auto flex justify-center"
        style={{
          width: `${PAGE_WIDTH * scale}px`,
          height: `${previewHeight * scale}px`,
          maxWidth: "100%",
        }}
      >
        <div
          id="resume-preview"
          ref={previewRef}
          className={`origin-top border border-gray-300 bg-white shadow-sm print:border-none print:shadow-none ${classes}`}
          style={{
            width: `${PAGE_WIDTH}px`,
            minHeight: `${PAGE_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <TemplateComponent data={data} accentColor={accentColor} />
        </div>
      </div>

      <style>
        {`
          @page {
            size: letter;
            margin: 0;
          }

          #resume-preview {
            margin: 0 auto;
            box-sizing: border-box;
          }

          #resume-preview > * {
            min-height: 100%;
          }

          @media print {
            html,
            body {
              margin: 0;
              padding: 0;
              background: white;
              overflow: visible !important;
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
              min-height: 11in;
              height: auto;
              margin: 0;
              padding: 0 !important;
              transform: none;
              box-shadow: none !important;
              border: none !important;
              overflow: visible !important;
              background: white !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ResumePreview;
