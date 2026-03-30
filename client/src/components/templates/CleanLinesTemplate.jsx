import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin, splitDescription } from "./templateUtils";

const CleanLinesTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-slate-800">
      <header className="pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p className="mt-2 text-base text-slate-600">
                {data.personal_info.profession}
              </p>
            )}
          </div>

          <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {data.personal_info?.email && (
              <span className="flex items-center gap-2">
                <Mail className="size-4" />
                {data.personal_info.email}
              </span>
            )}
            {data.personal_info?.phone && (
              <span className="flex items-center gap-2">
                <Phone className="size-4" />
                {data.personal_info.phone}
              </span>
            )}
            {data.personal_info?.location && (
              <span className="flex items-center gap-2">
                <MapPin className="size-4" />
                {data.personal_info.location}
              </span>
            )}
            {linkedin && (
              <span className="flex items-center gap-2 break-all">
                <Linkedin className="size-4" />
                {linkedin}
              </span>
            )}
            {data.personal_info?.website && (
              <span className="flex items-center gap-2 break-all sm:col-span-2">
                <Globe className="size-4" />
                {data.personal_info.website}
              </span>
            )}
          </div>
        </div>
      </header>

      {data.professional_summary && (
        <section
          className="border-y py-5"
          style={{ borderColor: `${accentColor}35` }}
        >
          <h2
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      <div className="divide-y" style={{ borderColor: `${accentColor}20` }}>
        {data.experience?.length > 0 && (
          <section className="py-5">
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: accentColor }}
            >
              Experience
            </h2>
            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-slate-700">{exp.company}</p>
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

        <section className="grid gap-8 py-5 md:grid-cols-2">
          {data.project?.length > 0 && (
            <div>
              <h2
                className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              <div className="space-y-4">
                {data.project.map((project, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-slate-900">
                      {project.name}
                    </h3>
                    {project.type && (
                      <p className="text-sm text-slate-500">{project.type}</p>
                    )}
                    {project.description && (
                      <p className="mt-1 text-sm leading-6 text-slate-700">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-8">
            {data.education?.length > 0 && (
              <div>
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
              </div>
            )}

            {data.skills?.length > 0 && (
              <div>
                <h2
                  className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: accentColor }}
                >
                  Skills
                </h2>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-700">
                  {data.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CleanLinesTemplate;
