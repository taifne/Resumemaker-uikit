export const formatDate = (date: Date | null | undefined) => {
  if (!date) return "Present";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};
