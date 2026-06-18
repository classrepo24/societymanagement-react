import React from "react";

export const QuickActions = () => {
  const actions = [
    {
      icon: "bi-person-plus",
      title: "Add New Resident",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: "bi-receipt",
      title: "Generate Maintenance",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: "bi-megaphone",
      title: "Add Notice",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: "bi-person-badge",
      title: "Register Visitor",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: "bi-person-workspace",
      title: "Add Staff Member",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: "bi-bar-chart",
      title: "View Reports",
      color: "bg-cyan-100 text-cyan-600",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-sm font-semibold mb-3">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}
            >
              <i className={`bi ${action.icon}`}></i>
            </div>

            <span className="text-sm font-medium text-gray-700">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};