export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("tr-TR", {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
