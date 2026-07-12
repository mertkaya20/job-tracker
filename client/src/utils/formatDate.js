export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
