import useTable from "../../hooks/useTable";
import * as XLSX from "xlsx";
import { useApp } from "../../context/AppContext";
import StatsCards from "../../component/StatsCards";
import SortableHeader from "../../component/SortableHeader";
import { useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import { useState } from "react";
const VisitorLog = () => {
  const { visitors,
    getStatusStyle,
    monthGrowth,
  } = useApp();

  const navigate = useNavigate();

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
  const avgvisitorsPerDay = (visitors.length / uniqueDays).toFixed(1);

  //  filter
  const filteredvisitors = visitors.filter((v) => {
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
  const itemsPerPage = 5;
  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    sortedData: sortedvisitors,
    paginatedData: paginatedvisitors,
    totalPages,
    handleSort,
  } = useTable(filteredvisitors, itemsPerPage);

  //export excel file
  const exportToExcel = () => {
    const data = sortedvisitors.map((visitor) => ({
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
      title: "Total visitors",
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
      value: avgvisitorsPerDay,
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
            <button onClick={() => navigate("/dashboard")}>Dashboard</button> /
            <button onClick={() => navigate("/visitors")}>visitors </button>/
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
      <StatsCards cards={cards} />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <div className="w-max md:min-w-full border">
          <table className="w-max min-w-full text-xs md:text-sm whitespace-nowrap">
            <thead className="bg-gray-100 text-xs md:text-sm">
              <tr className="text-left">
                <SortableHeader
                  label="#"
                  field="id"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Visitor Details"
                  field="name"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Whom To Visit"
                  field="whom"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Flat / Wing"
                  field="flat"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Purpose"
                  field="purpose"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Check In"
                  field="inTime"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Check Out"
                  field="outTime"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Duration"
                  field="duration"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Status"
                  field="status"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />

                <SortableHeader
                  label="Checked By"
                  field="checkedBy"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="px-3 py-3"
                />
              </tr>
            </thead>

            <tbody className="text-xs md:text-sm">
              {paginatedvisitors.map((visitor, index) => (
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
                  <td className="pl-6 py-3">Security</td>



                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={filteredvisitors.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </div>
  );
};

export default VisitorLog;

