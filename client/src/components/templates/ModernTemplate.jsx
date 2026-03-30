import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin } from "./templateUtils";

const ModernTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      <header className="p-8 text-white" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-light">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.personal_info?.profession && (
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/80">
            {data.personal_info.profession}
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-2 break-all">
              <Linkedin className="size-4" />
              <span>{linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-2 break-all sm:col-span-2">
              <Globe className="size-4" />
              <span>{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {data.professional_summary && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-light">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {data.experience?.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-light">
              Experience
            </h2>

            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l border-gray-200 pl-6">
                  <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-500">
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="mt-3 whitespace-pre-line text-gray-700">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.project?.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-light">
              Projects
            </h2>

            <div className="space-y-6">
              {data.project.map((project, index) => (
                <div
                  key={index}
                  className="border-l pl-6"
                  style={{ borderLeftColor: accentColor }}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {project.name}
                  </h3>
                  {project.type && (
                    <p className="text-sm text-gray-500">{project.type}</p>
                  )}
                  {project.description && (
                    <div className="mt-3 text-sm text-gray-700">
                      {project.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid gap-8 sm:grid-cols-2">
          {data.education?.length > 0 && (
            <section>
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-light">
                Education
              </h2>

              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
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
              <h2 className="mb-4 border-b border-gray-200 pb-2 text-2xl font-light">
                Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full px-3 py-1 text-sm text-white"
                    style={{ backgroundColor: accentColor }}
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

export default ModernTemplate;
