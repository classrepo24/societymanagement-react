import React from "react";
import StatsCards from "../../../component/StatsCards";
import leaveHistory from "../../../data/leavehistory.json"
import SortableHeader from "../../../component/SortableHeader";
import useTable from "../../../hooks/useTable";
import Pagination from "../../../component/Pagination";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../../../component/DeleteModal";
import ActionMenu from "../../../component/ActionMenu";
import Breadcrumb from "../../../component/Breadcrumb";
import { useApp } from "../../../context/AppContext";



const LeaveHistory = () => {

    const { getStatusStyle } = useApp();
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [selectedStaff, setSelectedStaff] = useState("");
    const [selectedLeaveType, setSelectedLeaveType] = useState("");
    const [leaveList, setLeaveList] = useState(leaveHistory);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const [editData, setEditData] = useState({
        type: "",
        status: "",
    });

    const itemsPerPage = 10;

    //filter
    const applyFilters = (data) => {
        return data.filter((item) => {

            // STAFF FILTER
            const staffMatch =
                !selectedStaff || item.name === selectedStaff;

            // LEAVE TYPE FILTER
            const typeMatch =
                !selectedLeaveType || item.type === selectedLeaveType;

            // DATE FILTER
            let dateMatch = true;

            if (startDate && endDate) {
                const itemDate = new Date(item.applied);
                dateMatch =
                    itemDate >= startDate && itemDate <= endDate;
            }

            return staffMatch && typeMatch && dateMatch;
        });
    };

    const filteredData = applyFilters(leaveList);

    //edit
    const handleEdit = (item) => {
        setEditingId(item.id);

        setEditData({
            type: item.type,
            status: item.status,
        });

        setOpenMenu(null);
    };

    //save
    const handleSaveEdit = (id) => {
        const updated = leaveList.map((item) =>
            item.id === id
                ? {
                    ...item,
                    type: editData.type,
                    status: editData.status,
                }
                : item
        );

        setLeaveList(updated);
        setEditingId(null);
    };

    //cancel
    const handleCancelEdit = () => {
        setEditingId(null);
    };


    //cards total
    const totalLeaves = filteredData.length;
    const approved = filteredData.filter(i => i.status === "Approved").length;
    const rejected = filteredData.filter(i => i.status === "Rejected").length;
    const cancelled = filteredData.filter(i => i.status === "Cancelled").length;
    const pending = filteredData.filter(i => i.status === "Pending").length;

    const cards = [
        {
            title: "Total Leaves",
            value: totalLeaves,
            subtitle: "In selected period",
            icon: "bi bi-calendar-check",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            title: "Approved",
            value: approved,
            subtitle: `${totalLeaves ? ((approved / totalLeaves) * 100).toFixed(2) : 0}% of total`,
            icon: "bi bi-check-circle",
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            title: "Rejected",
            value: rejected,
            subtitle: `${totalLeaves ? ((rejected / totalLeaves) * 100).toFixed(2) : 0}% of total`,
            icon: "bi bi-x-circle",
            bg: "bg-red-100",
            color: "text-red-600",
        },
        {
            title: "Cancelled",
            value: cancelled,
            subtitle: `${totalLeaves ? ((cancelled / totalLeaves) * 100).toFixed(2) : 0}% of total`,
            icon: "bi bi-file-earmark-x",
            bg: "bg-orange-100",
            color: "text-orange-500",
        },
        {
            title: "Pending",
            value: pending,
            subtitle: `${totalLeaves ? ((pending / totalLeaves) * 100).toFixed(2) : 0}% of total`,
            icon: "bi bi-hourglass-split",
            bg: "bg-purple-100",
            color: "text-purple-600",
        },
    ];

    //reset btn
    const handleReset = () => {
        setSelectedStaff("");
        setSelectedLeaveType("");
        setDateRange([null, null]);
        setCurrentPage(1);
    };

    const {
        currentPage,
        setCurrentPage,
        sortField,
        sortOrder,
        paginatedData,
        totalPages,
        handleSort,

    } = useTable(filteredData, itemsPerPage);

    // select staff member
    const staffList = [...new Set(leaveList.map((item) => item.name))];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Staff", path: "/staff" },
                    { label: "Leave History" },
                ]}
            />

            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#0B1F66]">
                        Leave History
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View leave history and details of all staff members.
                    </p>
                </div>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">

                    {/* Date Range */}
                    <div className="relative">
                        <i className="bi bi-calendar-range absolute left-3 top-1/2 -translate-y-1/2 text-gray-800 z-10"></i>

                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => setDateRange(update)}
                            isClearable
                            placeholderText="Select Date Range"
                            className="h-10 w-64 pl-10 pr-3 border rounded-lg outline-none"
                        />
                    </div>
                    {/* Select Staff */}
                    <select
                        value={selectedStaff}
                        onChange={(e) => setSelectedStaff(e.target.value)}
                        className="h-10 w-48 px-3 border rounded-lg outline-none bg-white"
                    >
                        <option value="">All Staff</option>

                        {staffList.map((staff) => (
                            <option key={staff} value={staff}>
                                {staff}
                            </option>
                        ))}
                    </select>

                    {/* Leave Type */}
                    <select
                        value={selectedLeaveType}
                        onChange={(e) => setSelectedLeaveType(e.target.value)}
                        className="h-10 w-48 px-3 border rounded-lg outline-none bg-white"
                    >
                        <option value="">All Leave Types</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Earned Leave">Earned Leave</option>
                    </select>
                    {/* Reset */}
                    <button
                        onClick={handleReset}
                        className="h-10 px-5 border rounded-lg hover:bg-gray-100 flex items-center gap-2"
                    >
                        Reset
                    </button>

                </div>
            </div>

            {/* Pass cards prop */}
            <StatsCards cards={cards} />

            <div className="overflow-x-auto rounded-md border">

                <table className="w-full ">

                    <thead className="border-b bg-gray-100 ">
                        <tr className="text-[#0B1F66] text-sm font-semibold">
                            <SortableHeader
                                label="#"
                                field="id"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Staff Member"
                                field="name"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Department"
                                field="department"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Leave Type"
                                field="type"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="From Date"
                                field="from"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="To Date"
                                field="to"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Total Days"
                                field="days"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Reason"
                                field="reason"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Status"
                                field="status"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4 text-left"
                            />

                            <SortableHeader
                                label="Applied On"
                                field="applied"
                                sortField={sortField}
                                sortOrder={sortOrder}
                                handleSort={handleSort}
                                className="px-4 py-4  text-left"
                            />

                            <th className="px-4 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item) => (
                            <tr key={item.id} className="border-b  hover:bg-gray-50">

                                <td className="px-4 py-4">{item.id}</td>

                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm uppercase">
                                            {item.name.charAt(0)}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-[#0B1F66]">{item.name}</p>
                                            <p className="text-xs text-gray-500">{item.emp}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-4 py-4">{item.department}</td>

                                <td className="px-4 py-4">
                                    {editingId === item.id ? (
                                        <select
                                            value={editData.type}
                                            onChange={(e) =>
                                                setEditData({
                                                    ...editData,
                                                    type: e.target.value,
                                                })
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option>Casual Leave</option>
                                            <option>Sick Leave</option>
                                            <option>Earned Leave</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                                                item.type
                                            )}`}
                                        >
                                            {item.type}
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-4">
                                    <p>{item.from}</p>
                                    <span className="text-xs text-gray-500">{item.fromDay}</span>
                                </td>

                                <td className="px-4 py-4">
                                    <p>{item.to}</p>
                                    <span className="text-xs text-gray-500">{item.toDay}</span>
                                </td>

                                <td className="px-4 py-4">{item.days}</td>

                                <td className="px-4 py-4">{item.reason}</td>

                                <td className="px-4 py-4">
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
                                            <option>Approved</option>
                                            <option>Rejected</option>
                                            <option>Cancelled</option>
                                            <option>Pending</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-4">{item.applied}</td>

                                <td className="px-4 py-4 text-center">
                                    {editingId === item.id ? (
                                        <div className="flex justify-center gap-3">
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
                                                setOpenMenu((prev) => (prev === item.id ? null : item.id))
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
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    paginatedData={paginatedData}
                    totalPages={totalPages}
                    totalItems={filteredData.length}
                    itemsPerPage={itemsPerPage}
                />


            </div>



            <DeleteModal
                show={showDelete}
                title="Delete Leave History"
                message="Are you sure you want to delete this record?"
                onClose={() => {
                    setShowDelete(false);
                    setSelectedLeave(null);
                }}
                onDelete={() => {
                    setLeaveList((prev) =>
                        prev.filter((leave) => leave.id !== selectedLeave.id)
                    );

                    setShowDelete(false);
                    setSelectedLeave(null);
                }}
            />
        </div>
    );
};

export default LeaveHistory;