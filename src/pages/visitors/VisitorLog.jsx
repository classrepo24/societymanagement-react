import React from "react";
import * as XLSX from "xlsx";
import { useVisitors } from "../../context/VisitorContext";
import { useState } from "react";
const VisitorLog = () => {
  const { visitors,
    getStatusStyle,
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

  //sorting
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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


  const getSortValue = (field, value) => {
    if (!value) return "";

    // ID → number
    if (field === "id") return Number(value);

    // Date → timestamp
    if (field === "date") return new Date(value).getTime();

    // Time fields → convert to minutes
    if (field === "inTime" || field === "outTime") {
      const [time, modifier] = value.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes;
    }

    // default string
    return value.toString().toLowerCase();
  };

  //sorting
  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
    if (!sortField) return 0;

    const aVal = getSortValue(sortField, a[sortField]);
    const bVal = getSortValue(sortField, b[sortField]);

    if (aVal === bVal) return 0;

    return sortOrder === "asc"
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };



  //pagination
  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage);

  const paginatedVisitors = sortedVisitors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // export function

  const exportToExcel = () => {
  const data = sortedVisitors.map((visitor) => ({
    ID: visitor.id,
    Name: visitor.name,
    Phone: visitor.phone,
    "Whom To Visit": visitor.whom,
    Flat: visitor.flat,
    Purpose: visitor.purpose,
    Date: visitor.date,
    "Check In": visitor.inTime,
    "Check Out": visitor.outTime || "--",
    Duration: visitor.duration || "--",
    Status: visitor.status,
    "Checked By": "Security",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Visitor Log");

  XLSX.writeFile(workbook, "Visitor_Log.xlsx");
};
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
          <button
  onClick={exportToExcel}
  className="border rounded-lg px-4 py-2"
>
  <i className="bi bi-download me-2"></i>
  Export
</button>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label className="text-sm font-medium">Date Range</label>

            <div className="flex flex-col sm:flex-row gap-2 border rounded-lg p-2 mt-2 bg-white">
              {/* Start Date */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="outline-none bg-transparent text-sm w-full min-w-0"
              />


              {/* End Date */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="outline-none bg-transparent text-sm w-full min-w-0"
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

          <div className="flex items-end gap-2 ">
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
              className="border rounded-lg h-10 px-4 hover:bg-gray-100 flex-1"
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
              className="bg-blue-600 text-white rounded-lg  h-10 px-4 flex-1 whitespace-nowrap text-sm"
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
        <div className="w-max md:min-w-full">
          <table className="w-max min-w-full text-xs md:text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-xs md:text-sm">
              <tr className="text-left">

                <th
                  onClick={() => handleSort("id")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    #

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span
                        className={
                          sortField === "id" && sortOrder === "asc"
                            ? "text-blue-600 font-bold"
                            : "text-gray-400"
                        }
                      >
                        ▲
                      </span>

                      <span
                        className={
                          sortField === "id" && sortOrder === "desc"
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
                  onClick={() => handleSort("name")}
                  className="px-3 py-3 cursor-pointer"
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
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Whom To Visit

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "whom" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "whom" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("flat")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Flat / Wing

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "flat" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "flat" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("purpose")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Purpose

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "purpose" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "purpose" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("inTime")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Check In

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "inTime" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "inTime" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("outTime")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Check Out

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "outTime" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "outTime" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("duration")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Duration

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span
                        className={
                          sortField === "duration" && sortOrder === "asc"
                            ? "text-blue-600 font-bold"
                            : "text-gray-400"
                        }
                      >
                        ▲
                      </span>

                      <span
                        className={
                          sortField === "duration" && sortOrder === "desc"
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
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Status

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span className={sortField === "status" && sortOrder === "asc" ? "text-blue-600 font-bold" : "text-gray-400"}>▲</span>
                      <span className={sortField === "status" && sortOrder === "desc" ? "text-blue-600 font-bold" : "text-gray-400"}>▼</span>
                    </span>
                  </div>
                </th>

                <th
                  onClick={() => handleSort("checkedBy")}
                  className="px-3 py-3 cursor-pointer"
                >
                  <div className="flex items-center">
                    Checked By

                    <span className="ml-2 inline-flex flex-col text-[10px] leading-none">
                      <span
                        className={
                          sortField === "checkedBy" && sortOrder === "asc"
                            ? "text-blue-600 font-bold"
                            : "text-gray-400"
                        }
                      >
                        ▲
                      </span>

                      <span
                        className={
                          sortField === "checkedBy" && sortOrder === "desc"
                            ? "text-blue-600 font-bold"
                            : "text-gray-400"
                        }
                      >
                        ▼
                      </span>
                    </span>
                  </div>
                </th>


              </tr>
            </thead>

            <tbody className="text-xs md:text-sm">
              {paginatedVisitors.map((visitor, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">

                  {/* # */}
                  <td className="px-3 py-3">
                    {visitor.id}
                  </td>
                  {/* Visitor Details */}
                  <td className="px-3 py-3">
                    <p className="font-semibold">{visitor.name}</p>
                    <p className="text-sm text-gray-500">{visitor.phone}</p>
                  </td>

                  {/* Whom To Visit */}
                  <td className="px-3 py-3">{visitor.whom}</td>

                  {/* Flat */}
                  <td className="px-3 py-3">{visitor.flat}</td>

                  {/* Purpose */}
                  <td className="px-3 py-3">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {visitor.purpose}
                    </span>
                  </td>

                  {/* Check In */}
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-md">{visitor.date}</span>
                      <span className="text-sm text-gray-500">{visitor.inTime}</span>
                    </div>
                  </td>


                  {/* Check Out */}
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="text-md">{visitor.date}</span>
                      <span className="text-sm text-gray-500">
                        {visitor.outTime ? visitor.outTime : "--"}
                      </span>
                    </div>
                  </td>
                  {/* Duration */}
                  <td className="px-3 py-3">
                    {visitor.duration ? visitor.duration : "--"}
                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(
                        visitor.status
                      )}`}
                    >
                      {visitor.status}
                    </span>
                  </td>

                  {/* Checked By */}
                  <td className="px-3 py-3">Security</td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 p-5">
          <p className="text-gray-500 text-sm whitespace-nowwrap">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, visitors.length)} of{" "}
            {visitors.length} entries
          </p>

          <div className="flex items-center gap-2 flex-nowrap">
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

