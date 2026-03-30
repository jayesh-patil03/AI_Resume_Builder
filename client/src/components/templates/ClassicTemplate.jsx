import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import { formatDate, getLinkedin } from "./templateUtils";

const ClassicTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 text-gray-800 leading-relaxed">
      <header
        className="mb-8 border-b-2 pb-6 text-center"
        style={{ borderColor: accentColor }}
      >
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {data.personal_info?.profession && (
          <p className="mt-2 text-sm font-medium text-gray-600">
            {data.personal_info.profession}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <span className="break-all">{linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="mb-3 text-xl font-semibold" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div
                key={index}
                className="border-l-2 pl-4"
                style={{ borderColor: accentColor }}
              >
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="font-medium text-gray-700">{exp.company}</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </p>
                </div>
                {exp.description && (
                  <div className="whitespace-pre-line text-gray-700">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
            PROJECTS
          </h2>

          <div className="space-y-3">
            {data.project.map((project, index) => (
              <div
                key={index}
                className="border-l-2 border-gray-300 pl-4"
              >
                <h3 className="font-semibold text-gray-800">{project.name}</h3>
                {project.type && (
                  <p className="text-sm text-gray-500">{project.type}</p>
                )}
                {project.description && (
                  <p className="text-gray-600">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-sm text-gray-600">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-3 text-gray-700">
            {data.skills.map((skill, index) => (
              <span key={index}>- {skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
