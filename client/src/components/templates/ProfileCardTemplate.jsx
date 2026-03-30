import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import {
  formatDate,
  getImageSource,
  getLinkedin,
  splitDescription,
} from "./templateUtils";

const ProfileCardTemplate = ({ data, accentColor }) => {
  const linkedin = getLinkedin(data.personal_info);
  const imageSource = getImageSource(data.personal_info?.image);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 text-slate-800 sm:p-8">
      <header
        className="rounded-3xl border p-6"
        style={{
          borderColor: `${accentColor}35`,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex justify-center md:justify-start">
            <div
              className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border bg-white"
              style={{ borderColor: `${accentColor}35` }}
            >
              {imageSource ? (
                <img
                  src={imageSource}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span
                  className="text-3xl font-bold uppercase"
                  style={{ color: accentColor }}
                >
                  {(data.personal_info?.full_name || "Y")
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p className="mt-2 font-medium" style={{ color: accentColor }}>
                {data.personal_info.profession}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
              {data.personal_info?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {data.personal_info.email}
                </span>
              )}
              {data.personal_info?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="size-4" />
                  {data.personal_info.phone}
                </span>
              )}
              {data.personal_info?.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {data.personal_info.location}
                </span>
              )}
              {linkedin && (
                <span className="flex items-center gap-1 break-all">
                  <Linkedin className="size-4" />
                  {linkedin}
                </span>
              )}
              {data.personal_info?.website && (
                <span className="flex items-center gap-1 break-all">
                  <Globe className="size-4" />
                  {data.personal_info.website}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {data.professional_summary && (
        <section className="mt-6">
          <h2
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: accentColor }}
          >
            Summary
          </h2>
          <p className="text-sm leading-6 text-slate-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-8">
          {data.experience?.length > 0 && (
            <section>
              <h2
                className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: `${accentColor}20` }}
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
                            backgroundColor: `${accentColor}12`,
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
        </div>

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
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-xl border px-3 py-1 text-sm"
                    style={{ borderColor: `${accentColor}25` }}
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

export default ProfileCardTemplate;
