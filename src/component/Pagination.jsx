import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pages.push(1, 2, 3);
    } else if (currentPage >= totalPages - 1) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
      <p className="text-sm text-gray-500">
        Showing {start} to {end} of {totalItems} entries
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="border rounded px-4 py-2 disabled:opacity-50"
        >
          &lt;
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {page}
          </button>
        ))}

        {totalPages > 5 && pages[pages.length - 1] < totalPages - 1 && (
          <span>...</span>
        )}

        {totalPages > 5 && pages[pages.length - 1] !== totalPages && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {totalPages}
          </button>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="border rounded px-4 py-2 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;