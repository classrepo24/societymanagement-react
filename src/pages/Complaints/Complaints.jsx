import React, { useState } from "react";
import { CategoryChart } from "./CategoryChart";
import { StatusChart } from "./StatusChart";
import { RecentComplaints } from "./RecentComplaints";
import { NavLink } from "react-router-dom";
import { useComplaint } from "../../context/ComplaintContext";

import { useNavigate } from "react-router-dom";

import DeletePopup from "../../components/DeletePopup";
import Pagination from "../../components/Pagination";

import { useSorting } from "../../hooks/useSorting";
import StatsCard from "../../components/StatsCard";

// STYLE FUNCTIONS
const getCategoryStyle = (cat) => {
  switch (cat) {
    case "Plumbing":
      return "text-blue-600 bg-blue-50";

    case "Electrical":
      return "text-amber-600 bg-amber-50";

    case "Lift Issue":
      return "text-violet-600 bg-violet-50";

    case "Housekeeping":
      return "text-emerald-600 bg-emerald-50";

    case "Parking":
      return "text-red-600 bg-red-50";

    case "Carpentry":
      return "text-orange-700 bg-orange-50";

    case "Security":
      return "text-cyan-600 bg-cyan-50";

    case "Amenities":
      return "text-pink-600 bg-pink-50";

    case "Pest Control":
      return "text-lime-600 bg-lime-50";

    case "Others":
      return "text-slate-600 bg-slate-50";

    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getPriorityStyle = (p) => {
  switch (p) {
    case "High":
      return "text-red-600 bg-red-50";
    case "Medium":
      return "text-orange-600 bg-orange-50";
    case "Low":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

const getStatusStyle = (s) => {
  switch (s) {
    case "Open":
      return "text-red-600 bg-red-50";
    case "In Progress":
      return "text-blue-600 bg-blue-50";
    case "Resolved":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export const Complaints = () => {
  const { complaints, setComplaints } = useComplaint();



  const cards = [
  {
    title: "Total Complaints",
    value: complaints.length,
    subtitle: "All Complaints",
    icon: "bi-chat-left-text",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Open",
    value: complaints.filter(c => c.status === "Open").length,
    subtitle: "Pending Review",
    icon: "bi-exclamation-circle",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "In Progress",
    value: complaints.filter(c => c.status === "In Progress").length,
    subtitle: "Being Resolved",
    icon: "bi-arrow-repeat",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Resolved",
    value: complaints.filter(c => c.status === "Resolved").length,
    subtitle: "Completed",
    icon: "bi-check-circle",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

  const generateId = () => {
    const year = new Date().getFullYear();

    const nextNumber = complaints.length + 1;

    return `CMP-${year}-${String(nextNumber).padStart(3, "0")}`;
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [openMenu, setOpenMenu] = useState(null);

  const [activeTab, setActiveTab] = useState("All");

  const [selectedDate, setSelectedDate] = useState("");

  const [deleteId, setDeleteId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    raisedBy: "",
    flatNo: "",
    priority: "Low",
    status: "Open",
    raisedOn: "",
  });
  const [errors, setErrors] = useState({});

  let filteredComplaints = complaints || [];

  // Status filter
  if (activeTab !== "All") {
    filteredComplaints = filteredComplaints.filter(
      (item) => item.status === activeTab,
    );
  }

  // Date filter
  if (selectedDate) {
    filteredComplaints = filteredComplaints.filter(
      (item) => item.raisedOn === selectedDate,
    );
  }

  // Category filter
  if (selectedCategory !== "All") {
    filteredComplaints = filteredComplaints.filter(
      (item) => item.category === selectedCategory,
    );
  }

  // sorting

  const { sortedData, handleSort, renderSortIcon } =
    useSorting(filteredComplaints);

  // Pagination (ALWAYS AFTER SORTING)

  const itemsPerPage = 8;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentComplaints = sortedData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    const formatted = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1),
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setUploadedFiles((prev) => [...prev, ...formatted]);
  };

  // const deleteFile = (id) => {
  //   setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  // };

  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 bg-[#fbfbfe] w-full">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6 overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold">Complaint Management</h1>
          <p className="text-gray-500 mt-1">
            Track, manage and resolve complaints raised by residents.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <NavLink
            to="/complaints/settings"
            className="px-4 py-2 bg-white rounded-lg flex items-center gap-2 text-sm hover:bg-gray-100"
          >
            <i className="bi bi-gear-fill"></i>
            Complaint Settings
          </NavLink>

          <button
            onClick={() => navigate("/complaints/raise")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
          >
            <i className="bi bi-plus-lg"></i>
            New Complaint
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col xl:flex-row gap-6 w-full min-h-[calc(100vh-120px)] min-w-0">
        {/* LEFT */}
        <div className="flex-1 min-w-0 overflow-x-auto flex flex-col gap-6">


          {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
  {cards.map((card, index) => (
    <StatsCard key={index} {...card} />
  ))}
</div>

          {/* TABLE */}
          <div className="flex-1 bg-white p-4 rounded-xl shadow overflow-y-auto flex flex-col">
            {" "}
            {/* TABS */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="font-semibold flex gap-6 border-b overflow-x-auto overflow-y-auto whitespace-nowrap">
                {["All", "Open", "In Progress", "Resolved", "Overdue"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);

                        if (tab === "All") {
                          setSelectedCategory("All");
                          setSelectedDate("");
                        }
                      }}
                      className={`pb-2 text-sm transition ${
                        tab === "All"
                          ? activeTab === "All" &&
                            selectedCategory === "All" &&
                            !selectedDate
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                          : activeTab === tab
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {/* filter buttion */}
                <div className="relative inline-block">
                  <div className="flex items-center border px-3 py-1 rounded-lg gap-2 bg-white">
                    {/* Funnel Icon */}
                    <i className="bi bi-funnel"></i>

                    {/* Dropdown */}
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="outline-none bg-transparent text-sm"
                    >
                      <option value="All">All Categories</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Water">Water</option>
                      <option value="Cleaning">Cleaning</option>
                    </select>
                  </div>
                </div>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border px-3 py-1 rounded-lg"
                />
              </div>
            </div>
            {/* TABLE */}
            <div className="flex-1  bg-white flex flex-col">
              <div className="w-full overflow-x-auto   ">
                <table className="min-w-[1000px] w-max">
                  <thead>
                    <tr className="bg-[#fbfbfe] border-gray-200">
                      <th
                        onClick={() => handleSort("id")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Complaint Id {renderSortIcon("id")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("category")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Category {renderSortIcon("category")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("title")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Title {renderSortIcon("title")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("raisedBy")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Raised By {renderSortIcon("raisedBy")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("flatNo")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Flat No {renderSortIcon("flatNo")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("priority")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Priority {renderSortIcon("priority")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("status")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Status {renderSortIcon("status")}
                        </span>
                      </th>

                      <th
                        onClick={() => handleSort("raisedOn")}
                        className="px-4 py-3 cursor-pointer"
                      >
                        <span className="inline-flex items-center">
                          Raised On {renderSortIcon("raisedOn")}
                        </span>
                      </th>

                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentComplaints.map((item, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        {/* ID */}
                        <td className="px-4 py-3">{item.id}</td>

                        {/* Category */}
                        <td className="px-4 py-3">
                          {item.isEditing ? (
                            <input
                              value={item.category}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, category: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(item.category)}`}
                            >
                              {item.category}
                            </span>
                          )}
                        </td>

                        {/* Title */}
                        <td className="px-4 py-3">
                          {item.isEditing ? (
                            <input
                              value={item.title}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, title: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            item.title
                          )}
                        </td>

                        {/* Raised By */}
                        <td className="px-4 py-3 flex items-center gap-2">
                          <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-blue-50 text-dark flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {item.raisedBy ? item.raisedBy[0] : "U"}
                          </div>

                          {item.isEditing ? (
                            <input
                              value={item.raisedBy}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, raisedBy: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            item.raisedBy
                          )}
                        </td>

                        {/* Flat No */}
                        <td className="px-4 py-3">
                          {item.isEditing ? (
                            <input
                              value={item.flatNo}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, flatNo: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            item.flatNo
                          )}
                        </td>

                        {/* Priority */}
                        <td className="px-4 py-3">
                          {item.isEditing ? (
                            <select
                              value={item.priority}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, priority: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            >
                              <option>High</option>
                              <option>Medium</option>
                              <option>Low</option>
                            </select>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${getPriorityStyle(item.priority)}`}
                            >
                              {item.priority}
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          {item.isEditing ? (
                            <select
                              value={item.status}
                              onChange={(e) => {
                                const value = e.target.value;
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index ? { ...c, status: value } : c,
                                  ),
                                );
                              }}
                              className="border px-2 py-1 rounded w-full"
                            >
                              <option>Open</option>
                              <option>In Progress</option>
                              <option>Resolved</option>
                              <option>Overdue</option>
                            </select>
                          ) : (
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(item.status)}`}
                            >
                              {item.status}
                            </span>
                          )}
                        </td>

                        {/* Date */}
                        <td className="px-4 py-3">{item.raisedOn}</td>

                        {/* ACTIONS */}

                        <td className="px-4 py-3 text-center relative">
                          {/* EDIT MODE → SHOW SAVE */}
                          {item.isEditing ? (
                            <button
                              onClick={() => {
                                setComplaints((prev) =>
                                  prev.map((c, i) =>
                                    i === index
                                      ? { ...c, isEditing: false }
                                      : c,
                                  ),
                                );
                                setOpenMenu(null);
                              }}
                              className="px-3 py-1 bg-green-500 text-white rounded"
                            >
                              Save
                            </button>
                          ) : (
                            <>
                              {/* 3 DOT BUTTON */}
                              <button
                                onClick={() =>
                                  setOpenMenu(openMenu === index ? null : index)
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-md border hover:bg-gray-100"
                              >
                                ⋮
                              </button>

                              {/* DROPDOWN */}
                              {openMenu === index && (
                                <div className="absolute right-4 mt-1 w-32 bg-white border rounded-lg shadow-lg z-20">
                                  {/* EDIT */}
                                  <button
                                    onClick={() => {
                                      setComplaints((prev) =>
                                        prev.map((c, i) =>
                                          i === index
                                            ? { ...c, isEditing: true }
                                            : c,
                                        ),
                                      );
                                      setOpenMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                  >
                                    Edit
                                  </button>

                                  {/* DELETE */}
                                  <button
                                    onClick={() => {
                                      setDeleteId(item);
                                      setOpenMenu(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={sortedData.length}
                  itemName="complaints "
                  indexOfFirst={indexOfFirst}
                  indexOfLast={indexOfLast}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="w-[340px] flex-shrink-0 space-y-5">
          <div className="w-full bg-white border border-gray-200 rounded-xl p-4">
            <CategoryChart />
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-xl p-4">
            <StatusChart />
          </div>

          <div className="w-full bg-white border border-gray-200 rounded-xl p-4">
            <RecentComplaints />
          </div>
        </div>
      </div>

      {/* delete */}
      <DeletePopup
        isOpen={deleteId}
        title="Delete Complaint"
        message="Are you sure you want to delete this complaint?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          setComplaints((prev) => prev.filter((c) => c.id !== deleteId.id));
          setDeleteId(null);
        }}
      />

      {/* new complaints */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-6 rounded-xl shadow-lg">
            {/* HEADER */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-semibold">Create New Complaint</h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setErrors({});
                }}
                className="text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </div>

            {/* FORM */}
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();

                let err = {};

                if (!formData.category) err.category = "Please select category";
                if (!formData.title) err.title = "Please enter title";
                if (!formData.raisedBy) err.raisedBy = "Please enter raised by";
                if (!formData.flatNo) err.flatNo = "Please enter flat no";
                if (!formData.raisedOn) err.raisedOn = "Please select date";

                setErrors(err);

                if (Object.keys(err).length > 0) return;

                const newComplaint = {
                  id: generateId(),
                  ...formData,
                };

                setComplaints((prev) => [newComplaint, ...prev]);

                setFormData({
                  category: "",
                  title: "",
                  raisedBy: "",
                  flatNo: "",
                  priority: "Low",
                  status: "Open",
                  raisedOn: "",
                });

                setErrors({});
                setIsOpen(false);
              }}
            >
              {/* CATEGORY */}
              <div>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Category</option>
                  <option>Plumbing</option>
                  <option>Electricity</option>
                  <option>Water</option>
                  <option>Cleaning</option>
                  <option>Security</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs">{errors.category}</p>
                )}
              </div>

              {/* TITLE */}
              <div>
                <input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Title"
                  className="w-full border p-2 rounded"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title}</p>
                )}
              </div>

              {/* RAISED BY */}
              <div>
                <input
                  value={formData.raisedBy}
                  onChange={(e) =>
                    setFormData({ ...formData, raisedBy: e.target.value })
                  }
                  placeholder="Raised By"
                  className="w-full border p-2 rounded"
                />
                {errors.raisedBy && (
                  <p className="text-red-500 text-xs">{errors.raisedBy}</p>
                )}
              </div>

              {/* FLAT NO */}
              <div>
                <input
                  value={formData.flatNo}
                  onChange={(e) =>
                    setFormData({ ...formData, flatNo: e.target.value })
                  }
                  placeholder="Flat No"
                  className="w-full border p-2 rounded"
                />
                {errors.flatNo && (
                  <p className="text-red-500 text-xs">{errors.flatNo}</p>
                )}
              </div>

              {/* PRIORITY */}
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
                className="w-full border p-2 rounded"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              {/* DATE */}
              <div>
                <input
                  type="date"
                  value={formData.raisedOn}
                  onChange={(e) =>
                    setFormData({ ...formData, raisedOn: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
                {errors.raisedOn && (
                  <p className="text-red-500 text-xs">{errors.raisedOn}</p>
                )}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setErrors({});
                  }}
                  className="w-1/2 border py-2 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Save Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
