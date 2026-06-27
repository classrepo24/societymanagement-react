import React, { useState } from 'react'

const VisitorsTable = ({
  activeTab,
  setActiveTab,
  currentPage,
  setCurrentPage,
  filteredVisitors,
  paginatedVisitors,
  totalPages,
  startPage,
  endPage,
  itemsPerPage,
  getStatusStyle,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  showSortIcons,
  setShowSortIcons,
  setSelectedVisitor,
  setShowVisitorModal,
  setShowDeleteModal,
  setVisitorToDelete,

}) => {
  const handleSort = (field) => {
    setShowSortIcons((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

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

              {/* Filter Button */}
              <button className="flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm bg-white w-full sm:w-auto">
                <span><i className="bi bi-funnel"></i></span>
                Filters
              </button>

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
              <thead className=" border-b bg-gray-100">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="text-left p-4 cursor-pointer"
                  >
                    <div className="flex items-center">
                      Visitor Details

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "name" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>

                        <span
                          className={
                            sortField === "name" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("whom")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Whom to Visit

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "whom" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "whom" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("flat")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Flat/Wing

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "flat" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "flat" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("purpose")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Purpose

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "purpose" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "purpose" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("inTime")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      In Time

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "inTime" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "inTime" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort("outTime")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Out Time

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "outTime" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "outTime" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("status")}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      Status

                      <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                        <span
                          className={
                            sortField === "status" && sortOrder === "asc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▲
                        </span>
                        <span
                          className={
                            sortField === "status" && sortOrder === "desc"
                              ? "text-blue-600 font-bold"
                              : "text-gray-400"
                          }
                        >
                          ▼
                        </span>
                      </span>
                    </div>
                  </th>
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

                    {/* ✅ IMPORTANT: Actions column added */}
                    <td className="pl-4">
                      <button
                        className="w-8 h-8 border rounded-md text-blue-600 mr-2 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedVisitor(v);
                          setShowVisitorModal(true);
                        }}
                      >
                        <i className="bi bi-eye"></i>
                      </button>

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
          {/* TABLE FOOTER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-3 pt-2">

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

              {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 border rounded ${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              ))}

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
