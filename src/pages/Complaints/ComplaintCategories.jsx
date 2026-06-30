import React, { useState } from "react";
import { useComplaint } from "../../context/ComplaintContext";

export function ComplaintCategories() {


    const [statusFilter, setStatusFilter] = useState("All");

    
  const { complaints, categories, setCategories } = useComplaint();

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


  const totalCategories = categories.length;

const activeCategories = categories.filter(
  (c) => c.status === "Active"
).length;

const inactiveCategories = categories.filter(
  (c) => c.status === "Inactive"
).length;

const totalComplaints = complaints.length;
let filteredCategories = categories.filter(
  (item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.description || "")
      .toLowerCase()
      .includes(search.toLowerCase())
);

if (statusFilter !== "All") {
  filteredCategories = filteredCategories.filter(
    (item) => item.status === statusFilter
  );
}

const [sortField, setSortField] = useState("name");
const [sortOrder, setSortOrder] = useState("asc");

const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};

const getComplaintCount = (name) => {
  return complaints.filter(
    (item) => item.category === name
  ).length;
};

const sortedCategories = [...filteredCategories].sort((a, b) => {
  let valueA;
  let valueB;

  if (sortField === "complaints") {
    valueA = getComplaintCount(a.name);
    valueB = getComplaintCount(b.name);
  } else {
    valueA = a[sortField];
    valueB = b[sortField];
  }

  if (typeof valueA === "string") {
    valueA = valueA.toLowerCase();
    valueB = valueB.toLowerCase();
  }

  if (sortOrder === "asc") {
    return valueA > valueB ? 1 : -1;
  }

  return valueA < valueB ? 1 : -1;
});

const itemsPerPage = 5;

const indexOfLast = currentPage * itemsPerPage;
const indexOfFirst = indexOfLast - itemsPerPage;

const currentCategories = sortedCategories.slice(
  indexOfFirst,
  indexOfLast
);

const totalPages = Math.ceil(
  sortedCategories.length / itemsPerPage
);

const handleEdit = (item) => {
  setEditId(item.id);
  setEditData(item);
};

const handleSave = () => {
  setCategories((prev) =>
    prev.map((item) =>
      item.id === editId ? editData : item
    )
  );

  setEditId(null);
};

const handleDelete = () => {
  setCategories((prev) =>
    prev.filter((item) => item.id !== selectedId)
  );

  setDeleteModal(false);
};

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
className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-3 rounded-xl text-sm font-medium"  >
    <i className="bi bi-plus-lg mr-2"></i>
    Add New Category
  </button>

</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">

  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="flex items-center gap-4">

      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
        <i className="bi bi-tags text-2xl text-blue-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Total Categories
        </p>

        <h2 className="text-4xl font-bold mt-1">
          {totalCategories}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          All categories
        </p>
      </div>

    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="flex items-center gap-4">

      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <i className="bi bi-card-checklist text-2xl text-green-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Active Categories
        </p>

        <h2 className="text-4xl font-bold mt-1">
          {activeCategories}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Currently active
        </p>
      </div>

    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="flex items-center gap-4">

      <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
        <i className="bi bi-archive text-2xl text-orange-500"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Inactive Categories
        </p>

        <h2 className="text-4xl font-bold mt-1">
          {inactiveCategories}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Currently inactive
        </p>
      </div>

    </div>
  </div>

  <div className="bg-white rounded-2xl p-6 border border-gray-100">
    <div className="flex items-center gap-4">

      <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
        <i className="bi bi-grid text-2xl text-purple-600"></i>
      </div>

      <div>
        <p className="text-sm text-gray-500">
          Total Complaints
        </p>

        <h2 className="text-4xl font-bold mt-1">
          {totalComplaints}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          All time
        </p>
      </div>

    </div>
  </div>

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
><option value="All">FILTER</option>
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
  <div className="flex items-center gap-2">
    Category

    <span className="flex flex-col leading-none">
      <i
        className={`bi bi-caret-up-fill text-[10px] ${
          sortField === "name" && sortOrder === "asc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>

      <i
        className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
          sortField === "name" && sortOrder === "desc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>
    </span>
  </div>
</th>

   <th
  onClick={() => handleSort("description")}
  className="cursor-pointer"
>
  <div className="flex items-center gap-2">
    Description

    <span className="flex flex-col leading-none">
      <i className={`bi bi-caret-up-fill text-[10px] ${
        sortField === "description" && sortOrder === "asc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />

      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
        sortField === "description" && sortOrder === "desc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />
    </span>
  </div>
</th>

    <th
  onClick={() => handleSort("complaints")}
  className="cursor-pointer"
>
  <div className="flex items-center gap-2">
    Total Complaints

    <span className="flex flex-col leading-none">
      <i className={`bi bi-caret-up-fill text-[10px] ${
        sortField === "complaints" && sortOrder === "asc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />

      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
        sortField === "complaints" && sortOrder === "desc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />
    </span>
  </div>
</th>

   <th
  onClick={() => handleSort("status")}
  className="cursor-pointer"
>
  <div className="flex items-center gap-2">
    Status

    <span className="flex flex-col leading-none">
      <i className={`bi bi-caret-up-fill text-[10px] ${
        sortField === "status" && sortOrder === "asc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />

      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
        sortField === "status" && sortOrder === "desc"
          ? "text-blue-600"
          : "text-gray-300"
      }`} />
    </span>
  </div>
</th>

    <th className="text-center">
      Actions
    </th>

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

      <td className="p-4">
        {getComplaintCount(item.name)}
      </td>

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
            <button
              onClick={handleSave}
              className="text-green-600"
            >
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
<div className="flex flex-col md:flex-row justify-between items-center mt-5 gap-3">

  <p className="text-sm text-gray-500">
    Showing {indexOfFirst + 1} to{" "}
    {Math.min(indexOfLast, filteredCategories.length)} of{" "}
    {filteredCategories.length} categories
  </p>

  <div className="flex items-center gap-2">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="w-10 h-10 border rounded-lg disabled:opacity-50"
    >
      <i className="bi bi-chevron-left"></i>
    </button>

    <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium">
      {currentPage}
    </div>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="w-10 h-10 border rounded-lg disabled:opacity-50"
    >
      <i className="bi bi-chevron-right"></i>
    </button>

  </div>
</div>


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
        <p className="text-red-500 text-xs mb-3">
          Please select an icon
        </p>
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

{deleteModal && (
<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[400px]">

<h3 className="font-bold text-lg">
Delete Category
</h3>

<p className="text-gray-500 mt-2">
Are you sure you want to delete this category?
</p>

<div className="flex justify-end gap-2 mt-5">

<button
onClick={()=>setDeleteModal(false)}
className="border px-4 py-2 rounded"
>
Cancel
</button>

<button
onClick={handleDelete}
className="bg-red-600 text-white px-4 py-2 rounded"
>
Delete
</button>

</div>

</div>
</div>
)}

</div>

);
}