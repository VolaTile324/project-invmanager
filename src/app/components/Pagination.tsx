import React from "react";
import { Icons } from "./Icons";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200
            hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50"
          >
            <Icons.ArrowLeft className="w-6 h-6" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white text-bold"
                  : "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-200"
              } hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-200`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200
            hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200 disabled:opacity-50"
          >
            <Icons.ArrowRight className="w-6 h-6" />
          </button>
        </div>
  );
}

export default Pagination;