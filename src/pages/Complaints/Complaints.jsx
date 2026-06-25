import React, { useState } from "react";
import { CategoryChart } from "./CategoryChart";
import { StatusChart } from "./StatusChart";
import { RecentComplaints } from "./RecentComplaints";
// import { Sidebar } from "../../layouts/Sidebar";
import { useModal } from "../../context/ModalContext";
import { NavLink } from "react-router-dom";

const cards = [
  {
    title: "Total Complaints",
    value: "128",
    subtitle: "This Month",
    icon: "bi bi-clipboard-data",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Open",
    value: "32",
    subtitle: "Needs Attention",
    icon: "bi bi-exclamation-circle",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    title: "InProgress",
    value: "45",
    subtitle: "Ongoing",
    icon: "bi bi-arrow-repeat",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  {
    title: "Resolved",
    value: "85",
    subtitle: "This Month",
    icon: "bi bi-check-circle",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];


// STYLE FUNCTIONS
const getCategoryStyle = (cat) => {
  switch (cat) {
    case "Plumbing":
      return "text-blue-600 bg-blue-50";
    case "Electricity":
      return "text-yellow-600 bg-yellow-50";
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




const { modal, closeModal } = useModal();
    
const [complaints,setComplaints] = useState([
  {
    id: "CMP-2025-155",
    category: "Plumbing",
    title: "Water leakage in bathroom",
    raisedBy: "Supriya Sonawale",
    flatNo: "A-101",
    priority: "High",
    status: "Open",
    raisedOn: "2026-06-21",
  },
  {
    id: "CMP-2025-156",
    category: "Electricity",
    title: "Light not working",
    raisedBy: "Rahul Patil",
    flatNo: "B-203",
    priority: "Medium",
    status: "In Progress",
    raisedOn: "2026-06-20",
  },
  {
    id: "CMP-2025-157",
    category: "Water",
    title: "Low water pressure",
    raisedBy: "Anita Desai",
    flatNo: "C-12",
    priority: "Low",
    status: "Resolved",
    raisedOn: "2026-06-19",
  },


  {
    id: "CMP-2025-158",
    category: "Cleaning",
    title: "Garbage not colleted since 2 days",
    raisedBy: "Sunita Sonawale",
    flatNo: "C-13",
    priority: "High",
    status: "Overdue",
    raisedOn: "2026-06-20",
  },
{
  id: "CMP-2025-165",
  category: "Plumbing",
  title: "Kitchen sink blockage issue",
  raisedBy: "Ramesh Jadhav",
  flatNo: "A-201",
  priority: "High",
  status: "Open",
  raisedOn: "2026-06-22",
},
{
  id: "CMP-2025-166",
  category: "Electricity",
  title: "Main switch not working properly",
  raisedBy: "Priya Desai",
  flatNo: "B-102",
  priority: "Medium",
  status: "In Progress",
  raisedOn: "2026-06-21",
},

{
  id: "CMP-2025-159",
  category: "Security",
  title: "Main gate lock issue",
  raisedBy: "Vikram Mehta",
  flatNo: "D-104",
  priority: "High",
  status: "Open",
  raisedOn: "2026-06-22",
},
{
  id: "CMP-2025-160",
  category: "Water",
  title: "Tap leakage in kitchen",
  raisedBy: "Neha Kulkarni",
  flatNo: "A-303",
  priority: "Low",
  status: "Resolved",
  raisedOn: "2026-06-19",
},
{
  id: "CMP-2025-161",
  category: "Cleaning",
  title: "Lift area not cleaned properly",
  raisedBy: "Amit Shah",
  flatNo: "B-110",
  priority: "Medium",
  status: "In Progress",
  raisedOn: "2026-06-21",
},


]);

const generateId = () => {
  const year = new Date().getFullYear();

  const nextNumber = complaints.length + 1;

  return `CMP-${year}-${String(nextNumber).padStart(3, "0")}`;
};

const [selectedCategory, setSelectedCategory] = useState("All");

const [openMenu, setOpenMenu] = useState(null);


  const [activeTab, setActiveTab] = useState("All");



  const [selectedDate, setSelectedDate] = useState("");

  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

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
    (item) => item.status === activeTab
  );
}

// Date filter
if (selectedDate) {
  filteredComplaints = filteredComplaints.filter(
    (item) => item.raisedOn === selectedDate
  );
}

// CATEGORY filter 
if (selectedCategory !== "All") {
  filteredComplaints = filteredComplaints.filter(
    (item) => item.category === selectedCategory
  );
}


const [sortConfig, setSortConfig] = useState({
  key: "",
  direction: "asc",
});

const handleSort = (key) => {
  setSortConfig((prev) => ({
    key,
    direction:
      prev.key === key && prev.direction === "asc"
        ? "desc"
        : "asc",
  }));
  
};
const renderSortIcon = (key) => (
  <span className="inline-flex flex-col ml-1 gap-[1px]">
    <span
      className={`text-[7px] ${
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "text-blue-600"
          : "text-gray-400"
      }`}
    >
      ▲
    </span>

    <span
      className={`text-[7px] ${
        sortConfig.key === key && sortConfig.direction === "desc"
          ? "text-blue-600"
          : "text-gray-400"
      }`}
    >
      ▼
    </span>
  </span>
);

if (sortConfig.key) {
  filteredComplaints = [...filteredComplaints].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // PRIORITY SORT
    if (sortConfig.key === "priority") {
      const priorityOrder = {
        Low: 1,
        Medium: 2,
        High: 3,
      };

      aValue = priorityOrder[aValue] || 0;
      bValue = priorityOrder[bValue] || 0;
    }

    // STATUS SORT 
    if (sortConfig.key === "status") {
      const statusOrder = {
        Open: 1,
        "In Progress": 2,
        Resolved: 3,
        Overdue: 4,
      };

      aValue = statusOrder[aValue] || 0;
      bValue = statusOrder[bValue] || 0;
    }

    // DATE SORT
    if (sortConfig.key === "raisedOn") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // NORMAL SORT
    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }

    return 0;
  });
}






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
  onClick={() => setIsOpen(true)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm"
>
  <i className="bi bi-plus-lg"></i> New Complaint
</button>
        </div>
      </div>

    {/* MAIN */}
<div className="flex flex-col xl:flex-row gap-6 w-full min-h-[calc(100vh-120px)] min-w-0">
  {/* LEFT */}
<div className="flex-1 min-w-0 overflow-x-auto flex flex-col gap-6">
    
    
            {/* CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {cards.map((c, i) => (
<div
  key={i}
  className="bg-white min-h-[120px] border rounded-xl px-4 py-3 flex items-center gap-4 shadow-sm"
>                <div className={`w-12 h-12 flex items-center justify-center rounded-full ${c.bg}`}>
                  <i className={`${c.icon} text-lg ${c.color}`}></i>
                </div>

                <div>
                  <p className="text-xs font-bold">{c.title}</p>
                  <h2 className="text-xl font-bold">{c.value}</h2>
                  <p className="text-[11px] text-gray-400">{c.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
<div className="flex-1 bg-white p-4 rounded-xl shadow overflow-y-auto flex flex-col">            {/* TABS */}
<div className="flex flex-col lg:flex-row lg:justify-between gap-4">
<div className="font-semibold flex gap-6 border-b overflow-x-auto overflow-y-auto whitespace-nowrap">
  {["All", "Open", "In Progress", "Resolved", "Overdue"].map((tab) => (
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
  ))}

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
  {filteredComplaints.map((item, index) => (
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
                  i === index ? { ...c, category: value } : c
                )
              );
            }}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <span className={`px-3 py-1 rounded-full text-sm ${getCategoryStyle(item.category)}`}>
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
                  i === index ? { ...c, title: value } : c
                )
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
            i === index ? { ...c, raisedBy: value } : c
          )
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
                  i === index ? { ...c, flatNo: value } : c
                )
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
                  i === index ? { ...c, priority: value } : c
                )
              );
            }}
            className="border px-2 py-1 rounded w-full"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        ) : (
          <span className={`px-3 py-1 rounded-full text-sm ${getPriorityStyle(item.priority)}`}>
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
                  i === index ? { ...c, status: value } : c
                )
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
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(item.status)}`}>
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
            i === index ? { ...c, isEditing: false } : c
          )
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
                    : c
                )
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

{deleteId && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg">

      <h2 className="text-lg font-bold mb-3 text-red-600">
        Delete Complaint
      </h2>

      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this complaint?
      </p>

      <div className="flex justify-end gap-2">

        <button
          onClick={() => setDeleteId(null)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setComplaints((prev) =>
              prev.filter((c) => c.id !== deleteId.id)
            );
            setDeleteId(null);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>

      </div>

    </div>
  </div>
)}

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

{/* raise complaints popup quick links */}

{modal?.module === "complaints" &&
 modal?.type === "raiseComplaint" && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-[400px] p-6 rounded-xl">

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Raise Complaint</h2>

        <button onClick={closeModal}>
          ✖
        </button>
      </div>

      <input
        placeholder="Title"
        className="w-full border p-2 mb-3"
      />

      <input
        placeholder="Raised By"
        className="w-full border p-2 mb-3"
      />

      <select className="w-full border p-2 mb-3">
        <option>Plumbing</option>
        <option>Electricity</option>
        <option>Water</option>
      </select>

      <button className="w-full bg-green-600 text-white py-2 rounded">
        Save
      </button>

    </div>
  </div>
)}


{/* my complaints */}


{modal?.module === "complaints" &&
 modal?.type === "myComplaints" && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-[600px] p-5 rounded-xl">

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">My Complaints</h2>

        <button onClick={closeModal}>
          ✖
        </button>
      </div>

      {/* LIST */}
      <div className="max-h-[300px] overflow-y-auto">
        {complaints.map((c) => (
          <div
            key={c.id}
            className="border-b py-2 text-sm flex justify-between"
          >
            <span>{c.title}</span>
            <span className="text-gray-500">{c.status}</span>
          </div>
        ))}
      </div>

    </div>
  </div>
)}



{/* Categorie All */}

{modal?.module === "complaints" &&
 modal?.type === "categories" && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white w-[450px] p-5 rounded-xl">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Complaint Categories</h2>

        <button onClick={closeModal}>
          ✖
        </button>
      </div>

      {/* CATEGORY LIST */}
      <div className="space-y-2">

        {[
          "Plumbing",
          "Electricity",
          "Water",
          "Cleaning",
          "Security",
        ].map((cat, i) => (
          <div
            key={i}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{cat}</span>
            <span className="text-xs text-gray-500">Active</span>
          </div>
        ))}

      </div>

    </div>
  </div>
)}

    </div>
  );
};