
import React, { useState } from "react";

import { useComplaint } from "../../context/ComplaintContext";

import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";


 export const MyComplaints = () => {

  const { complaints, setComplaints } = useComplaint();


const [deleteModal, setDeleteModal] = useState(false);
const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");



const { openModal, closeModal } = useModal();

const [selectedComplaint, setSelectedComplaint] = useState(null);

const [editingId, setEditingId] = useState(null);

const [editData, setEditData] = useState({});

const [actionMenu, setActionMenu] = useState(null);
const navigate = useNavigate();




  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const categories = [
  "All",
  ...new Set(complaints.map((item) => item.category)),
];

const statuses = [
  "All",
  ...new Set(complaints.map((item) => item.status)),
];

const handleSort = (key) => {

  let direction = "asc";

  if (
    sortConfig.key === key &&
    sortConfig.direction === "asc"
  ) {
    direction = "desc";
  }

  setSortConfig({
    key,
    direction,
  });

};   



//  VIEW 

const handleView = (complaint) => {

    setSelectedComplaint(complaint);

};


//  EDIT 

const handleEdit = (complaint) => {

    setEditingId(complaint.id);

    setEditData({
        ...complaint
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

    setComplaints(prev =>
        prev.map(item =>
            item.id === editingId ? editData : item
        )
    );

    setEditingId(null);
    setEditData({});
    setActionMenu(null);
};


//  DELETE 

const handleDelete = () => {
  setComplaints((prev) =>
    prev.filter((item) => item.id !== selectedId)
  );

  setDeleteModal(false);
  setSelectedId(null);
};



let filteredComplaints = [...complaints];

// Search
if (search) {
  filteredComplaints = filteredComplaints.filter(
    (item) =>
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );
}

// Status Filter
if (statusFilter !== "All") {
  filteredComplaints = filteredComplaints.filter(
    (item) => item.status === statusFilter
  );
}

// Category Filter
if (categoryFilter !== "All") {
  filteredComplaints = filteredComplaints.filter(
    (item) => item.category === categoryFilter
  );
}


  // Sorting

  if (sortConfig.key) {
  filteredComplaints.sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue)
      return sortConfig.direction === "asc" ? -1 : 1;

    if (aValue > bValue)
      return sortConfig.direction === "asc" ? 1 : -1;

    return 0;
  });
}
  



const totalPages = Math.ceil(
  filteredComplaints.length / itemsPerPage
);

