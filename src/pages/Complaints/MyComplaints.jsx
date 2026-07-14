import React, { useState } from "react";

import { useComplaint } from "../../context/ComplaintContext";

import { useNavigate } from "react-router-dom";
import DeletePopup from "../../components/DeletePopup";
import Pagination from "../../components/Pagination";
import { useSorting } from "../../hooks/useSorting";
import StatsCard from "../../components/StatsCard";

import Breadcrumbs from "../../components/Breadcrumbs";

export const MyComplaints = () => {
  const { complaints, setComplaints } = useComplaint();


  const cards = [
  {
    title: "Total Complaints",
    value: complaints.length,
    subtitle: "All complaints registered",
    icon: "bi-file-earmark-text",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Open",
    value: complaints.filter((item) => item.status === "Open").length,
    subtitle: "Awaiting action",
    icon: "bi-clock-history",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "In Progress",
    value: complaints.filter((item) => item.status === "In Progress").length,
    subtitle: "Being worked on",
    icon: "bi-arrow-repeat",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Resolved",
    value: complaints.filter((item) => item.status === "Resolved").length,
    subtitle: "Successfully fixed",
    icon: "bi-check-circle",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Overdue",
    value: complaints.filter((item) => item.status === "Overdue").length,
    subtitle: "Need immediate action",
    icon: "bi-exclamation-circle",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({});

  const [actionMenu, setActionMenu] = useState(null);

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const statuses = ["All", "Open", "In Progress", "Resolved", "Overdue"];

  const categories = [
    "All",
    ...new Set(complaints.map((item) => item.category)),
  ];

  //  EDIT

  const handleEdit = (complaint) => {
    setEditingId(complaint.id);

    setEditData({
      ...complaint,
    });

    setActionMenu(null);
  };

  //  CANCEL

  const handleCancel = () => {
    setEditingId(null);

    setEditData({});
  };

  //  SAVE

  const handleSave = () => {
    setComplaints((prev) =>
      prev.map((item) => (item.id === editingId ? editData : item)),
    );

    setEditingId(null);
    setEditData({});
    setActionMenu(null);
  };



  let filteredComplaints = [...complaints];

  // Search
  if (search) {
    filteredComplaints = filteredComplaints.filter(
      (item) =>
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Status Filter
  if (statusFilter !== "All") {
    filteredComplaints = filteredComplaints.filter(
      (item) => item.status === statusFilter,
    );
  }

  // Category Filter
  if (categoryFilter !== "All") {
    filteredComplaints = filteredComplaints.filter(
      (item) => item.category === categoryFilter,
    );
  }

  const {
    sortedData: sortedComplaints,
    handleSort,
    renderSortIcon,
  } = useSorting(filteredComplaints);

  // pagination
  const itemsPerPage = 6;

  const totalPages = Math.ceil(sortedComplaints.length / itemsPerPage);

  const currentComplaints = sortedComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
       <Breadcrumbs
  items={[
    { label: "Dashboard", path: "/dashboard" },
    { label: "Complaints", path: "/complaints" },
    { label: "My Complaints", path: "/complaints/my-complaints" },
  ]}
/>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
         

      {/* Page Content */}
    
        <div>
          <h1 className="text-2xl md:text-[36px] font-bold text-[#0F172A] mt-1">
            My Complaints
          </h1>

          <p className="text-gray-500 mt-1">
            Track and manage all the complaints you have raised.
          </p>
        </div>

        <button
          onClick={() => navigate("/complaints/raise")}
          className="w-full sm:w-auto justify-center px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
        >
          <i className="bi bi-plus-lg"></i>
          New Complaint
        </button>
      </div>

     
      {/* Cards */}
{/* Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
  {cards.map((card, index) => (
    <StatsCard key={index} {...card} />
  ))}
</div>


      {/* Search & Filters */}

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Search */}

          <div className="relative flex-1">
            <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              placeholder="Search by Complaint ID, Title or Category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-12 rounded-xl border border-gray-300 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-52 h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500 bg-white"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Category */}

          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full lg:w-56 h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-blue-500 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Filter Button */}

          <button className="h-12 px-6 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-2 font-medium">
            <i className="bi bi-funnel"></i>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b">
              <tr className="text-left text-sm text-gray-600">
                {/* Complaint ID */}

                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Complaint ID {renderSortIcon("id")}
                  </span>
                </th>

                {/* Category */}

                <th
                  onClick={() => handleSort("category")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Category {renderSortIcon("category")}
                  </span>
                </th>

                <th
                  onClick={() => handleSort("title")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Title {renderSortIcon("title")}
                  </span>
                </th>

                <th
                  onClick={() => handleSort("priority")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Priority {renderSortIcon("priority")}
                  </span>
                </th>

                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Status {renderSortIcon("status")}
                  </span>
                </th>

                <th
                  onClick={() => handleSort("raisedOn")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Raised On {renderSortIcon("raisedOn")}
                  </span>
                </th>

                <th
                  onClick={() => handleSort("updatedOn")}
                  className="px-6 py-4 cursor-pointer"
                >
                  <span className="inline-flex items-center">
                    Last Updated {renderSortIcon("updatedOn")}
                  </span>
                </th>

                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentComplaints.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Complaint ID */}

                  <td className="px-6 py-5">
                    <span className="font-semibold text-[#2563EB]">
                      {item.id}
                    </span>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: `${item.categoryColor}20`,
                        }}
                      >
                        <i
                          className={`bi ${item.categoryIcon}`}
                          style={{
                            color: item.categoryColor,
                          }}
                        ></i>
                      </div>

                      <span className="font-medium text-gray-700">
                        {item.category}
                      </span>
                    </div>
                  </td>

                  {/* Title */}

                  {/* Title */}
                  <td className="px-6 py-5 min-w-[260px]">
                    {editingId === item.id ? (
                      <input
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </>
                    )}
                  </td>

                  {/* Priority */}

                  <td className="px-6 py-5">
                    {editingId === item.id ? (
                      <select
                        value={editData.priority}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            priority: e.target.value,
                          })
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        item.priority === "High"
          ? "bg-red-100 text-red-600"
          : item.priority === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700"
      }`}
                      >
                        {item.priority}
                      </span>
                    )}
                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">
                    {editingId === item.id ? (
                      <select
                        value={editData.status}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            status: e.target.value,
                          })
                        }
                        className="border rounded-lg px-3 py-2"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Overdue</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        item.status === "Open"
          ? "bg-red-100 text-red-600"
          : item.status === "In Progress"
            ? "bg-yellow-100 text-yellow-700"
            : item.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
      }`}
                      >
                        {item.status}
                      </span>
                    )}
                  </td>

                  {/* Raised On */}

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.raisedOn}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.raisedTime}
                      </p>
                    </div>
                  </td>

                  {/* last update */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.updatedOn}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.updatedTime}
                      </p>
                    </div>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5 relative">
                    {editingId === item.id ? (
                      <div className="flex items-center justify-center gap-2">
                        {/* Save */}

                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition"
                        >
                          <i className="bi bi-check-lg"></i>
                          Save
                        </button>

                        {/* Cancel */}

                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 transition"
                        >
                          <i className="bi bi-x-lg"></i>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        {/* Menu */}

                        <div className="relative">
                          <button
                            onClick={() =>
                              setActionMenu(
                                actionMenu === item.id ? null : item.id,
                              )
                            }
                            className="w-10 h-10 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
                          >
                            <i className="bi bi-three-dots-vertical"></i>
                          </button>

                          {actionMenu === item.id && (
                            <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                              <button
                                onClick={() => handleEdit(item)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition"
                              >
                                <i className="bi bi-pencil-square text-blue-600"></i>
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => {
                                  setSelectedId(item.id);
                                  setDeleteModal(true);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition border-t"
                              >
                                <i className="bi bi-trash text-red-600"></i>
                                <span className="text-red-600">Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedComplaints.length}
          itemName="complaints"
          indexOfFirst={(currentPage - 1) * itemsPerPage}
          indexOfLast={Math.min(
            currentPage * itemsPerPage,
            filteredComplaints.length,
          )}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <DeletePopup
        isOpen={deleteModal}
        title="Delete Complaint"
        message="Are you sure you want to delete this complaint?"
        onCancel={() => {
          setDeleteModal(false);
          setSelectedId(null);
        }}
        onConfirm={() => {
          setComplaints((prev) => prev.filter((c) => c.id !== selectedId));

          setDeleteModal(false);
          setSelectedId(null);
        }}
      />
    </div>
  );
};
