import { useState } from "react";
import activityLogData from "../../../data/activitylog.json";
import Pagination from "../../../component/Pagination";
import SortableHeader from "../../../component/SortableHeader";
import StatsCards from "../../../component/StatsCards";
import useTable from "../../../hooks/useTable";
import DatePicker from "react-datepicker";
import { exportToExcel } from "../../../utils/exportToExcel";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "../../../component/Breadcrumb";
import { getStatusStyle } from "../../../utils/statusStyle";
const ActivityLog = () => {


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedModule, setSelectedModule] = useState("All Modules");
    const [selectedAction, setSelectedAction] = useState("All Actions");
    const cards = [
        {
            title: "Total Activities",
            value: "1,248",
            subtitle: "In selected period",
            icon: "bi bi-clock-history",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            title: "Active Users",
            value: "15",
            subtitle: "Performed activities",
            icon: "bi bi-people-fill",
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            title: "Modules Accessed",
            value: "12",
            subtitle: "Different modules",
            icon: "bi bi-bullseye",
            bg: "bg-purple-100",
            color: "text-purple-600",
        },
        {
            title: "Failed Attempts",
            value: "23",
            subtitle: "Security events",
            icon: "bi bi-shield-check",
            bg: "bg-yellow-100",
            color: "text-yellow-600",
        },
    ];

    const itemsPerPage = 10;

    //filter
    const filteredData = activityLogData.filter((item) => {
        const itemDate = new Date(item.date);

        const dateMatch =
            (!startDate || itemDate >= startDate) &&
            (!endDate || itemDate <= endDate);

        const moduleMatch =
            selectedModule === "All Modules" ||
            item.module === selectedModule;

        const actionMatch =
            selectedAction === "All Actions" ||
            item.action === selectedAction;

        return dateMatch && moduleMatch && actionMatch;
    });

    const {
        paginatedData,
        currentPage,
        totalPages,
        setCurrentPage,
        sortField,
        sortOrder,
        handleSort,
    } = useTable(filteredData, itemsPerPage);
    return (
        <div className="p-6 bg-[#F8FAFC] min-h-screen">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Staff", path: "/staff" },
                    { label: "Activity Log" },
                ]}
            />

            {/* Heading */}
            <div className="flex justify-between items-start flex-wrap gap-4 mb-6">

                <div>
                    <h1 className="text-3xl font-bold text-[#0B1F66]">
                        Activity Log
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track all important activities performed in the system.
                    </p>
                </div>

                {/* Filters */}

                <div className="flex gap-3 flex-wrap">
                    <div className="flex items-center border border-gray-300 rounded-lg h-11 bg-white px-3">
                        <i className="bi bi-calendar3 text-gray-500 mr-2"></i>

                        <DatePicker
                            selected={startDate}
                            onChange={(dates) => {
                                const [start, end] = dates;
                                setStartDate(start);
                                setEndDate(end);
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            isClearable
                            placeholderText="Select Date Range"
                            dateFormat="dd MMM yyyy"
                            className="w-52 outline-none border-none bg-transparent text-sm"
                        />
                    </div>

                    <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className="border rounded-lg px-4 h-11 bg-white"
                    >
                        <option>All Modules</option>
                        <option>Staff</option>
                        <option>Attendance</option>
                        <option>Leave</option>
                        <option>Salary & Payroll</option>
                        <option>Payroll</option>
                        <option>Finance</option>
                        <option>Visitors</option>
                        <option>Complaints</option>
                        <option>Maintenance</option>
                        <option>Reports</option>
                        <option>Settings</option>
                        <option>Roles & Permissions</option>
                    </select>

                    <select
                        value={selectedAction}
                        onChange={(e) => setSelectedAction(e.target.value)}
                        className="border rounded-lg px-4 h-11 bg-white"
                    >
                        <option>All Actions</option>
                        <option>Created</option>
                        <option>Updated</option>
                        <option>Deleted</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                        <option>Processed</option>
                        <option>Exported</option>
                        <option>Marked</option>
                        <option>Applied</option>
                        <option>Closed</option>
                    </select>

                    <button
                        onClick={() => {
                            setSelectedModule("All Modules");
                            setSelectedAction("All Actions");
                        }}
                        className=" border text-gray-800 hover:bg-gray-100 rounded-lg px-5 h-11 flex items-center gap-2"
                    >
                        Reset
                    </button>

                </div>
            </div>

            {/* Stats */}

            <StatsCards cards={cards} />

            {/* Table */}

            <div className="bg-white rounded-xl shadow border border-gray-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-[#0B1F66]">
                        Activity Log
                    </h2>

                    <button
                        onClick={() =>
                            exportToExcel(
                                filteredData.map((item) => ({
                                    ID: item.id,
                                    Date: item.date,
                                    Time: item.time,
                                    User: item.user,
                                    Role: item.role,
                                    Module: item.module,
                                    Action: item.action,
                                    Description: item.description,
                                    "IP Address": item.ip,
                                })),
                                "Activity_Log"
                            )
                        }
                        className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50"
                    >
                        <i className="bi bi-download"></i>
                        Export
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="bg-gray-50 border-b">
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
                                    label="Date & Time"
                                    field="date"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-4 py-4 text-left"
                                />

                                <SortableHeader
                                    label="User"
                                    field="user"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-4 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Role"
                                    field="role"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-4 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Module"
                                    field="module"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-4 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Action"
                                    field="action"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-4 py-4 text-left"
                                />

                                <th className="px-4 py-4 text-left">
                                    Description
                                </th>




                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-gray-50 text-sm"
                                >
                                    <td className="px-4 py-4">{item.id}</td>

                                    <td className="px-4 py-4">
                                        <div>{item.date}</div>
                                        <div className="text-xs text-gray-500">
                                            {item.time}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 font-medium">
                                        {item.user}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                                                item.role
                                            )}`}
                                        >
                                            {item.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        {item.module}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                                                item.action
                                            )}`}
                                        >
                                            {item.action}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 max-w-xs">
                                        {item.description}
                                    </td>



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
                    onPageChange={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    totalItems={activityLogData.length}
                />
            </div>


        </div>
    );
};

export default ActivityLog;