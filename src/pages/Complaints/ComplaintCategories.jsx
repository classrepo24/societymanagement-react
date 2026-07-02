import React, { useState } from "react";
import { useComplaint } from "../../context/ComplaintContext";
import DeletePopup from "../../components/DeletePopup";
import Pagination from "../../components/Pagination";
import { useSorting } from "../../hooks/useSorting";
import StatsCard from "../../components/StatsCard";
import Breadcrumbs from "../../components/Breadcrumbs";
export function ComplaintCategories() {
  const [statusFilter, setStatusFilter] = useState("All");

  const { complaints, categories, setCategories } = useComplaint();

const cards = [
  {
    title: "Total Categories",
    value: categories.length,
    subtitle: "All Categories",
    icon: "bi-grid",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Categories",
    value: categories.filter((item) => item.status === "Active").length,
    subtitle: "Currently Active",
    icon: "bi-check-circle",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Inactive Categories",
    value: categories.filter((item) => item.status === "Inactive").length,
    subtitle: "Disabled Categories",
    icon: "bi-x-circle",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Total Complaints",
    value: complaints.length,
    subtitle: "Across All Categories",
    icon: "bi-chat-left-text",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [showModal, setShowModal] = useState(false);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "bi-folder",
    status: "Active",
  });

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  
  // Search
  let filteredCategories = categories.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(search.toLowerCase()),
  );

  // Status Filter
  if (statusFilter !== "All") {
    filteredCategories = filteredCategories.filter(
      (item) => item.status === statusFilter,
    );
  }

  // Sorting Hook
  const { sortedData, handleSort, renderSortIcon } =
    useSorting(filteredCategories);

  // Complaint Count
  const getComplaintCount = (name) => {
    return complaints.filter((item) => item.category === name).length;
  };

  // Pagination
  const itemsPerPage = 5;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentCategories = sortedData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  // Edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setEditData(item);
  };

  // Save
  const handleSave = () => {
    setCategories((prev) =>
      prev.map((item) => (item.id === editId ? editData : item)),
    );

    setEditId(null);
  };

 

  // Add Category
  const addCategory = () => {
    setCategories((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newCategory,
      },
    ]);

    setShowModal(false);

    setNewCategory({
      name: "",
      description: "",
      icon: "bi-folder",
      status: "Active",
    });
  };

  return (
    <div className="p-6 bg-[#f5f7fb] min-h-screen">
      <Breadcrumbs
  items={[
    { label: "Dashboard", path: "/dashboard" },
     { label: "Complaints", path: "/complaints" },
    { label: "Add Category", path: "/categories/add-category" },
  ]}
/>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl md:text-[33px] leading-none font-bold text-[#111827]">
            Complaint Categories
          </h1>

          <p className="text-gray-500 mt-2 text-[15px]">
            Manage and organize complaint categories.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl text-sm font-medium"
        >
          <i className="bi bi-plus-lg mr-2"></i>
          Add New Category
        </button>
      </div>

      {/* cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
  {cards.map((card, index) => (
    <StatsCard key={index} {...card} />
  ))}
</div>

           

      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search category by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl py-3 px-4 pr-12 outline-none focus:border-blue-500"
            />

            <i className="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Filter Button */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 px-4 py-3 rounded-xl"
          >
            <option value="All">FILTER</option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-sm font-semibold text-gray-700">
              <th
                onClick={() => handleSort("name")}
                className="p-4 text-left cursor-pointer"
              >
                <span className="inline-flex items-center">
                  Category {renderSortIcon("name")}
                </span>
              </th>

              <th
                onClick={() => handleSort("description")}
                className="p-4 text-left cursor-pointer"
              >
                <span className="inline-flex items-center">
                  Description {renderSortIcon("description")}
                </span>
              </th>

              <th
                onClick={() => handleSort("complaints")}
                className="p-4 text-left cursor-pointer"
              >
                <span className="inline-flex items-center">
                  Total Complaints {renderSortIcon("complaints")}
                </span>
              </th>

              <th
                onClick={() => handleSort("status")}
                className="p-4 text-left cursor-pointer"
              >
                <span className="inline-flex items-center">
                  Status {renderSortIcon("status")}
                </span>
              </th>

              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${item.color}20`,
                      }}
                    >
                      <i
                        className={`bi ${item.icon}`}
                        style={{
                          color: item.color,
                        }}
                      ></i>
                    </div>

                    {editId === item.id ? (
                      <input
                        className="border rounded px-2 py-1"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            name: e.target.value,
                          })
                        }
                      />
                    ) : (
                      item.name
                    )}
                  </div>
                </td>

                <td className="p-4">
                  {editId === item.id ? (
                    <input
                      className="border rounded px-2 py-1 w-full"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    item.description
                  )}
                </td>

                <td className="p-4">{getComplaintCount(item.name)}</td>

                <td className="p-4">
                  {editId === item.id ? (
                    <select
                      className="border rounded px-2 py-1"
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {editId === item.id ? (
                      <button onClick={handleSave} className="text-green-600">
                        <i className="bi bi-check-lg"></i>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setSelectedId(item.id);
                        setDeleteModal(true);
                      }}
                      className="text-red-600"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
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
        totalItems={sortedData.length}
        itemName="complaints"
        indexOfFirst={(currentPage - 1) * itemsPerPage}
        indexOfLast={currentPage * itemsPerPage}
        setCurrentPage={setCurrentPage}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[500px]">
            <h3 className="font-bold text-lg mb-4">Add Category</h3>

            {/* CATEGORY NAME */}
            <input
              placeholder="Category Name *"
              className="w-full border p-2 rounded mb-1"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                })
              }
            />
            {!newCategory.name && (
              <p className="text-red-500 text-xs mb-2">
                Category name is required
              </p>
            )}

            {/* DESCRIPTION */}
            <textarea
              placeholder="Description *"
              className="w-full border p-2 rounded mb-1"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  description: e.target.value,
                })
              }
            />
            {!newCategory.description && (
              <p className="text-red-500 text-xs mb-2">
                Description is required
              </p>
            )}

            {/* ICON SELECT (FIXED UX) */}
            <select
              className="w-full border p-2 rounded mb-3"
              value={newCategory.icon}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  icon: e.target.value,
                })
              }
            >
              <option value="">Select Icon *</option>
              <option value="bi-droplet-fill">Water</option>
              <option value="bi-lightning-charge-fill">Electricity</option>
              <option value="bi-trash3-fill">Cleaning</option>
              <option value="bi-shield-lock-fill">Security</option>
              <option value="bi-tools">Maintenance</option>
            </select>

            {!newCategory.icon && (
              <p className="text-red-500 text-xs mb-3">Please select an icon</p>
            )}

            {/* BUTTONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={addCategory}
                disabled={
                  !newCategory.name ||
                  !newCategory.description ||
                  !newCategory.icon
                }
                className={`px-4 py-2 rounded text-white ${
                  !newCategory.name ||
                  !newCategory.description ||
                  !newCategory.icon
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      <DeletePopup
        isOpen={deleteModal}
        title="Delete Categories"
        message="Are you sure you want to delete this category?"
        onCancel={() => setDeleteModal(null)}
        onConfirm={() => {
          setCategories((prev) => prev.filter((c) => c.id !== deleteModal.id));

          setDeleteModal(null);
        }}
      />
    </div>
  );
}
