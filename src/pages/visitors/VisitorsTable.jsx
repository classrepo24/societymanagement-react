import { useSelector } from "react-redux";
import React, { useState } from 'react'
import useTable from "../../hooks/useTable";
import SortableHeader from "../../component/SortableHeader";
import Pagination from "../../component/Pagination";
import { getStatusStyle } from "../../utils/statusStyle";

const VisitorsTable = ({
  activeTab,
  setActiveTab,
  setShowDeleteModal,
  setVisitorToDelete,
}) => {

const visitors = useSelector((state) => state.visitors.visitors);

  const filteredvisitors = visitors.filter((visitor) => {
    if (activeTab === "All visitors") return true;
    if (activeTab === "Inside Society") return visitor.status === "inside";
    if (activeTab === "Exited") return visitor.status === "exited";
    if (activeTab === "Pre Registered") return visitor.status === "preRegistered"; // future use
    return true;
  });

  const itemsPerPage = 5;


  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    paginatedData: paginatedvisitors,
    totalPages,
    handleSort,
  } = useTable(filteredvisitors, itemsPerPage);



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
              {["All visitors", "Inside Society", "Exited", "Pre Registered"].map((tab) => (
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
                {paginatedvisitors.map((v, i) => (
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
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            totalItems={filteredvisitors.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  )
}

export default VisitorsTable
