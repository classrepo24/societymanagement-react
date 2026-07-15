import React, { useEffect, useState } from "react";
import { FiFilter, FiCalendar, FiMoreVertical, FiChevronsUpDown, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { requests } from "../maintenanceData";
import { DeletePopup } from "../../../components/DeletePopup";


const badgeStyles = {
    Plumbing: "bg-blue-100 text-blue-600",
    Electrical: "bg-yellow-100 text-yellow-600",
    Civil: "bg-green-100 text-green-600",
    Gardening: "bg-purple-100 text-purple-600",
    Carpentry: "bg-sky-100 text-sky-600",

    High: "bg-pink-100 text-pink-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-green-100 text-green-600",

    Pending: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Overdue: "bg-red-100 text-red-600",
};

export const MaintenanceTable = () => {
    console.log("Static Data", requests);
    const [activeTab, setActiveTab] = useState("All Requests");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [openMenu, setOpenMenu] = useState(null);
    const [editId, setEditId] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        setTableData(requests);
    }, [requests])
    const handleDetele = (id) => {
        setTableData(tableData.filter((item) => item.id !== id));
    }
    const handleEdit = (id) => {
        setEditId(id);
    }
    const handleSave = (id) => {
        setEditId(null);
    }
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    }
    const getSortIcon = (key) => {
        if (sortConfig.key !== key) {
            return (
                <span className="flex flex-col leading-none text-gray-400 text-[10px]">
                    <span>▲</span>
                    <span>▼</span>
                </span>
            );
        }

        return sortConfig.direction === "asc" ? (
            <span className="text-grey-600 text-xs">▲</span>
        ) : (
            <span className="text-grey-600 text-xs">▼</span>
        );
    };
    const filteredRequests = tableData.filter((item) => {
        const statusMatch =
            activeTab === "All Requests"
                ? true
                : item.status === activeTab;

        const categoryMatch =
            categoryFilter === "All"
                ? true
                : item.category === categoryFilter;

        const itemDate = new Date(item.date);
        const dateMatch =
            (!startDate || itemDate >= new Date(startDate)) &&
            (!endDate || itemDate <= new Date(endDate));

        return statusMatch && categoryMatch && dateMatch;
    })
        .sort((a, b) => {
            if (!sortConfig.key) return 0;

            if (sortConfig.key === "date") {
                return sortConfig.direction === "asc"
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }

            const aValue = a[sortConfig.key]?.toString().toLowerCase();
            const bValue = b[sortConfig.key]?.toString().toLowerCase();

            if (aValue < bValue) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }

            if (aValue > bValue) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }

            return 0;
        });
    const confirmDelete = () => {
        setTableData(
            tableData.filter((item) => item.id !== deleteId)
        );

        setShowDeletePopup(false);
        setDeleteId(null);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden m-8">

            {/* Top Tabs */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
                <div className="flex gap-10">
                    {[
                        "All Requests",
                        "Pending",
                        "In Progress",
                        "Completed",
                        "Overdue",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 font-medium ${activeTab === tab
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-600"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3">
                    <div className="flex items-center gap-2 border rounded-xl px-4 py-2">
                        <FiFilter />

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="outline-none bg-transparent"
                        >
                            <option value="All">Filter</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Civil">Civil</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Carpentry">Carpentry</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 border rounded-xl px-4 py-2">
                        <FiCalendar />

                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="outline-none"
                        />

                        <span>-</span>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-gray-50">
                        <tr className="text-left text-sm">
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("id")}><div className="flex items-center gap-1">
                                Request ID
                                {getSortIcon("id")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("title")}><div className="flex items-center gap-1">
                                Title / Description
                                {getSortIcon("title")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("category")}><div className="flex items-center gap-1">
                                Category
                                {getSortIcon("category")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("resident")}><div className="flex items-center gap-1">
                                Requested by
                                {getSortIcon("resident")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("flat")}><div className="flex items-center gap-1">
                                Flat / Wing
                                {getSortIcon("flat")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("priority")}><div className="flex items-center gap-1">
                                Priority
                                {getSortIcon("priority")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("status")}><div className="flex items-center gap-1">
                                Status
                                {getSortIcon("status")}
                            </div></th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("assigned")}><div className="flex items-center gap-1">
                                Assigned ID
                                {getSortIcon("assigned")}
                            </div>Assigned To</th>
                            <th className="p-5 cursor-pointer" onClick={() => handleSort("date")}><div className="flex items-center gap-1">
                                Requested On
                                {getSortIcon("date")}
                            </div></th>
                            <th className="p-5">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredRequests.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-5 font-medium">{item.id}</td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) =>
                                                    setTableData(
                                                        tableData.map((row) =>
                                                            row.id === item.id
                                                                ? { ...row, title: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                className="border px-2 py-1 rounded w-full mb-2"
                                            />

                                            <input
                                                type="text"
                                                value={item.description}
                                                onChange={(e) =>
                                                    setTableData(
                                                        tableData.map((row) =>
                                                            row.id === item.id
                                                                ? { ...row, description: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="font-semibold">{item.title}</h3>
                                            <p className="text-slate-500">{JSON.stringify(item.description)}</p>
                                        </>
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <select
                                            value={item.category}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, category: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option>Plumbing</option>
                                            <option>Electrical</option>
                                            <option>Civil</option>
                                            <option>Gardening</option>
                                            <option>Carpentry</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded text-sm ${badgeStyles[item.category]}`}
                                        >
                                            {item.category}
                                        </span>
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <input
                                            type="text"
                                            value={item.resident}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, resident: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.resident}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />

                                            <span className="font-medium">
                                                {item.resident}
                                            </span>
                                        </div>
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <input
                                            type="text"
                                            value={item.flat}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, flat: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        item.flat
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <select
                                            value={item.priority}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, priority: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded text-sm ${badgeStyles[item.priority]}`}
                                        >
                                            {item.priority}
                                        </span>
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <select
                                            value={item.status}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, status: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        >
                                            <option>Pending</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                            <option>Overdue</option>
                                        </select>
                                    ) : (
                                        <span
                                            className={`px-3 py-1 rounded text-sm ${badgeStyles[item.status]}`}
                                        >
                                            {item.status}
                                        </span>
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <input
                                            type="text"
                                            value={item.assigned}
                                            onChange={(e) =>
                                                setTableData(
                                                    tableData.map((row) =>
                                                        row.id === item.id
                                                            ? { ...row, assigned: e.target.value }
                                                            : row
                                                    )
                                                )
                                            }
                                            className="border px-2 py-1 rounded"
                                        />
                                    ) : (
                                        item.assigned
                                    )}
                                </td>

                                <td className="p-5">
                                    {editId === item.id ? (
                                        <>
                                            <input
                                                type="date"
                                                value={item.date}
                                                onChange={(e) =>
                                                    setTableData(
                                                        tableData.map((row) =>
                                                            row.id === item.id
                                                                ? { ...row, date: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                className="border px-2 py-1 rounded mb-2 w-full"
                                            />

                                            <input
                                                type="time"
                                                value={item.time}
                                                onChange={(e) =>
                                                    setTableData(
                                                        tableData.map((row) =>
                                                            row.id === item.id
                                                                ? { ...row, time: e.target.value }
                                                                : row
                                                        )
                                                    )
                                                }
                                                className="border px-2 py-1 rounded w-full"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <div>{item.date}</div>
                                            <div className="text-gray-500 text-sm">{item.time}</div>
                                        </>
                                    )}
                                </td>
                                {console.log(item), console.log(item.description), console.log(item.time)}

                                <td className="p-5 relative">
                                    <button
                                        onClick={() =>
                                            setOpenMenu(openMenu === item.id ? null : item.id)
                                        }
                                        className="border rounded-xl p-3"
                                    >
                                        <FiMoreVertical />
                                    </button>

                                    {openMenu === item.id && (
                                        <div className="absolute right-5 mt-2 bg-white border rounded-lg shadow-lg w-28 z-10">

                                            {editId === item.id ? (
                                                <button
                                                    onClick={handleSave}
                                                    className="w-full text-left px-4 py-2 hover:bg-green-50 text-green-600"
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleEdit(item.id)}
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setDeleteId(item.id);
                                                    setShowDeletePopup(true);
                                                    setOpenMenu(null);
                                                }}
                                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
                <DeletePopup
                    isOpen={showDeletePopup}
                    title="Delete Member"
                    message="Are you sure you want to delete this member?"
                    onClose={() => {
                        setShowDeletePopup(false);
                        setDeleteId(null);
                    }}
                    onConfirm={confirmDelete}
                />
            
        </div>
    );
};
