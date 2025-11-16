export function SkeletonCard({ height = "h-48" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg ${height} bg-gray-200`}
    >
      {/* Reflective shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 opacity-70 animate-shimmer" />
    </div>
  );
}
