import React, { useState } from "react";
import { useTableSort } from "../../../../../hook/useTableSort";
import { RequestPopup } from "../popupPage/RequestPopup";

const priorityStyle = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-green-100 text-green-600",
};

const statusStyle = {
  Open: "bg-orange-100 text-orange-600",
  "In Progress": "bg-blue-100 text-blue-600",
  Resolved: "bg-green-100 text-green-600",
  Closed: "bg-slate-100 text-slate-700",
};

export const RequestTable = ({ data }) => {
  const { sortedData, sortKey, sortOrder, handleSort } =
    useTableSort(data, "id");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  // ✅ FIX: use sortedData instead of data
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const SortIcon = ({ column }) => {
    if (sortKey !== column) {
      return <span className="ml-1 text-gray-300">▲▼</span>;
    }

    return sortOrder === "asc" ? (
      <span className="ml-1 text-blue-600">▲</span>
    ) : (
      <span className="ml-1 text-blue-600">▼</span>
    );
  };

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-slate-100 border-b text-[13px] font-semibold text-slate-700">

              <th
                onClick={() => handleSort("id")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Request ID <SortIcon column="id" />
              </th>

              <th
                onClick={() => handleSort("title")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Title / Description <SortIcon column="title" />
              </th>

              <th
                onClick={() => handleSort("category")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Category <SortIcon column="category" />
              </th>

              <th
                onClick={() => handleSort("priority")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Priority <SortIcon column="priority" />
              </th>

              <th
                onClick={() => handleSort("status")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Status <SortIcon column="status" />
              </th>

              <th
                onClick={() => handleSort("requestedDate")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Requested On <SortIcon column="requestedDate" />
              </th>

              <th
                onClick={() => handleSort("updatedDate")}
                className="px-6 py-4 text-left cursor-pointer select-none"
              >
                Last Updated <SortIcon column="updatedDate" />
              </th>

              {/* ❌ NO SORT HERE */}
              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>
            {currentRows.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5 font-semibold text-[#13235B]">
                  {item.id}
                </td>

                <td className="px-6 py-5 min-w-[280px]">
                  <h3 className="font-semibold text-[#13235B]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate w-64">
                    {item.description}
                  </p>
                </td>

                <td className="px-6 py-5">
                  <span className="text-sm font-medium">
                    {item.category}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${priorityStyle[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${statusStyle[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="font-semibold">{item.requestedDate}</p>
                  <p className="text-xs text-gray-500">
                    {item.requestedTime}
                  </p>
                </td>

                <td className="px-6 py-5 whitespace-nowrap">
                  <p className="font-semibold">{item.updatedDate}</p>
                  <p className="text-xs text-gray-500">
                    {item.updatedTime}
                  </p>
                </td>

                <td className="px-6 py-5 relative">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRequest(item);
                        setIsModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-lg border hover:bg-gray-50"
                    >
                      <i className="bi bi-eye"></i>
                    </button>

                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                      className="w-10 h-10 rounded-lg border hover:bg-gray-50 relative"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>
                    {openMenuId === item.id && (
                      <div className="absolute right-6 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">

                        {/* Edit */}
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100">
                          <i className="bi bi-pencil-square text-blue-600"></i>
                          Edit
                        </button>

                        {/* Delete */}
                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 text-red-600">
                          <i className="bi bi-trash"></i>
                          Delete
                        </button>

                      </div>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="py-16 text-center">
          <i className="bi bi-inbox text-5xl text-gray-300"></i>
          <h3 className="mt-4 text-lg font-semibold text-gray-700">
            No Requests Found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Try changing your filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      {data.length > 0 && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5">

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold">{indexOfFirstRow + 1}</span>
            {" "}to{" "}
            <span className="font-semibold">
              {Math.min(indexOfLastRow, sortedData.length)}
            </span>
            {" "}of{" "}
            <span className="font-semibold">{sortedData.length}</span>
            {" "}Requests
          </p>

          <div className="flex items-center gap-2">

            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-lg border ${currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
                }`}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-lg border ${currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-lg border ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100"
                }`}
            >
              <i className="bi bi-chevron-right"></i>
            </button>

          </div>
        </div>
      )}
      <RequestPopup
        isOpen={isModalOpen}
        data={selectedRequest}
        onClose={() => setIsModalOpen(false)}
      />

    </div>
  );
};