

import React, { useState } from "react";

export const ComplaintSettings = () => {
  const [activeTab, setActiveTab] = useState("Categories");
  const [autoAssignment, setAutoAssignment] = useState(true);
  const [allowReopen, setAllowReopen] = useState(true);
  const [showSaveMessage, setShowSaveMessage] = useState(false);
 


  const [settings, setSettings] = useState({
    attachments: true,
    residentsEdit: true,
    anonymous: true,
    limitComplaints: false,
    feedback: true,
    history: true,
  });

  const tabs = [
    { name: "Categories", icon: "bi bi-grid" },
    { name: "Priorities", icon: "bi bi-flag" },
    { name: "Workflow", icon: "bi bi-arrow-repeat" },
    { name: "Assignment", icon: "bi bi-person" },
    { name: "SLA & Escalation", icon: "bi bi-clock-history" },
    { name: "Notifications", icon: "bi bi-bell" },
    { name: "Feedback", icon: "bi bi-chat-square-text" },
    { name: "Permissions", icon: "bi bi-shield-lock" },
    { name: "Reports", icon: "bi bi-file-earmark-text" },
  ];

  const categories = [
    {
      name: "Plumbing",
      icon: "bi bi-droplet-fill",
      color: "bg-cyan-500",
      description: "Issues related to plumbing, pipes, taps, leakage etc.",
    },
    {
      name: "Electrical",
      icon: "bi bi-lightning-charge-fill",
      color: "bg-amber-400",
      description: "Faulty wiring, fuse issues, power failure etc.",
    },
    {
      name: "Housekeeping",
      icon: "bi bi-brush-fill",
      color: "bg-emerald-500",
      description: "Cleaning, garbage, hygiene related issues.",
    },
    {
      name: "Lift Issues",
      icon: "bi bi-building",
      color: "bg-purple-600",
      description: "Lift not working, stuck, door issues etc.",
    },
    {
      name: "Security",
      icon: "bi bi-shield-fill",
      color: "bg-red-500",
      description: "Security, guard, safety related issues.",
    },
    {
      name: "Others",
      icon: "bi bi-three-dots",
      color: "bg-slate-400",
      description: "Any other issues not listed above.",
    },
  ];
 const [editingIndex, setEditingIndex] = useState(null);
const [deleteCategory, setDeleteCategory] = useState(null);
  const [categoryData, setCategoryData] = useState(categories);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryErrors, setCategoryErrors] = useState({});

  const priorities = [
    {
      name: "Emergency",
      badge: "bg-red-50 text-red-600",
      dot: "bg-rose-500",
      response: "Within 2 Hours",
      resolution: "Within 6 Hours",
    },
    {
      name: "High",
      badge: "bg-orange-50 text-orange-600",
      dot: "bg-orange-500",
      response: "Within 24 Hours",
      resolution: "Within 48 Hours",
    },
    {
      name: "Medium",
      badge: "bg-amber-50 text-amber-600",
      dot: "bg-amber-500",
      response: "Within 48 Hours",
      resolution: "Within 72 Hours",
    },
    {
      name: "Low",
      badge: "bg-blue-50 text-blue-600",
      dot: "bg-blue-600",
      response: "Within 72 Hours",
      resolution: "Within 7 Days",
    },
  ];

const [priorityData, setPriorityData] = useState(priorities);
const [editingPriorityIndex, setEditingPriorityIndex] = useState(null);
const [deletePriority, setDeletePriority] = useState(null);
const [showAddPriority, setShowAddPriority] = useState(false);



  const assignments = [
    ["Plumbing", "Plumbing Team"],
    ["Electrical", "Electrician"],
    ["Housekeeping", "Housekeeping Staff"],
    ["Lift Issues", "Lift Technician"],
    ["Security", "Security Supervisor"],
  ];
