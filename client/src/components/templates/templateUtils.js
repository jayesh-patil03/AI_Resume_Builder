export const formatDate = (dateStr) => {
  if (!dateStr) return "";

  const [year, month] = dateStr.split("-");

  if (!year || !month) return dateStr;

  return new Date(year, month - 1).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

export const getLinkedin = (personalInfo = {}) =>
  personalInfo.linkedin || personalInfo.linkdin || "";

export const getImageSource = (image) => {
  if (!image) return "";

  if (typeof image === "string") {
    return image;
  }

  if (typeof image === "object") {
    return URL.createObjectURL(image);
  }

  return "";
};

export const splitDescription = (value = "") =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
