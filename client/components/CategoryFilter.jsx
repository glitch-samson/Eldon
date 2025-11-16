export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            activeCategory === category.value
              ? "bg-blue-900 text-white shadow-lg scale-105"
              : "bg-blue-100 text-blue-900 hover:bg-blue-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