const [assignmentData, setAssignmentData] = useState(assignments);
const [editingAssignmentIndex, setEditingAssignmentIndex] = useState(null);
const [deleteAssignment, setDeleteAssignment] = useState(null);



  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-5 w-10 rounded-full transition ${
        checked ? "bg-[#075df2]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-[2px] h-4 w-4 rounded-full bg-white shadow transition ${
          checked ? "left-[22px]" : "left-[2px]"
        }`}
      />
    </button>
  );

  const CheckRow = ({ label, field }) => (
    <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#14245c]">
      <input
        type="checkbox"
        checked={settings[field]}
        onChange={() =>
          setSettings((prev) => ({
            ...prev,
            [field]: !prev[field],
          }))
        }
        className="h-4 w-4 accent-[#075df2]"
      />
      {label}
    </label>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fd] p-4 text-[#0b1954] sm:p-6">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[24px] font-bold">Complaint Settings</h1>
          <p className="mt-1 text-[13px] text-[#40507d]">
            Configure how complaints are created, assigned, tracked and resolved.
          </p>
              </div>
              <button
                  onClick={() => {
                      setShowSaveMessage(true);

                      setTimeout(() => {
                          setShowSaveMessage(false);
                      }, 2500);
                  }}
                  className="bg-[#075df2] text-white px-5 py-2.5 rounded-md text-[12px] font-medium flex items-center gap-2 hover:bg-[#064fd0] transition"
              >
                  <i className="bi bi-floppy text-[14px]"></i>
                  Save Settings
              </button>
          </div>
{/* SETTING SAVED MESSAGE */}
         {showSaveMessage && (
  <div className="fixed top-5 right-5 z-[100] flex w-[320px] items-center gap-3 rounded-xl border border-[#b8e8c9] bg-white px-4 py-3 shadow-lg">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eaf9ef] text-[#14864b]">
      <i className="bi bi-check-lg text-[17px]"></i>
    </div>

    <div className="flex-1">
      <p className="text-[13px] font-semibold text-[#183b2a]">
        Settings Saved
      </p>
      <p className="mt-0.5 text-[11px] text-[#617097]">
        Complaint settings saved successfully.
      </p>
    </div>

    <button
      onClick={() => setShowSaveMessage(false)}
      className="flex h-7 w-7 items-center justify-center rounded-md text-[#617097] hover:bg-[#f3f5fa]"
    >
      <i className="bi bi-x-lg text-[11px]"></i>
    </button>
  </div>
)}

      {/* TABS */}
      <div className="mb-5 overflow-x-auto rounded-lg border border-[#e7ebf5] bg-white">
        <div className="flex min-w-[1030px]">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex-1 whitespace-nowrap border-r border-[#edf0f7] px-4 py-3 text-[13px] ${
                activeTab === tab.name
                  ? "border-b-2 border-b-[#075df2] bg-[#fbfdff] text-[#075df2]"
                  : "text-[#263765]"
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
{/* MAIN SETTINGS LAYOUT */}
<div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">

  {/* ================= LEFT SIDE ================= */}
  <div className="flex flex-col gap-5">

   {/* COMPLAINT CATEGORIES */}
<div className="bg-white border border-[#e8ecf5] rounded-xl min-h-[500px] overflow-hidden shadow-sm flex flex-col">
  {/* HEADER */}
  <div className="flex items-start justify-between px-5 py-4 border-b border-[#edf0f6]">
    <div>
      <h2 className="font-bold text-[16px]">Complaint Categories</h2>
      <p className="text-[12px] text-[#516087] mt-1">
        Manage complaint categories available to residents.
      </p>
    </div>

   <button
  onClick={() => setShowAddCategory(true)}
  className="bg-[#075df2] text-white px-4 py-2 rounded-md text-[12px] flex items-center gap-2"
>
  <i className="bi bi-plus-lg"></i>
  Add Category
</button>
  </div>

  {/* TABLE AREA - extra height yahin use hogi */}
  <div className="overflow-x-auto flex-1 flex flex-col">
    <table className="w-full min-w-[620px] text-left h-full">
      <thead className="bg-[#fbfcff] border-b border-[#edf0f6]">
        <tr className="text-[11px] text-[#14245c]">
          <th className="px-4 py-3 font-semibold">Category Name</th>
          <th className="px-4 py-3 font-semibold">Description</th>
          <th className="px-4 py-3 font-semibold">Status</th>
          <th className="px-4 py-3 font-semibold text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
  {categoryData.map((item, index) => {
    const isEditing = editingIndex === index;

    return (
      <tr
        key={item.name}
        className="border-b border-[#edf0f6] last:border-0 h-[67px]"
      >
        {/* CATEGORY NAME */}
        <td className="px-4 py-4">
          {isEditing ? (
            <input
              defaultValue={item.name}
              className="w-full border border-[#b9cdfd] rounded px-2 py-1.5 text-[12px] outline-none"
            />
          ) : (
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full ${item.color} text-white flex items-center justify-center`}
              >
                <i className={`${item.icon} text-[13px]`}></i>
              </div>

              <span className="font-semibold text-[12px]">{item.name}</span>
            </div>
          )}
        </td>

        {/* DESCRIPTION */}
        <td className="px-4 py-4 text-[11px] leading-4 text-[#3d4c77] max-w-[180px]">
          {isEditing ? (
            <input
              defaultValue={item.description}
              className="w-full border border-[#b9cdfd] rounded px-2 py-1.5 text-[11px] outline-none"
            />
          ) : (
            item.description
          )}
        </td>

        {/* STATUS */}
        <td className="px-4 py-4">
          {isEditing ? (
            <select
              defaultValue="Active"
              className="border border-[#b9cdfd] rounded px-2 py-1.5 text-[10px] outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          ) : (
            <span className="bg-[#e5f7ed] text-[#14864b] px-2 py-1 rounded text-[10px]">
              Active
            </span>
          )}
        </td>

        {/* ACTIONS */}
        <td className="px-4 py-4">
          <div className="flex justify-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="h-7 px-2 rounded bg-[#075df2] text-white text-[10px] flex items-center gap-1"
                >
                  <i className="bi bi-check-lg"></i>
                  Save
                </button>

                <button
                  onClick={() => setEditingIndex(null)}
                  className="w-7 h-7 rounded border border-[#dce3f0] text-[#617097]"
                >
                  <i className="bi bi-x-lg text-[10px]"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingIndex(index)}
                  className="w-7 h-7 rounded border border-[#dbe5ff] text-[#075df2]"
                >
                  <i className="bi bi-pencil-fill text-[11px]"></i>
                </button>

                <button
                  onClick={() => setDeleteCategory(item)}
                  className="w-7 h-7 rounded bg-[#fff1f3] text-red-500"
                >
                  <i className="bi bi-trash3-fill text-[11px]"></i>
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
    </table>
  </div>

  {/* FOOTER */}
  <div className="px-4 py-3 border-t border-[#edf0f6] text-[11px] text-[#52618a] flex items-center gap-2">
    <i className="bi bi-list-ul"></i>
    Drag to reorder categories
  </div>
