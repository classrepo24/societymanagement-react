import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemName,
  indexOfFirst,
  indexOfLast,
  setCurrentPage,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-3">

      <p className="text-sm text-gray-500">
        Showing {totalItems === 0 ? 0 : indexOfFirst + 1} to{" "}
        {Math.min(indexOfLast, totalItems)} of{" "}
        {totalItems} {itemName}
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="w-10 h-10 border rounded-lg disabled:opacity-50"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium">
          {currentPage}
        </div>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="w-10 h-10 border rounded-lg disabled:opacity-50"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>
    </div>
  );
};

export default Pagination;