import React, { useState } from "react";

export const CategorySidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    {
      name: "Plumbing",
      description: "Tap leakage, Pipe leakage, Blockage, etc.",
      icon: "bi-droplet-fill",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Electrical",
      description: "Light not working, Switch issue, Fan issue, etc.",
      icon: "bi-lightning-charge-fill",
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      name: "Carpentry",
      description: "Door lock, Window, Furniture repair, etc.",
      icon: "bi-hammer",
      color: "text-orange-500",
      bg: "bg-orange-100",
    },
    {
      name: "Cleaning",
      description: "Housekeeping, Common area cleaning, etc.",
      icon: "bi-brush-fill",
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Others",
      description: "Any other maintenance issues",
      icon: "bi-grid",
      color: "text-gray-600",
      bg: "bg-gray-100",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <i className="bi bi-grid text-blue-600 text-lg"></i>

        <h2 className="text-lg font-semibold text-slate-800">
          Common Maintenance Categories
        </h2>
      </div>

      {/* Categories */}
      <div className="space-y-2">
        {categories.map((item) => (
          <button
            key={item.name}
            onClick={() => setSelectedCategory(item.name)}
            className={`w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200
      ${selectedCategory === item.name
                ? "bg-blue-50"
                : "hover:bg-gray-50"
              }`}
          >
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <i className={`bi ${item.icon} ${item.color} text-lg`}></i>
            </div>

            {/* Title & Description */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800">
                {item.name}
              </h4>

              <p className="text-xs text-gray-500 mt-1 leading-5">
                {item.description}
              </p>
            </div>

            {/* Tick */}
            {selectedCategory === item.name && (
              <i className="bi bi-check-circle-fill text-blue-600 text-lg mt-1"></i>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};