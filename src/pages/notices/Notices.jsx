import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotices } from "../../redux/noticeSlice";
import { getStatusStyle } from "../../utils/statusStyle";
import StatsCards from "../../component/StatsCards";
import SortableHeader from "../../component/SortableHeader";
import useTable from "../../hooks/useTable";
import Pagination from "../../component/Pagination";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { exportToExcel } from "../../utils/exportToExcel";
import Breadcrumb from "../../component/Breadcrumb";
import { useNavigate } from "react-router-dom";
import ActionMenu from "../../component/ActionMenu";
import DeleteModal from "../../component/DeleteModal";

const Notices = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();

const notices = useSelector(
  (state) => state.notices.notices);

    const stats = [
        {
            title: "Total Notices",
            value: notices.length,
            subtitle: "All Notices",
            icon: "bi bi-megaphone",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            title: "Published",
            value: notices.filter((n) => n.status === "Published").length,
            subtitle: "Active Notices",
            icon: "bi bi-send",
            bg: "bg-green-100",
            color: "text-green-600",
        },
        {
            title: "Scheduled",
            value: notices.filter((n) => n.status === "Scheduled").length,
            subtitle: "Upcoming Notices",
            icon: "bi bi-calendar-event",
            bg: "bg-yellow-100",
            color: "text-yellow-600",
        },
        {
            title: "Expired",
            value: notices.filter((n) => n.status === "Expired").length,
            subtitle: "Expired Notices",
            icon: "bi bi-calendar-minus",
            bg: "bg-red-100",
            color: "text-red-600",
        },
    ];

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const filteredNotices = notices.filter((notice) => {
        const noticeDate = new Date(notice.publishDate);

        const matchesSearch =
            notice.title.toLowerCase().includes(search.toLowerCase()) ||
            notice.description.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" || notice.status === statusFilter;

        const matchesCategory =
            categoryFilter === "All" || notice.category === categoryFilter;

        const matchesDate =
            (!startDate || noticeDate >= startDate) &&
            (!endDate || noticeDate <= endDate);

        return (
            matchesSearch &&
            matchesStatus &&
            matchesCategory &&
            matchesDate
        );
    });
    console.log(notices);
    //export
    const handleExport = () => {
        const exportData = filteredNotices.map((notice) => ({
            ID: notice.id,
            Title: notice.title,
            Description: notice.description,
            Category: notice.category,
            PublishedBy: notice.author,
            Role: notice.role,
            PublishDate: notice.publishDate,
            PublishTime: notice.publishTime,
            Status: notice.status,
        }));

        exportToExcel(exportData, "Notices");
    };

    //duplicate
    const handleDuplicate = (notice) => {
        navigate("/notices/new-notice", {
            state: {
                duplicateNotice: {
                    ...notice,
                    id: null,
                    title: `${notice.title} (Copy)`,
                    status: "Scheduled",
                },
            },
        });

        setOpenMenuId(null);
    };

    // Edit Notice
    const handleEdit = (notice) => {
        navigate("/notices/new-notice", {
            state: {
                editNotice: notice,
            },
        });

        setOpenMenuId(null);
    };

    // Delete Notice
    const handleDelete = (notice) => {
        setSelectedNotice(notice);
        setShowDeleteModal(true);
        setOpenMenuId(null);
    };

    const confirmDelete = () => {
  const updatedNotices = notices.filter(
    (item) => item.id !== selectedNotice.id
  );

  dispatch(setNotices(updatedNotices));

  setShowDeleteModal(false);
  setSelectedNotice(null);
};

    console.log(notices);
    const itemsPerPage = 5;
    const {
        paginatedData,
        sortField,
        sortOrder,
        handleSort,
        currentPage,
        setCurrentPage,
        totalPages,
    } = useTable(filteredNotices, itemsPerPage);

    console.log(notices);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: "Dashboard", path: "/dashboard" },
                    { label: "Notices" },
                ]}
            />

            {/* Header */}
            <div className="flex justify-between items-start mt-2">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Notices
                    </h1>

                    <p className="text-gray-500 mb-6 mt-2">
                        Stay updated with the latest announcements and important information.
                    </p>
                </div>

                <button onClick={() => navigate("/notices/new-notice")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                    <i className="bi bi-plus-lg"></i> Create New Notice
                </button>
            </div>

            {/* Stats */}
            <StatsCards cards={stats} />

            {/* Filters */}
            <div className="bg-white mt-8 rounded-2xl border border-gray-200 p-5">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

                    {/* Search */}
                    <div className="xl:col-span-2 relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search notice by title or content..."
                            className="w-full border rounded-xl pl-4 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                    </div>
                    {/* Status */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border rounded-xl px-4 py-3 outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="Published">Published</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Expired">Expired</option>
                    </select>

                    {/* Category */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="border rounded-xl px-4 py-3 outline-none"
                    >
                        <option value="All">All Category</option>
                        <option value="General">General</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Parking">Parking</option>
                        <option value="Events">Events</option>
                    </select>

                    {/* Date */}
                    <div className="flex items-center border border-gray-300 rounded-xl px-3 bg-white">
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
                            className="w-56 py-3 outline-none border-none bg-transparent text-sm"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">

                        <button
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("All");
                                setCategoryFilter("All");
                                setStartDate(null);
                                setEndDate(null);
                                setCurrentPage(1);
                            }}
                            className="flex-1 border rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
                        >
                            <i className="bi bi-arrow-counterclockwise"></i>
                            Reset
                        </button>
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 border rounded-lg flex items-center gap-2"
                        >
                            <i className="bi bi-download"></i>
                            Export
                        </button>
                    </div>

                </div>

            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6">


                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <SortableHeader
                                    label="Notice"
                                    field="title"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-6 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Category"
                                    field="category"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-6 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Published By"
                                    field="author"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-6 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Date"
                                    field="publishDate"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-6 py-4 text-left"
                                />

                                <SortableHeader
                                    label="Status"
                                    field="status"
                                    sortField={sortField}
                                    sortOrder={sortOrder}
                                    handleSort={handleSort}
                                    className="px-6 py-4 text-left"
                                />

                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((notice) => {
                                console.log("ID:", notice.id);

                                return (
                                    <tr key={notice.id} className="border hover:bg-gray-50">
                                        {/* Notice */}
                                        <td className="px-6 py-5">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                    📢
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold">{notice.title}</h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {(notice.description || "").replace(/<[^>]*>/g, "")}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td>
                                            <span
                                                className={` items-center px-3 py-1 rounded-md text-xs font-semibold ${getStatusStyle(
                                                    notice.category
                                                )}`}
                                            >
                                                {notice.category}
                                            </span>
                                        </td>
                                        {/* Published By */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xl">
                                                    {(notice.author?.name || notice.author || "").charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="font-medium">
                                                        {notice.author?.name || notice.author}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {notice.author?.role || notice.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-5 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {notice.publishDate}
                                                </span>

                                                <span className="text-xs text-gray-500">
                                                    {notice.publishTime}
                                                </span>
                                            </div>
                                        </td>
                                        {/* Status */}
                                        <td className="px-6 py-5">
                                            <span
                                                className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusStyle(
                                                    notice.status
                                                )}`}
                                            >
                                                {notice.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-5 text-center">
                                            <ActionMenu
                                                noticeMenu={true}
                                                isOpen={openMenuId === notice.id}
                                                onToggle={() => {
                                                    console.log("Clicked:", notice.id);
                                                    setOpenMenuId(
                                                        openMenuId === notice.id ? null : notice.id
                                                    );
                                                }}
                                                onClose={() => setOpenMenuId(null)}
                                                onView={() => navigate(`/notices/view/${notice.id}`)}
                                                onEdit={() => handleEdit(notice)}
                                                onDuplicate={() => handleDuplicate(notice)}
                                                onDelete={() => handleDelete(notice)}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    totalItems={filteredNotices.length}
                    itemsPerPage={itemsPerPage}

                />
            </div>
            <DeleteModal
                show={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedNotice(null);
                }}
                onDelete={confirmDelete}
                title="Delete Notice"
                message="Are you sure you want to delete this notice ?"
            />
        </div>
    );
};

export default Notices;