import { useSelector } from "react-redux";
import StatsCards from "../../../component/StatsCards";
import Pagination from "../../../component/Pagination";
import attendance from "../../../data/attendance.json"
import useTable from "../../../hooks/useTable";
import SortableHeader from "../../../component/SortableHeader";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ActionMenu from "../../../component/ActionMenu";
import { exportToExcel } from "../../../utils/exportToExcel";
import Breadcrumb from "../../../component/Breadcrumb";
import { getStatusStyle } from "../../../utils/statusStyle";

const Attendance = () => {
  
  const staffs = useSelector(
  (state) => state.staff.staffs
);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState("Present");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [attendanceData, setAttendanceData] = useState(attendance);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    status: "",
    checkIn: "",
    checkOut: "",
  });

  const location = useLocation();
  const staffId = location.state?.staffId;

  //edit attendance

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      status: item.status,
      checkIn: item.checkIn,
      checkOut: item.checkOut,
    });

    setOpenMenu(null);
  };


  const handleSaveEdit = (id) => {
    const updated = attendanceData.map((item) =>
      item.id === id
        ? {
          ...item,
          status: editData.status,
          checkIn: editData.checkIn,
          checkOut: editData.checkOut,
          totalHours: calculateHours(
            editData.checkIn,
            editData.checkOut
          ),
        }
        : item
    );

    setAttendanceData(updated);
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map((item) => item.id));
    }
  };

  const handleSaveAttendance = () => {
    const updatedAttendance = attendanceData.map((item) => {
      if (!selectedRows.includes(item.id)) return item;

      const newCheckIn = checkInTime || item.checkIn;
      const newCheckOut = checkOutTime || item.checkOut;

      return {
        ...item,
        status: attendanceStatus,
        checkIn: newCheckIn,
        checkOut: newCheckOut,
        totalHours: calculateHours(newCheckIn, newCheckOut),
      };
    });

    setAttendanceData(updatedAttendance);

    setShowAttendanceModal(false);
    setSelectedRows([]);
    setAttendanceStatus("Present");
    setCheckInTime("");
    setCheckOutTime("");
  };


  const handleCancelAttendance = () => {
    setShowAttendanceModal(false);
    setSelectedRows([]); // checkbox reset
    setAttendanceStatus("Present");
    setCheckInTime("");
    setCheckOutTime("");
  };



  //toal hours
  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "--";

    const [inH, inM] = checkIn.split(":").map(Number);
    const [outH, outM] = checkOut.split(":").map(Number);

    const inMinutes = inH * 60 + inM;
    const outMinutes = outH * 60 + outM;

    const diff = outMinutes - inMinutes;

    if (diff <= 0) return "--";

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };
  //filter

  const filteredAttendance = attendanceData.filter((item) => {
    return (
      (search === "" ||
        item.staffName.toLowerCase().includes(search.toLowerCase())) &&
      (department === "" || item.department === department) &&
      (designation === "" || item.designation === designation) &&
      (status === "" || item.status === status) &&
      (date === "" || item.date === date)
    );
  });

  const presentCount = filteredAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  //total
  const absentCount = filteredAttendance.filter(
    (item) => item.status === "Absent"
  ).length;

  const leaveCount = filteredAttendance.filter(
    (item) => item.status === "Leave"
  ).length;

  const lateCount = filteredAttendance.filter(
    (item) => item.status === "Late"
  ).length;

  const totalStaff = filteredAttendance.length;

  const itemsPerPage = 8
  const {
    currentPage,
    setCurrentPage,
    sortField,
    sortOrder,
    paginatedData,
    totalPages,
    handleSort,

  } = useTable(filteredAttendance, itemsPerPage);


  //cards
  const attendanceCards = [
    {
      title: "Present Today",
      value: presentCount,
      subtitle: "Staff Members",
      icon: "bi bi-calendar2-event",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Absent Today",
      value: absentCount,
      subtitle: "Staff Members",
      icon: "bi bi-person-check-fill",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "On Leave Today",
      value: leaveCount,
      subtitle: "Staff Members",
      icon: "bi bi-clock",
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Late Today",
      value: lateCount,
      subtitle: "Staff Member",
      icon: "bi bi-calendar4-week",
      bg: "bg-violet-100",
      color: "text-violet-600",
    },
    {
      title: "Total Staff",
      value: totalStaff,
      subtitle: "Staff Members",
      icon: "bi bi-calendar3",
      bg: "bg-sky-100",
      color: "text-sky-600",
    },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">

      {/* Breadcrumb */}

      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/dashboard" },
          { label: "Staff", path: "/staff" },
          ...(staffId
            ? [{ label: "Staff Profile", path: `/staff/profile/${staffId}` }]
            : []),
          { label: "Attendance" },
        ]}
      />

      {/* Heading */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-gray-500">
            Track and manage staff attendance records.
          </p>
        </div>

        <div className="flex gap-3">


          <button
            onClick={() => exportToExcel(filteredAttendance, "Attendance_Report")}
            className="border rounded-lg px-4 py-2 flex items-center gap-2">
            <i className="bi bi-journal-minus"></i>Generate Report
          </button>


        </div>
      </div>

      {/* Cards */}

      <StatsCards cards={attendanceCards} />
      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 mb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg px-4 h-12"
          />

          {/* Department */}
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg px-4 h-12"
          >
            <option value="">All Departments</option>
            <option value="Security">Security</option>
            <option value="Housekeeping">Housekeeping</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          {/* Designation */}
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="border rounded-lg px-4 h-12"
          >
            <option value="">All Designations</option>
            <option value="Guard">Guard</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Cleaner">Cleaner</option>
          </select>
          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-4 h-12"
          >
            <option value="">All Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Leave">Leave</option>
          </select>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Staff..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg h-12 pl-4 pr-10"
            />

            <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
          </div>
          {/* Buttons */}
          <div className="flex gap-2">

            <button
              onClick={() => {
                setSearch("");
                setDepartment("");
                setDesignation("");
                setStatus("");
                setDate("");
              }}
              className="flex-1 border border-gray-300  rounded-lg hover:bg-gray-100 h-12 px-3 text-sm"
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* Table + Right Side */}

      <div className=" mt-5 ">

        {/* Left */}

        <div className="bg-white rounded-xl shadow p-5 w-full">
          {/* Table */}

          <table className="w-full">


            <thead className=" h-16 bg-gray-100">


              <tr>
                <th className="w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      selectedRows.length === paginatedData.length
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-blue-600"
                  />
                </th>
                <SortableHeader
                  label="#"
                  field="id"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="pl-5 "
                />

                <SortableHeader
                  label="Staff"
                  field="staffName"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                  className="pl-12"

                />

                <SortableHeader
                  label="Department"
                  field="department"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Check In"
                  field="checkIn"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Check Out"
                  field="checkOut"
                  sortField={sortField}
                  sortOrder={sortOrder}
                  handleSort={handleSort}
                />

                <SortableHeader
                  label="Total Hours"
                  field="totalHours"
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

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {paginatedData.map((item) => (
                <tr key={item.id} className="border h-10 ]">
                  <td className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="w-4 h-4 accent-blue-600"
                    />
                  </td>
                  <td className="px-5">{item.id}</td>

                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-1xl text-blue-600 flex items-center justify-center ">
                        {item.staffName.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {item.staffName}
                        </span>

                        <span className="text-sm text-gray-500">
                          {item.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>{item.department}</td>

                  <td>
                    {editingId === item.id ? (
                      <input
                        type="time"
                        value={editData.checkIn}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            checkIn: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      item.checkIn
                    )}
                  </td>

                  <td>
                    {editingId === item.id ? (
                      <input
                        type="time"
                        value={editData.checkOut}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            checkOut: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      item.checkOut
                    )}
                  </td>

                  <td>
                    {item.totalHours}
                  </td>

                  <td>
                    {editingId === item.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                        <option>Leave</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>
                  <td className="pl-5">
                    {editingId === item.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="text-green-600"
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>

                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600"
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                    ) : (
                      <ActionMenu
                        editOnly
                        showDelete={false}
                        isOpen={openMenu === item.id}
                        onToggle={() =>
                          setOpenMenu(openMenu === item.id ? null : item.id)
                        }
                        onClose={() => setOpenMenu(null)}
                        onEdit={() => handleEdit(item)}
                      />
                    )}
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
          <div className="mt-4 flex items-center justify-between">
            {/* Left */}
            <button
              disabled={selectedRows.length === 0}
              onClick={() => setShowAttendanceModal(true)}
              className={`px-5 py-2 rounded-lg flex items-center gap-2 text-white
  ${selectedRows.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              <i className="bi bi-calendar2-check"></i>
              Mark Attendance
            </button>
            {/* Center */}
            <div className="flex-1 flex justify-center">

            </div>

            {/* Right */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredAttendance.length}
            />
          </div>

        </div>


        {/* Right */}









      </div>
      {/* <div className=" bg-blue-100  mt-6  rounded-xl w-full h-20"></div> */}
      <div className="flex items-start gap-4 bg-blue-100 rounded-xl p-5 mt-6">
        <i className="bi bi-exclamation-circle text-3xl text-blue-700"></i>
        <div>
          <h3 className="font-semibold text-lg text-blue-700">
            Note
          </h3>
          <p className="text-sm text-gray-700 mt-1">
            Attendance is marked based on staff check-in and check-out time.
            You can edit or regularize attendance if needed.
          </p>
        </div>
      </div>
      {/* Bulk Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[500px] p-6 shadow-xl">

            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                Mark Attendance
              </h2>

              <button
                onClick={handleCancelAttendance}
                className="text-2xl text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">

              {/* Selected Staff */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Selected Staff
                </label>

                <div className="border rounded-lg px-4 py-3 bg-gray-50">
                  {selectedRows.length} Staff Selected
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Attendance Status
                </label>

                <select
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                  <option>Leave</option>
                </select>
              </div>

              {/* Time */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check In
                  </label>

                  <input
                    type="time"
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Check Out
                  </label>

                  <input
                    type="time"
                    value={checkOutTime}
                    onChange={(e) => setCheckOutTime(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={handleCancelAttendance}
                className="border px-5 py-2 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveAttendance}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Attendance
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Attendance;