import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin } from "./templateUtils";

const CompactTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 text-[13px] leading-5 text-slate-800 sm:p-8">
      <header
        className="border-b pb-4"
        style={{ borderColor: `${accentColor}40` }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p className="mt-1 font-medium" style={{ color: accentColor }}>
                {data.personal_info.profession}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-slate-600 md:max-w-[55%] md:justify-end">
            {data.personal_info?.email && (
              <span className="flex items-center gap-1">
                <Mail className="size-3.5" />
                {data.personal_info.email}
              </span>
            )}
            {data.personal_info?.phone && (
              <span className="flex items-center gap-1">
                <Phone className="size-3.5" />
                {data.personal_info.phone}
              </span>
            )}
            {data.personal_info?.location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" />
                {data.personal_info.location}
              </span>
            )}
            {linkedin && (
              <span className="flex items-center gap-1 break-all">
                <Linkedin className="size-3.5" />
                {linkedin}
              </span>
            )}
            {data.personal_info?.website && (
              <span className="flex items-center gap-1 break-all">
                <Globe className="size-3.5" />
                {data.personal_info.website}
              </span>
            )}
          </div>
        </div>
      </header>

      {data.professional_summary && (
        <section className="pt-4">
          <h2
            className="mb-2 text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-slate-700">{data.professional_summary}</p>
        </section>
      )}

      <div className="grid gap-6 pt-5 lg:grid-cols-[1.45fr_0.9fr]">
        <div className="space-y-5">
          {data.experience?.length > 0 && (
            <section>
              <h2
                className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {exp.position}
                        </h3>
                        <p className="font-medium text-slate-700">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-slate-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <div className="mt-2 whitespace-pre-line text-slate-700">
                        {exp.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.project?.length > 0 && (
            <section>
              <h2
                className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-3">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {project.name}
                      </h3>
                      {project.type && (
                        <span className="text-slate-500">{project.type}</span>
                      )}
                    </div>
                    {project.description && (
                      <p className="mt-1 text-slate-700">{project.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-5">
          {data.education?.length > 0 && (
            <section>
              <h2
                className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p className="text-slate-700">{edu.institution}</p>
                    <div className="flex flex-wrap gap-3 text-slate-500">
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
                className="mb-3 text-xs font-bold uppercase tracking-[0.25em]"
                style={{ color: accentColor }}
              >
                Skills
              </h2>
              <div className="text-slate-700">{data.skills.join(" | ")}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactTemplate;
