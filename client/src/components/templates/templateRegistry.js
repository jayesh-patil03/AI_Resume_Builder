import ClassicTemplate from "./ClassicTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import MinimalImageTemplate from "./MinimalImageTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import SidebarTemplate from "./SidebarTemplate";
import CompactTemplate from "./CompactTemplate";
import ProfileCardTemplate from "./ProfileCardTemplate";
import CleanLinesTemplate from "./CleanLinesTemplate";

export const resumeTemplates = [
  {
    id: "classic",
    name: "Classic",
    preview:
      "A traditional resume with strong section structure for ATS-friendly applications.",
  },
  {
    id: "modern",
    name: "Modern",
    preview:
      "A polished layout with subtle color while keeping content easy to scan.",
  },
  {
    id: "minimal",
    name: "Minimal",
    preview:
      "A lightweight resume that keeps all focus on your experience and skills.",
  },
  {
    id: "minimal-image",
    name: "Minimal Image",
    preview:
      "A clean photo-based layout for roles where a personal brand matters.",
    hasImage: true,
  },
  {
    id: "executive",
    name: "Executive",
    preview:
      "A strong, high-clarity format built for leadership and senior-level resumes.",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    preview:
      "A balanced two-column layout that keeps skills and education neatly grouped.",
  },
  {
    id: "compact",
    name: "Compact",
    preview:
      "A dense but readable format designed to fit more experience without clutter.",
  },
  {
    id: "profile-card",
    name: "Profile Card",
    preview:
      "A modern header-first design with clear hierarchy and ATS-friendly sections.",
    hasImage: true,
  },
  {
    id: "clean-lines",
    name: "Clean Lines",
    preview:
      "A refined linear layout with crisp dividers and strong readability in preview.",
  },
];

export const templateComponents = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  "minimal-image": MinimalImageTemplate,
  executive: ExecutiveTemplate,
  sidebar: SidebarTemplate,
  compact: CompactTemplate,
  "profile-card": ProfileCardTemplate,
  "clean-lines": CleanLinesTemplate,
};