</div>

  {/* COMPLAINT STATUS WORKFLOW */}
<div className="bg-white border border-[#e8ecf5] rounded-xl overflow-hidden shadow-sm h-full  flex flex-col">  <div className="px-5 py-4 border-b border-[#edf0f6]">
    <h2 className="font-bold text-[16px]">Complaint Status Workflow</h2>
    <p className="text-[12px] text-[#516087] mt-1">
      Configure the status flow for complaints.
    </p>
  </div>

  <div className="p-5">
    <div className="flex flex-wrap items-center gap-9">
      {[
        ["Open", "bg-blue-50 text-blue-700"],
        ["Assigned", "bg-orange-50 text-orange-600"],
        ["In Progress", "bg-purple-50 text-purple-700"],
        ["Waiting for Resident", "bg-sky-50 text-blue-700"],
      ].map(([label, color], index) => (
        <React.Fragment key={label}>
          <span
            className={`${color} px-4 py-3 rounded-lg text-[11px] text-center min-w-[78px]`}
          >
            {label}
          </span>

          {index !== 3 && (
            <i className="bi bi-arrow-right text-[#617097]"></i>
          )}
        </React.Fragment>
      ))}
    </div>

    <div className="flex flex-wrap items-center gap-2 mt-5">
      {[
        ["Resolved", "bg-emerald-50 text-emerald-600"],
        ["Closed", "bg-slate-100 text-slate-700"],
        ["Reopened", "bg-rose-50 text-red-500"],
      ].map(([label, color], index) => (
        <React.Fragment key={label}>
          <span
            className={`${color} px-4 py-3 rounded-lg text-[11px] text-center min-w-[80px]`}
          >
            {label}
          </span>

          {index !== 2 && (
            <i className="bi bi-arrow-right text-[#617097]"></i>
          )}
        </React.Fragment>
      ))}
    </div>

    <div className="border-t border-[#edf0f6] mt-5 pt-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[12px]">
            Allow resident to reopen closed complaints
          </p>

          <p className="text-[11px] text-[#617097] mt-1">
            Residents can reopen complaints within defined days.
          </p>
        </div>

        <Toggle
          checked={allowReopen}
          onChange={() => setAllowReopen(!allowReopen)}
        />
      </div>

      <div className="flex items-center gap-3 mt-4 text-[12px]">
        <span>Reopen within (days)</span>

        <input
          type="number"
          defaultValue="7"
          className="w-16 border border-[#dce3f0] rounded px-3 py-2 outline-none"
        />

        <span>days</span>
      </div>
    </div>
  </div>
