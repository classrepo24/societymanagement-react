import React from "react";
import { useVisitors } from "../../../context/VisitorContext";
import { useState } from "react";
const VisitorLog = () => {
  const { visitors, setVisitors,
    getStatusStyle,
    setSelectedVisitor,
    setShowVisitorModal,
    itemsPerPage,
    monthGrowth,


  } = useVisitors();

  const [currentPage, setCurrentPage] = useState(1);
  //filter
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appliedStartDate, setAppliedStartDate] = useState("");
  const [appliedEndDate, setAppliedEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [appliedStatus, setAppliedStatus] = useState("All");
  const [appliedPurpose, setAppliedPurpose] = useState("All");

  // cards total calculation
  const checkedInCount = visitors.filter(v => v.status === "inside").length;
  const checkedOutCount = visitors.filter(v => v.status === "exited").length;

  const uniqueDays = new Set(visitors.map(v => v.date)).size || 1;
  const avgVisitorsPerDay = (visitors.length / uniqueDays).toFixed(1);

  //  filter
  const filteredVisitors = visitors.filter((v) => {
    const statusMatch =
      appliedStatus === "All" || v.status === appliedStatus;

    const purposeMatch =
      appliedPurpose === "All" || v.purpose === appliedPurpose;

    const visitorDate = new Date(v.date);

    const startMatch =
      !appliedStartDate || visitorDate >= new Date(appliedStartDate);

    const endMatch =
      !appliedEndDate || visitorDate <= new Date(appliedEndDate);

    return statusMatch && purposeMatch && startMatch && endMatch;
  });

  //pagination
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);

  const paginatedVisitors = filteredVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const cards = [
    {
      title: "Total Visitors",
      value: visitors.length,
      growth: monthGrowth ? `${monthGrowth}%` : "+0%",
      icon: "bi bi-people-fill",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Checked In",
      value: checkedInCount,
      growth: "+10%",
      icon: "bi bi-box-arrow-in-right",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Checked Out",
      value: checkedOutCount,
      growth: "+8%",
      icon: "bi bi-box-arrow-right",
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Avg Visit Duration",
      value: avgVisitorsPerDay,
      growth: "+5%",
      icon: "bi bi-clock-history",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Dashboard / Visitors /
            <span className="font-semibold text-black"> Visitor Log</span>
          </p>

          <h1 className="text-3xl font-bold mt-2">Visitor Log</h1>

          <p className="text-gray-500 mt-1">
            View and manage all visitor history and visit details.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-lg px-4 py-2">
            <i className="bi bi-download me-2"></i>
            Export
          </button>

          <button className="border rounded-lg px-4 py-2">
            <i className="bi bi-funnel me-2"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="text-sm font-medium">Date Range</label>

            <div className="flex items-center gap-1 border rounded-lg px-1 py-2 mt-2 bg-white">

              {/* Start Date */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="outline-none bg-transparent text-sm w-full"
              />

              <span className="text-gray-400">to</span>

              {/* End Date */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="outline-none bg-transparent text-sm w-full"
              />

            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Purpose</label>

            <select
              className="border rounded-lg p-2 w-full mt-2"
              value={purposeFilter}
              onChange={(e) => {
                setPurposeFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Delivery">Delivery</option>
              <option value="Meeting">Meeting</option>
              <option value="Guest">Guest</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Whom To Visit</label>

            <select className="border rounded-lg p-2 w-full mt-2">
              <option>All</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>

            <select
              className="border rounded-lg p-2 w-full mt-2"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="inside">Inside</option>
              <option value="exited">Exited</option>
              <option value="preRegistered">Pre Registered</option>
            </select>
          </div>

<div className="flex items-end gap-2 h-full">
            <button
  onClick={() => {
    setStartDate("");
    setEndDate("");
    setStatusFilter("All");
    setPurposeFilter("All");

    setAppliedStartDate("");
    setAppliedEndDate("");
    setAppliedStatus("All");
    setAppliedPurpose("All");

    setCurrentPage(1);
  }}
  className="border rounded-lg px-4 hover:bg-gray-100 py-2 w-full"
>
  Reset
</button>

            <button
              onClick={() => {
                setAppliedStatus(statusFilter);
                setAppliedPurpose(purposeFilter);

                setAppliedStartDate(startDate);
                setAppliedEndDate(endDate);

                setCurrentPage(1);
              }}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
          >
            <div
              className={`w-16 h-16 rounded-full flex justify-center items-center ${card.bg} ${card.color}`}
            >
              <i className={`${card.icon} text-2xl`}></i>
            </div>

            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-2xl font-bold">{card.value}</h2>

              <p className="text-xs text-green-600 mt-1">
                {card.growth} from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">#</th>
              <th>Visitor Details</th>
              <th>Whom To Visit</th>
              <th>Flat</th>
              <th>Purpose</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Checked By</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedVisitors.map((visitor, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">

                {/* # */}
                <td className="p-4">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                {/* Visitor Details */}
                <td>
                  <p className="font-semibold">{visitor.name}</p>
                  <p className="text-sm text-gray-500">{visitor.phone}</p>
                </td>

                {/* Whom To Visit */}
                <td>{visitor.whom}</td>

                {/* Flat */}
                <td>{visitor.flat}</td>

                {/* Purpose */}
                <td>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {visitor.purpose}
                  </span>
                </td>

                {/* Check In */}
<td>
  <div className="flex flex-col">
    <span className="text-md">{visitor.date}</span>
    <span className="text-sm text-gray-500">{visitor.inTime}</span>
  </div>
</td>


                {/* Check Out */}
<td>
  <div className="flex flex-col">
    <span className="text-md">{visitor.date}</span>
    <span className="text-sm text-gray-500">
      {visitor.outTime ? visitor.outTime : "--"}
    </span>
  </div>
</td>
                {/* Duration */}
                <td>
                  {visitor.duration ? visitor.duration : "--"}
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                      visitor.status
                    )}`}
                  >
                    {visitor.status}
                  </span>
                </td>

                {/* Checked By */}
                <td>Security</td>

                {/* Action */}
                <td>
                  <button
                    onClick={() => {
                      setSelectedVisitor(visitor);
                      setShowVisitorModal(true);
                    }}
                    className="border rounded-lg p-2 hover:bg-gray-100"
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center p-5">
          <p className="text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, visitors.length)} of{" "}
            {visitors.length} entries
          </p>

          <div className="flex gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="border rounded p-2 disabled:opacity-50"
            >&lt;
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="border rounded p-2 disabled:opacity-50"
            >&gt;
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorLog;

