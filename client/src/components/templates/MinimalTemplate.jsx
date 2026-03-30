import { getLinkedin, formatDate } from "./templateUtils";

const MinimalTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 font-light text-gray-900">
      <header className="mb-10">
        <h1 className="text-4xl font-thin tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        {data.personal_info?.profession && (
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-gray-500">
            {data.personal_info.profession}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && (
            <span>{data.personal_info.location}</span>
          )}
          {linkedin && <span className="break-all">{linkedin}</span>}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {data.professional_summary && (
        <section className="mb-10">
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {data.experience?.length > 0 && (
        <section className="mb-10">
          <h2
            className="mb-6 text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="mb-2 text-gray-600">{exp.company}</p>
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
        <section className="mb-10">
          <h2
            className="mb-6 text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-4">
            {data.project.map((project, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium">{project.name}</h3>
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
        <section className="mb-10">
          <h2
            className="mb-6 text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <div>
                  <h3 className="font-medium">
                    {edu.degree}
                    {edu.field ? ` in ${edu.field}` : ""}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills?.length > 0 && (
        <section>
          <h2
            className="mb-6 text-sm font-medium uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="text-gray-700">{data.skills.join(" | ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
