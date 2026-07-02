import React, { useState } from 'react'

import useTable from "../../hooks/useTable";
import { useVisitors } from "../../context/VisitorContext";
import SortableHeader from "../../component/SortableHeader";


const VisitorsTable = ({
  activeTab,
  setActiveTab,
  setShowDeleteModal,
  setVisitorToDelete,
}) => {

  const { visitors, getStatusStyle } = useVisitors();
  

  const filteredVisitors = visitors.filter((visitor) => {
    if (activeTab === "All Visitors") return true;
    if (activeTab === "Inside Society") return visitor.status === "inside";
    if (activeTab === "Exited") return visitor.status === "exited";
    if (activeTab === "Pre Registered") return visitor.status === "preRegistered"; // future use
    return true;
  });

      const itemsPerPage=5;


  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    paginatedData: paginatedVisitors,
    totalPages,
    handleSort,
  } = useTable(filteredVisitors,itemsPerPage);



  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  return (
    <>

      {/* TABLE */}
      <div className="col-span-2">
        <div className="bg-white rounded-xl shadow p-4">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            {/* LEFT: TABS */}
            <div className="flex gap-4 lg:gap-6 text-sm font-bold items-end overflow-x-auto  pb-2 scrollbar-hide">
              {["All Visitors", "Inside Society", "Exited", "Pre Registered"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`relative pb-2 inline-block transition-all duration-200 ${activeTab === tab
                    ? "text-blue-600"
                    : "text-gray-900"
                    }`}
                >
                  {tab}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 ${activeTab === tab ? "bg-blue-600" : "bg-transparent"
                      }`}
                  />
                </button>

              ))}
            </div>

            {/* RIGHT: FILTER + DATE */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">


              <div className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white w-full sm:w-auto">
                <span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full sm:w-auto outline-none"
                  />
                </span>
              </div>

            </div>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm border-collapse">
              <thead className="border-b bg-gray-100">
  <tr>
    <SortableHeader
      label="Visitor Details"
      field="name"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
      className="text-left p-4 pl-2"
    />

    <SortableHeader
      label="Whom to Visit"
      field="whom"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <SortableHeader
      label="Flat/Wing"
      field="flat"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <SortableHeader
      label="Purpose"
      field="purpose"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <SortableHeader
      label="In Time"
      field="inTime"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <SortableHeader
      label="Out Time"
      field="outTime"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <SortableHeader
      label="Status"
      field="status"
      sortField={sortField}
      sortOrder={sortOrder}
      handleSort={handleSort}
    />

    <th className="pr-2">Actions</th>
  </tr>
</thead>

              <tbody>
                {paginatedVisitors.map((v, i) => (
                  <tr key={i} className="border-b  hover:bg-gray-50">

                    <td className="p-2">
                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                          {v.name.charAt(0)}
                        </div>

                        <div>
                          <div className="font-medium">{v.name}</div>
                          <div className="text-xs text-gray-400">{v.phone}</div>
                        </div>
                      </div>
                    </td>

                    <td className="pl-4">{v.whom}</td>
                    <td className="pl-4">{v.flat}</td>
                    <td className="pl-4">{v.purpose}</td>
                    <td className="pl-4">{v.inTime}</td>
                    <td className="pl-4">{v.outTime}</td>

                    <td className="">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusStyle(v.status)}`}>
                        {v.status}
                      </span>
                    </td>

                     {/* Actions column added */} 
                    <td className="pl-4">
                      
                      <button
                        className="w-8 h-8 border rounded-md text-red-600 bg-red-50 hover:bg-red-100"
                        onClick={() => {
                          setVisitorToDelete(v);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* TABLE FOOTER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3  pt-2">

            {/* Left */}
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Showing{" "}
              {filteredVisitors.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}{" "}
              to{" "}
              {Math.min(
                currentPage * itemsPerPage,
                filteredVisitors.length
              )}{" "}
              of {filteredVisitors.length} entries
            </p>

            {/* Right */}
            <div className="flex justify-center sm:justify-end items-center gap-1 sm:gap-2 flex-nowrap overflow-x-auto scrollbar-hide">
              <button
                className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {(() => {
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
                  <>
                    {pages.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded ${currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border"
                          }`}
                      >
                        {page}
                      </button>
                    ))}

                    {totalPages > 5 && pages[pages.length - 1] < totalPages - 1 && (
                      <span className="px-2 py-2">...</span>
                    )}

                    {totalPages > 5 && pages[pages.length - 1] !== totalPages && (
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className={`px-4 py-2 rounded ${currentPage === totalPages
                            ? "bg-blue-600 text-white"
                            : "border"
                          }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </>
                );
              })()}

              <button
                className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                onClick={() => {
                  if (currentPage < totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default VisitorsTable
