import React from "react";
import { Category } from "../../types/categoryType";

type ProductFilterProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-md w-full sm:w-72
        hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-400 dark:hover:border-blue-400"
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-gray-300 rounded-md
        hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200
        dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400
        dark:focus:ring-blue-400 dark:hover:border-blue-400"
      >
        <option value="">Semua</option>
        {Object.values(Category).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;