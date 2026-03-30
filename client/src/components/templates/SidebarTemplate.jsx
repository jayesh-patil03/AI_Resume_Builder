import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin, splitDescription } from "./templateUtils";

const SidebarTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-5xl mx-auto bg-white text-slate-800">
      <div className="grid md:grid-cols-[0.95fr_1.75fr]">
        <aside
          className="p-6 text-white md:min-h-full"
          style={{ backgroundColor: accentColor }}
        >
          <h1 className="text-3xl font-bold">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-white/80">
              {data.personal_info.profession}
            </p>
          )}

          <section className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Contact
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              {data.personal_info?.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="size-4 shrink-0" />
                  <span>{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
              {linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin className="size-4 shrink-0" />
                  <span>{linkedin}</span>
                </div>
              )}
              {data.personal_info?.website && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="size-4 shrink-0" />
                  <span>{data.personal_info.website}</span>
                </div>
              )}
            </div>
          </section>

          {data.skills?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Skills
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-white/30 px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {data.education?.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                Education
              </h2>
              <div className="mt-4 space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p className="text-white/80">{edu.institution}</p>
                    <div className="flex flex-wrap gap-3 text-white/70">
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
        </aside>

        <main className="p-6 md:p-8">
          {data.professional_summary && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Professional Summary
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {data.professional_summary}
              </p>
            </section>
          )}

          {data.experience?.length > 0 && (
            <section className="mt-8">
              <h2
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="mt-4 space-y-6">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 pl-4"
                    style={{ borderColor: `${accentColor}50` }}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {exp.position}
                        </h3>
                        <p className="text-sm font-medium text-slate-700">
                          {exp.company}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500">
                        {formatDate(exp.start_date)} -{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </p>
                    </div>
                    {exp.description && (
                      <ul className="mt-3 space-y-1 text-sm leading-6 text-slate-700">
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
            <section className="mt-8">
              <h2
                className="text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="mt-4 space-y-4">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {project.name}
                      </h3>
                      {project.type && (
                        <span className="text-sm text-slate-500">
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
        </main>
      </div>
    </div>
  );
};

export default SidebarTemplate;
