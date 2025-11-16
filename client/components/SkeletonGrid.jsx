import { useState, useEffect } from "react";
import { SkeletonCard } from "./SkeletonCard";

export function SkeletonGrid({ count = 12 }) {
  const [columnCount, setColumnCount] = useState(
    window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4,
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(2);
      else if (width < 1024) setColumnCount(3);
      else setColumnCount(4);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Varying heights for a Pinterest-style look
  const heights = ["h-40", "h-56", "h-48", "h-52", "h-44", "h-60"];
  const getHeight = (index) => heights[index % heights.length];

  return (
    <div
      className="w-full"
      style={{
        columnCount: columnCount,
        columnGap: "1rem",
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`mb-4 break-inside-avoid rounded-lg overflow-hidden ${getHeight(index)}`}
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}
