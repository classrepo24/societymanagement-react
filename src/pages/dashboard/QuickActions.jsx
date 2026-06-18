import React from "react";

export const QuickActions = () => {
  const actions = [
    { icon: "bi-person-plus", title: "Add New Resident" },
    { icon: "bi-receipt", title: " Generate Maintenance" },
    { icon: "bi-megaphone", title: "Add Notice" },
    { icon: "bi-person-badge", title: "Register Visitor" },
    { icon: "bi-person-workspace", title: "Add Staff Member" },
    { icon: "bi-bar-chart", title: " View Reports" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-3 h-full">

      {/* HEADER */}
      <div className="mb-2">
        <h2 className="text-sm font-semibold text-gray-800">
          Quick Actions
        </h2>
        <p className="text-[10px] text-gray-500">
          Shortcuts
        </p>
      </div>

      {/* COLUMN */}
      <div className="flex flex-col gap-1.5">

        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center gap-2 p-2 rounded-md 
                       bg-blue-50 hover:bg-blue-100 transition"
          >

            {/* ICON */}
            <div className="w-6 h-6 flex items-center justify-center">
              <i className={`bi ${action.icon} text-blue-600 text-[11px]`}></i>
            </div>

            {/* TEXT */}
            <span className="text-[11px] font-semibold text-gray-700">
              {action.title}
            </span>

          </button>
        ))}

      </div>

    </div>
  );
};