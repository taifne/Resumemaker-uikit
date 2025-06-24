interface EmptyStateProps {
  mode?: "light" | "dark";
}

export const EmptyState = ({ mode = "light" }: EmptyStateProps) => {
  const isDark = mode === "dark";

  return (
    <div
      className={`p-8 text-center h-full ${
        isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
      }`}
    >
      <div className="text-4xl mb-4">📭</div>
      <h3 className={`text-lg font-semibold mb-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
        No results found
      </h3>
      <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Try adjusting your filters or search terms
      </p>
    </div>
  );
};
