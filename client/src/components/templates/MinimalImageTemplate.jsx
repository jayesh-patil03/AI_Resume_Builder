import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import {
  formatDate,
  getImageSource,
  getLinkedin,
  splitDescription,
} from "./templateUtils";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);
  const imageSource = getImageSource(data.personal_info?.image);

  return (
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      <div className="grid gap-6 md:grid-cols-[0.9fr_1.7fr]">
        <aside className="border-b border-zinc-200 p-6 md:border-b-0 md:border-r">
          <div className="mb-6 flex justify-center">
            {imageSource ? (
              <img
                src={imageSource}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover"
                style={{ backgroundColor: `${accentColor}20` }}
              />
            ) : (
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full text-3xl font-bold uppercase"
                style={{
                  backgroundColor: `${accentColor}12`,
                  color: accentColor,
                }}
              >
                {(data.personal_info?.full_name || "Y")
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            )}
          </div>

          <section className="mb-8">
            <h2 className="mb-3 text-sm font-semibold tracking-widest text-zinc-600">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
              {linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin size={14} style={{ color: accentColor }} />
                  <span>{linkedin}</span>
                </div>
              )}
              {data.personal_info?.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe size={14} style={{ color: accentColor }} />
                  <span>{data.personal_info.website}</span>
                </div>
              )}
            </div>
          </section>

          {data.education?.length > 0 && (
            <section className="mb-8">
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-zinc-600">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    {edu.field && <p className="text-zinc-600">{edu.field}</p>}
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-500">
                      {formatDate(edu.graduation_date)}
                    </p>
                    {edu.gpa && (
                      <p className="text-xs text-zinc-500">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-widest text-zinc-600">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        <main className="p-6 md:p-8">
          <header className="pb-6">
            <h1 className="text-4xl font-bold tracking-wide text-zinc-700">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-zinc-600">
              {data.personal_info?.profession || "Profession"}
            </p>
          </header>

          {data.professional_summary && (
            <section className="mb-8">
              <h2
                className="mb-3 text-sm font-semibold tracking-widest"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="leading-relaxed text-zinc-700">
                {data.professional_summary}
              </p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="mb-8">
              <h2
                className="mb-4 text-sm font-semibold tracking-widest"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-semibold text-zinc-900">
                        {exp.position}
                      </h3>
                      <span className="text-xs text-zinc-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="mb-2 text-sm" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="space-y-1 text-sm leading-relaxed text-zinc-700">
                        {splitDescription(exp.description).map(
                          (line, lineIndex) => (
                            <li key={lineIndex}>- {line}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.project?.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="mt-4 space-y-4">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-zinc-800">{project.name}</h3>
                    {project.type && (
                      <p className="mb-1 text-sm" style={{ color: accentColor }}>
                        {project.type}
                      </p>
                    )}
                    {project.description && (
                      <ul className="space-y-1 text-sm text-zinc-700">
                        {splitDescription(project.description).map(
                          (line, lineIndex) => (
                            <li key={lineIndex}>- {line}</li>
                          ),
                        )}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;