const currentComplaints = filteredComplaints.slice(

  (currentPage - 1) * itemsPerPage,

  currentPage * itemsPerPage

);
  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">

      
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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

      {/* cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">

  {/* Total Complaints */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-file-earmark-text text-blue-600 text-xl"></i>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Total Complaints
        </p>

        <h2 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
          {complaints.length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          All complaints registered
        </p>
      </div>
    </div>
  </div>

  {/* Open */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-clock-history text-orange-600 text-xl"></i>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Open
        </p>

        <h2 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
          {complaints.filter(item => item.status === "Open").length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          Awaiting action
        </p>
      </div>
    </div>
  </div>

  {/* In Progress */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-arrow-repeat text-yellow-600 text-xl"></i>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          In Progress
        </p>

        <h2 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
          {complaints.filter(item => item.status === "In Progress").length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          Being worked on
        </p>
      </div>
    </div>
  </div>

  {/* Resolved */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-check-circle text-green-600 text-xl"></i>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Resolved
        </p>

        <h2 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
          {complaints.filter(item => item.status === "Resolved").length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          Successfully fixed
        </p>
      </div>
    </div>
  </div>

  {/* Overdue */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
        <i className="bi bi-exclamation-circle text-red-600 text-xl"></i>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">
          Overdue
        </p>

        <h2 className="text-[28px] font-bold text-gray-900 mt-1 leading-none">
          {complaints.filter(item => item.status === "Overdue").length}
        </h2>

        <p className="text-xs text-gray-400 mt-2">
          Need immediate action
        </p>
      </div>
    </div>
  </div>

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

              <option
                key={status}
                value={status}
              >
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

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))}

          </select>

          {/* Filter Button */}

          <button
            className="h-12 px-6 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center gap-2 font-medium"
          >

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
                  className="px-6 py-4 cursor-pointer select-none"
                >

                  <div className="flex items-center gap-2">

                    Complaint ID

                    <div className="flex flex-col leading-none">

                      <i
                        className={`bi bi-caret-up-fill text-[10px] ${
                          sortConfig.key === "id" &&
                          sortConfig.direction === "asc"
                            ? "text-blue-600"
                            : "text-gray-300"
                        }`}
                      ></i>

                      <i
                        className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
                          sortConfig.key === "id" &&
                          sortConfig.direction === "desc"
                            ? "text-blue-600"
                            : "text-gray-300"
                        }`}
                      ></i>

                    </div>

                  </div>

                </th>

                {/* Category */}

                <th
                  onClick={() => handleSort("category")}
                  className="px-6 py-4 cursor-pointer"
                >

                  <div className="flex items-center gap-2">

                    Category

                    <div className="flex flex-col leading-none">

                      <i className={`bi bi-caret-up-fill text-[10px] ${
                        sortConfig.key==="category" && sortConfig.direction==="asc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
                        sortConfig.key==="category" && sortConfig.direction==="desc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                    </div>

                  </div>

                </th>

                {/* Title */}

                <th
                  onClick={() => handleSort("title")}
                  className="px-6 py-4 cursor-pointer"
                >

                  <div className="flex items-center gap-2">

                    Title

                    <div className="flex flex-col leading-none">

                      <i className={`bi bi-caret-up-fill text-[10px] ${
                        sortConfig.key==="title" && sortConfig.direction==="asc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
                        sortConfig.key==="title" && sortConfig.direction==="desc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                    </div>

                  </div>

                </th>

                {/* Priority */}

                <th
                  onClick={() => handleSort("priority")}
                  className="px-6 py-4 cursor-pointer"
                >

                  <div className="flex items-center gap-2">

                    Priority

                    <div className="flex flex-col leading-none">

                      <i className={`bi bi-caret-up-fill text-[10px] ${
                        sortConfig.key==="priority" && sortConfig.direction==="asc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
                        sortConfig.key==="priority" && sortConfig.direction==="desc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                    </div>

                  </div>

                </th>

                {/* Status */}

                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 cursor-pointer"
                >

                  <div className="flex items-center gap-2">

                    Status

                    <div className="flex flex-col leading-none">

                      <i className={`bi bi-caret-up-fill text-[10px] ${
                        sortConfig.key==="status" && sortConfig.direction==="asc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                      <i className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
                        sortConfig.key==="status" && sortConfig.direction==="desc"
                        ?"text-blue-600":"text-gray-300"
                      }`}></i>

                    </div>

                  </div>

                  

                </th>



{/* Raised On */}

<th
  onClick={() => handleSort("raisedOn")}
  className="px-6 py-4 cursor-pointer"
>

  <div className="flex items-center gap-2">

    Raised On

    <div className="flex flex-col leading-none">

      <i
        className={`bi bi-caret-up-fill text-[10px] ${
          sortConfig.key === "raisedOn" &&
          sortConfig.direction === "asc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>

      <i
        className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
          sortConfig.key === "raisedOn" &&
          sortConfig.direction === "desc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>

    </div>

  </div>

</th>


{/* Last Updated */}

<th
  onClick={() => handleSort("updatedOn")}
  className="px-6 py-4 cursor-pointer"
>

  <div className="flex items-center gap-2">

    Last Updated

    <div className="flex flex-col leading-none">

      <i
        className={`bi bi-caret-up-fill text-[10px] ${
          sortConfig.key === "updatedOn" &&
          sortConfig.direction === "asc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>

      <i
        className={`bi bi-caret-down-fill text-[10px] -mt-1 ${
          sortConfig.key === "updatedOn" &&
          sortConfig.direction === "desc"
            ? "text-blue-600"
            : "text-gray-300"
        }`}
      ></i>

    </div>

  </div>

</th>








                

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>{currentComplaints.map((item, index) => (

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
{/* Category */}
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
      onChange={(e)=>
        setEditData({...editData,title:e.target.value})
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

      {/* View */}

      

      {/* Menu */}

      <div className="relative">

        <button
          onClick={() =>
            setActionMenu(
              actionMenu === item.id ? null : item.id
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

))}</tbody>
          </table>
        </div>

        {/* Footer */}

        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t bg-white">

          <p className="text-sm text-gray-500 mb-3 md:mb-0">

            Showing{" "}
            <span className="font-semibold">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {Math.min(currentPage * itemsPerPage, filteredComplaints.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {filteredComplaints.length}
            </span>{" "}
            complaints

          </p>

          <div className="flex items-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center
              ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition
                ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>

            ))}

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center
              ${
                currentPage === totalPages || totalPages === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <i className="bi bi-chevron-right"></i>
            </button>

          </div>

        </div>

      </div>



{deleteModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-[400px]">
      <h3 className="font-bold text-lg">
        Delete Complaint
      </h3>

      <p className="text-gray-500 mt-2">
        Are you sure you want to delete this complaint?
      </p>

      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={() => setDeleteModal(false)}
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
};

 