import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin, splitDescription } from "./templateUtils";

const ExecutiveTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-slate-800">
      <header className="border-b-4 pb-6" style={{ borderColor: accentColor }}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-wide text-slate-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p
                className="mt-2 text-sm font-semibold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                {data.personal_info.profession}
              </p>
            )}
          </div>

          <div className="grid gap-2 text-sm text-slate-600 sm:text-right">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2 sm:justify-end">
                <Mail className="size-4" />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2 sm:justify-end">
                <Phone className="size-4" />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2 sm:justify-end">
                <MapPin className="size-4" />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {linkedin && (
              <div className="flex items-center gap-2 break-all sm:justify-end">
                <Linkedin className="size-4" />
                <span>{linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2 break-all sm:justify-end">
                <Globe className="size-4" />
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {data.professional_summary && (
        <section className="mt-6">
          <h2
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            Executive Summary
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mt-8">
          <h2
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {exp.position}
                    </h3>
                    <p className="font-medium text-slate-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-slate-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>
                {exp.description && (
                  <ul className="mt-3 space-y-1 text-sm leading-6 text-slate-700">
                    {splitDescription(exp.description).map((line, lineIndex) => (
                      <li key={lineIndex}>- {line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        {data.project?.length > 0 && (
          <section>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              Projects
            </h2>
            <div className="space-y-4">
              {data.project.map((project, index) => (
                <div key={index}>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {project.name}
                    </h3>
                    {project.type && (
                      <span
                        className="rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          backgroundColor: `${accentColor}15`,
                          color: accentColor,
                        }}
                      >
                        {project.type}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      {project.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="space-y-8">
          {data.education?.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p className="text-sm text-slate-700">{edu.institution}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                      {edu.graduation_date && (
                        <span>{formatDate(edu.graduation_date)}</span>
                      )}
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills?.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Core Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded border px-3 py-1 text-sm text-slate-700"
                    style={{ borderColor: `${accentColor}45` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