</div>
</div>



  {/* ================= RIGHT SIDE ================= */}
  <div className="flex flex-col gap-5">

    {/* PRIORITY LEVELS */}
    <div className="bg-white border border-[#e8ecf5] rounded-xl overflow-hidden shadow-sm">
      <div className="flex items-start justify-between px-5 py-4 border-b border-[#edf0f6]">
        <div>
          <h2 className="font-bold text-[16px]">Priority Levels</h2>
          <p className="text-[12px] text-[#516087] mt-1">
            Define priority levels and expected response time.
          </p>
        </div>

       <button
  onClick={() => setShowAddPriority(true)}
  className="bg-[#075df2] text-white px-4 py-2 rounded-md text-[12px] flex items-center gap-2"
>
  <i className="bi bi-plus-lg"></i>
  Add Priority
</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead className="bg-[#fbfcff] border-b border-[#edf0f6]">
            <tr className="text-[11px] text-[#14245c]">
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Color</th>
              <th className="px-4 py-3 font-semibold">Response Time</th>
              <th className="px-4 py-3 font-semibold">Resolution Time</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
  {priorityData.map((item, index) => {
    const isEditing = editingPriorityIndex === index;

    return (
      <tr
        key={item.name}
        className="border-b border-[#edf0f6] last:border-0"
      >
        {/* PRIORITY */}
        <td className="px-4 py-4">
          {isEditing ? (
            <select className="border border-[#b9cdfd] rounded px-2 py-1.5 text-[10px] outline-none">
              <option>{item.name}</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          ) : (
            <span className={`${item.badge} px-2 py-1 rounded text-[10px]`}>
              {item.name}
            </span>
          )}
        </td>

        {/* COLOR */}
        <td className="px-4 py-4">
          {isEditing ? (
            <input
              type="color"
              className="w-8 h-7 cursor-pointer border border-[#dce3f0] rounded"
            />
          ) : (
            <span
              className={`w-3 h-3 rounded-full ${item.dot} inline-block`}
            ></span>
          )}
        </td>

        {/* RESPONSE TIME */}
        <td className="px-4 py-4 text-[11px]">
          {isEditing ? (
            <input
              defaultValue={item.response}
              className="w-[90px] border border-[#b9cdfd] rounded px-2 py-1.5 text-[10px] outline-none"
            />
          ) : (
            item.response
          )}
        </td>

        {/* RESOLUTION TIME */}
        <td className="px-4 py-4 text-[11px]">
          {isEditing ? (
            <input
              defaultValue={item.resolution}
              className="w-[90px] border border-[#b9cdfd] rounded px-2 py-1.5 text-[10px] outline-none"
            />
          ) : (
            item.resolution
          )}
        </td>

        {/* STATUS */}
        <td className="px-4 py-4">
          {isEditing ? (
            <select className="border border-[#b9cdfd] rounded px-2 py-1.5 text-[10px] outline-none">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          ) : (
            <span className="bg-[#e5f7ed] text-[#14864b] px-2 py-1 rounded text-[10px]">
              Active
            </span>
          )}
        </td>

        {/* ACTIONS */}
        <td className="px-4 py-4">
          <div className="flex justify-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setEditingPriorityIndex(null)}
                  className="h-7 px-2 rounded bg-[#075df2] text-white text-[10px] flex items-center gap-1"
                  title="Save"
                >
                  <i className="bi bi-check-lg"></i>
                  Save
                </button>

                <button
                  onClick={() => setEditingPriorityIndex(null)}
                  className="w-7 h-7 rounded border border-[#dce3f0] text-[#617097]"
                  title="Cancel"
                >
                  <i className="bi bi-x-lg text-[10px]"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingPriorityIndex(index)}
                  className="w-7 h-7 rounded border border-[#dbe5ff] text-[#075df2]"
                  title="Edit"
                >
                  <i className="bi bi-pencil-fill text-[11px]"></i>
                </button>

                <button
                  onClick={() => setDeletePriority(item)}
                  className="w-7 h-7 rounded bg-[#fff1f3] text-red-500"
                  title="Delete"
                >
                  <i className="bi bi-trash3-fill text-[11px]"></i>
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>
    </div>

    {/* AUTO + OTHER  */}
    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-5 items-stretch">

      {/* AUTO ASSIGNMENT */}
<div className="bg-white border border-[#e8ecf5] rounded-xl overflow-hidden shadow-sm h-full flex flex-col">        <div className="px-5 py-4 border-b border-[#edf0f6]">
          <h2 className="font-bold text-[16px]">Auto Assignment Rules</h2>
          <p className="text-[12px] text-[#516087] mt-1">
            Automatically assign complaints based on category.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[350px]">
            <thead className="bg-[#fbfcff] border-b border-[#edf0f6]">
              <tr className="text-[10px]">
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Assign To</th>
                <th className="text-center px-3 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
  {assignmentData.map(([category, person], index) => {
    const isEditing = editingAssignmentIndex === index;

    return (
      <tr key={category} className="border-b border-[#edf0f6]">
        {/* CATEGORY */}
        <td className="px-3 py-3 text-[11px] font-medium">
          {isEditing ? (
            <input
              defaultValue={category}
              className="w-full border border-[#b9cdfd] rounded-md px-2 py-1.5 text-[10px] outline-none"
            />
          ) : (
            category
          )}
        </td>

        {/* ASSIGN TO */}
        <td className="px-3 py-3">
          {isEditing ? (
            <select
              defaultValue={person}
              className="w-full border border-[#b9cdfd] rounded-md px-2 py-1.5 text-[10px] outline-none bg-white"
            >
              <option>{person}</option>
              <option>Society Manager</option>
              <option>Maintenance Team</option>
              <option>Security Team</option>
            </select>
          ) : (
            <span className="text-[11px] text-[#263765]">{person}</span>
          )}
        </td>

        {/* ACTIONS */}
        <td className="px-3 py-3">
          <div className="flex justify-center gap-1">
            {isEditing ? (
              <>
                <button
                  onClick={() => setEditingAssignmentIndex(null)}
                  className="h-7 px-2 rounded bg-[#075df2] text-white text-[10px] flex items-center gap-1"
                >
                  <i className="bi bi-check-lg"></i>
                  Save
                </button>

                <button
                  onClick={() => setEditingAssignmentIndex(null)}
                  className="w-7 h-7 rounded border border-[#dce3f0] text-[#617097]"
                >
                  <i className="bi bi-x-lg text-[10px]"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingAssignmentIndex(index)}
                  className="w-7 h-7 rounded border border-[#dbe5ff] text-[#075df2]"
                >
                  <i className="bi bi-pencil-fill text-[10px]"></i>
                </button>

                <button
                  onClick={() =>
                    setDeleteAssignment({ category, index })
                  }
                  className="w-7 h-7 rounded bg-[#fff1f3] text-red-500"
                >
                  <i className="bi bi-trash3-fill text-[10px]"></i>
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>

        <div className="mt-auto p-4 border-t border-[#edf0f6] flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[12px]">Enable Auto Assignment</p>
            <p className="text-[10px] text-[#617097] mt-1">
              Complaints will be auto assigned to selected teams.
            </p>
          </div>

          <Toggle
            checked={autoAssignment}
            onChange={() => setAutoAssignment(!autoAssignment)}
          />
        </div>
      </div>


{/* OTHER SETTINGS */}
<div className="bg-white border border-[#e8ecf5] rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
  <div className="px-4 py-3 border-b border-[#edf0f6]">
    <h2 className="font-bold text-[15px]">Other Settings</h2>
  </div>

  <div className="p-3 space-y-2 flex-1">
    <CheckRow label="Allow attachments in complaints" field="attachments" />

    <div className="pl-5 space-y-1.5">
      <div className="flex items-center justify-between gap-2 text-[10px]">
        <span>Max File Size</span>
        <select className="border border-[#dce3f0] rounded px-2 py-1 w-[105px] text-[10px]">
          <option>5 MB</option>
          <option>10 MB</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-2 text-[10px]">
        <span>Allowed Types</span>
        <input
          value="JPG, PNG, PDF"
          readOnly
          className="border border-[#dce3f0] rounded px-2 py-1 w-[105px] text-[9px]"
        />
      </div>
    </div>

    <CheckRow label="Allow residents to edit complaints" field="residentsEdit" />
    <CheckRow label="Allow anonymous complaints" field="anonymous" />
    <CheckRow label="Limit number of complaints per day" field="limitComplaints" />

    <div className="flex items-center gap-2 pl-5 text-[10px]">
      <span>Limit</span>
      <input
        type="number"
        defaultValue="5"
        disabled={!settings.limitComplaints}
        className="w-10 border border-[#dce3f0] rounded px-2 py-1 disabled:bg-gray-100"
      />
    </div>

    <CheckRow label="Enable complaint feedback" field="feedback" />
    <CheckRow label="Show complaint history to residents" field="history" />

    <div className="border-t border-[#edf0f6] pt-3 mt-3">
      <h3 className="font-bold text-[12px] mb-2">Escalation Settings</h3>

      <div className="space-y-1.5 text-[10px]">
        <div className="flex justify-between items-center gap-2">
          <span>Escalate if no response</span>
          <select className="border border-[#dce3f0] rounded px-2 py-1 w-[95px]">
            <option>24 Hours</option>
          </select>
        </div>

        <div className="flex justify-between items-center gap-2">
          <span>Escalate if not resolved</span>
          <select className="border border-[#dce3f0] rounded px-2 py-1 w-[95px]">
            <option>3 Days</option>
          </select>
        </div>

        <p className="font-semibold mt-2">Escalation Levels</p>

        {[
          ["Level 1", "Maintenance Supervisor"],
          ["Level 2", "Society Manager"],
          ["Level 3", "Society Admin"],
        ].map(([level, user]) => (
          <div key={level} className="flex items-center gap-2">
            <span className="w-[43px]">{level}</span>
            <select className="flex-1 border border-[#dce3f0] rounded px-2 py-1 text-[9px]">
              <option>{user}</option>
            </select>
          </div>
        ))}
      </div>
    
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


{/* POPUP DELETE CATEGORY */}
{deleteCategory && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg">
      <h2 className="text-lg font-bold mb-3 text-red-600">
        Delete Category
      </h2>

      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this category?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeleteCategory(null)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

                          <button
                              onClick={() => {
                                  setCategoryData((prev) =>
                                      prev.filter((category) => category.name !== deleteCategory.name)
                                  );
                                  setDeleteCategory(null);
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded"
                          >
                              Delete
                          </button>
      </div>
    </div>
  </div>
)}



{/* ADD CATEGORY POPUP */}
{/* ADD CATEGORY POPUP */}
{showAddCategory && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-[420px] rounded-xl shadow-lg overflow-hidden">
      
      <div className="px-5 py-4 border-b border-[#edf0f6] flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#14245c]">
            Add Category
          </h2>
          <p className="text-[11px] text-[#617097] mt-1">
            Create a new complaint category.
          </p>
        </div>

        <button
          onClick={() => {
            setShowAddCategory(false);
            setCategoryErrors({});
          }}
          className="w-8 h-8 rounded-md text-[#617097] hover:bg-[#f3f5fa]"
        >
          <i className="bi bi-x-lg text-[13px]"></i>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* CATEGORY NAME */}
        <div>
          <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
            Category Name <span className="text-red-500">*</span>
          </label>

          <input
            id="newCategoryName"
            type="text"
            placeholder="Enter category name"
            onChange={() =>
              setCategoryErrors((prev) => ({
                ...prev,
                name: "",
              }))
            }
            className={`w-full border rounded-md px-3 py-2 text-[12px] outline-none ${
              categoryErrors.name
                ? "border-red-500 focus:border-red-500"
                : "border-[#dce3f0] focus:border-[#075df2]"
            }`}
          />

          {categoryErrors.name && (
            <p className="text-red-500 text-[10px] mt-1">
              Please enter category name.
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>

          <textarea
            id="newCategoryDescription"
            rows="3"
            placeholder="Enter category description"
            onChange={() =>
              setCategoryErrors((prev) => ({
                ...prev,
                description: "",
              }))
            }
            className={`w-full border rounded-md px-3 py-2 text-[12px] outline-none resize-none ${
              categoryErrors.description
                ? "border-red-500 focus:border-red-500"
                : "border-[#dce3f0] focus:border-[#075df2]"
            }`}
          />

          {categoryErrors.description && (
            <p className="text-red-500 text-[10px] mt-1">
              Please enter category description.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* ICON */}
          <div>
            <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
              Icon <span className="text-red-500">*</span>
            </label>

            <select
              id="newCategoryIcon"
              defaultValue=""
              onChange={() =>
                setCategoryErrors((prev) => ({
                  ...prev,
                  icon: "",
                }))
              }
              className={`w-full border rounded-md px-3 py-2 text-[11px] outline-none bg-white ${
                categoryErrors.icon
                  ? "border-red-500"
                  : "border-[#dce3f0] focus:border-[#075df2]"
              }`}
            >
              <option value="" disabled>
                Select icon
              </option>
              <option value="bi bi-tools">Tools</option>
              <option value="bi bi-droplet-fill">Water</option>
              <option value="bi bi-lightning-charge-fill">Electricity</option>
              <option value="bi bi-shield-fill">Security</option>
              <option value="bi bi-building-fill">Building</option>
              <option value="bi bi-tag-fill">Other</option>
            </select>

            {categoryErrors.icon && (
              <p className="text-red-500 text-[10px] mt-1">
                Please select an icon.
              </p>
            )}
          </div>

          {/* COLOR */}
          <div>
            <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
              Color <span className="text-red-500">*</span>
            </label>

            <select
              id="newCategoryColor"
              defaultValue=""
              onChange={() =>
                setCategoryErrors((prev) => ({
                  ...prev,
                  color: "",
                }))
              }
              className={`w-full border rounded-md px-3 py-2 text-[11px] outline-none bg-white ${
                categoryErrors.color
                  ? "border-red-500"
                  : "border-[#dce3f0] focus:border-[#075df2]"
              }`}
            >
              <option value="" disabled>
                Select color
              </option>
              <option value="bg-[#075df2]">Blue</option>
              <option value="bg-[#ef4444]">Red</option>
              <option value="bg-[#f59e0b]">Orange</option>
              <option value="bg-[#10b981]">Green</option>
              <option value="bg-[#8b5cf6]">Purple</option>
              <option value="bg-[#64748b]">Gray</option>
            </select>

            {categoryErrors.color && (
              <p className="text-red-500 text-[10px] mt-1">
                Please select a color.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-[#edf0f6] flex justify-end gap-3">
        <button
          onClick={() => {
            setShowAddCategory(false);
            setCategoryErrors({});
          }}
          className="px-4 py-2 border border-[#dce3f0] rounded-md text-[#52618a] text-[12px]"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            const name = document.getElementById("newCategoryName").value.trim();
            const description = document
              .getElementById("newCategoryDescription")
              .value.trim();
            const icon = document.getElementById("newCategoryIcon").value;
            const color = document.getElementById("newCategoryColor").value;

            const errors = {};

            if (!name) errors.name = true;
            if (!description) errors.description = true;
            if (!icon) errors.icon = true;
            if (!color) errors.color = true;

            if (Object.keys(errors).length > 0) {
              setCategoryErrors(errors);
              return;
            }

            setCategoryData((prev) => [
              ...prev,
              {
                name,
                description,
                icon,
                color,
              },
            ]);

            setCategoryErrors({});
            setShowAddCategory(false);
          }}
          className="px-4 py-2 bg-[#075df2] text-white rounded-md text-[12px] flex items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Add Category
        </button>
      </div>
    </div>
  </div>
)}



{/* DELETE POPUP PRIORITY */}
{deletePriority && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg">
      <h2 className="text-lg font-bold mb-3 text-red-600">
        Delete Priority
      </h2>

      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this priority?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeletePriority(null)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setPriorityData((prev) =>
              prev.filter((priority) => priority.name !== deletePriority.name)
            );
            setDeletePriority(null);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

{/* deleteAssignment */}
{deleteAssignment && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[350px] rounded-xl p-5 shadow-lg">
      <h2 className="text-lg font-bold mb-3 text-red-600">
        Delete Assignment Rule
      </h2>

      <p className="text-gray-600 mb-4">
        Are you sure you want to delete this assignment rule?
      </p>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setDeleteAssignment(null)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            setAssignmentData((prev) =>
              prev.filter(
                (_, index) => index !== deleteAssignment.index
              )
            );
            setDeleteAssignment(null);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}


{/* ADD PRIORITY POPUP */}
{showAddPriority && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white w-full max-w-[430px] rounded-xl shadow-lg overflow-hidden">
      
      <div className="px-5 py-4 border-b border-[#edf0f6] flex items-center justify-between">
        <div>
          <h2 className="text-[16px] font-bold text-[#14245c]">
            Add Priority
          </h2>
          <p className="text-[11px] text-[#617097] mt-1">
            Create a new complaint priority level.
          </p>
        </div>

        <button
          onClick={() => setShowAddPriority(false)}
          className="w-8 h-8 rounded-md text-[#617097] hover:bg-[#f3f5fa]"
        >
          <i className="bi bi-x-lg text-[13px]"></i>
        </button>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
            Priority Name
          </label>
          <select
            id="newPriorityName"
            className="w-full border border-[#dce3f0] rounded-md px-3 py-2 text-[12px] outline-none bg-white focus:border-[#075df2]"
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
            Color
          </label>
          <select
            id="newPriorityColor"
            className="w-full border border-[#dce3f0] rounded-md px-3 py-2 text-[12px] outline-none bg-white focus:border-[#075df2]"
          >
            <option value="bg-[#22c55e]">Green</option>
            <option value="bg-[#f59e0b]">Orange</option>
            <option value="bg-[#ef4444]">Red</option>
            <option value="bg-[#8b5cf6]">Purple</option>
            <option value="bg-[#075df2]">Blue</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
              Response Time
            </label>
            <input
              id="newPriorityResponse"
              type="text"
              placeholder="e.g. 2 Hours"
              className="w-full border border-[#dce3f0] rounded-md px-3 py-2 text-[12px] outline-none focus:border-[#075df2]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
              Resolution Time
            </label>
            <input
              id="newPriorityResolution"
              type="text"
              placeholder="e.g. 24 Hours"
              className="w-full border border-[#dce3f0] rounded-md px-3 py-2 text-[12px] outline-none focus:border-[#075df2]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-[#263765] mb-1.5">
            Status
          </label>
          <select
            id="newPriorityStatus"
            className="w-full border border-[#dce3f0] rounded-md px-3 py-2 text-[12px] outline-none bg-white"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-[#edf0f6] flex justify-end gap-3">
        <button
          onClick={() => setShowAddPriority(false)}
          className="px-4 py-2 border border-[#dce3f0] rounded-md text-[#52618a] text-[12px]"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            const name = document.getElementById("newPriorityName").value;
            const dot = document.getElementById("newPriorityColor").value;
            const response = document
              .getElementById("newPriorityResponse")
              .value.trim();
            const resolution = document
              .getElementById("newPriorityResolution")
              .value.trim();

            if (!name || !response || !resolution) {
              return;
            }

            const badgeMap = {
              Low: "bg-[#eaf9ef] text-[#14864b]",
              Medium: "bg-[#fff7e6] text-[#d97706]",
              High: "bg-[#fff1f3] text-[#dc2626]",
              Critical: "bg-[#f3edff] text-[#7c3aed]",
            };

            setPriorityData((prev) => [
              ...prev,
              {
                name,
                badge: badgeMap[name] || "bg-[#eef4ff] text-[#075df2]",
                dot,
                response,
                resolution,
              },
            ]);

            setShowAddPriority(false);
          }}
          className="px-4 py-2 bg-[#075df2] text-white rounded-md text-[12px] flex items-center gap-2"
        >
          <i className="bi bi-plus-lg"></i>
          Add Priority
        </button>
      </div>
    </div>
  </div>
)}




    </div>
  );
};

 