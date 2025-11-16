import { Skeleton } from "./ui/skeleton";

export function SkeletonCard({ height = "h-48" }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-100">
        <Skeleton className={`w-full ${height}`} />
      </div>
    </div>
  );
}
