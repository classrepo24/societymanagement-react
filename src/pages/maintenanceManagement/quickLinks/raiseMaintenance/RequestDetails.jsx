import React, { useState } from "react";
import Select from "react-select";

export const RequestDetails = ({ requestData, handleChange }) => {
  const subCategoryData = {
    Plumbing: [
      "Tap Leakage",
      "Pipe Leakage",
      "Water Tank",
      "Drain Blockage",
    ],

    Electrical: [
      "Fan Not Working",
      "Light Not Working",
      "Switch Board",
      "MCB Trip",
      "Wiring Issue",
    ],

    Carpentry: [
      "Door Repair",
      "Window Repair",
      "Cupboard Repair",
      "Furniture Repair",
    ],

    Cleaning: [
      "Deep Cleaning",
      "Garbage Collection",
      "Pest Control",
      "Common Area Cleaning",
    ],
  };
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Plumbing");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const categoryOptions = [
    {
      value: "Plumbing",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-droplet-fill text-blue-600"></i>
          Plumbing
        </div>
      ),
    },
    {
      value: "Electrical",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-lightning-charge-fill text-yellow-500"></i>
          Electrical
        </div>
      ),
    },
    {
      value: "Carpentry",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-hammer text-red-500"></i>
          Carpentry
        </div>
      ),
    },
    {
      value: "Cleaning",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-brush-fill text-green-600"></i>
          Cleaning
        </div>
      ),
    },
  ];

  const priorityOptions = [
    {
      value: "High",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-flag-fill text-red-500"></i>
          High
        </div>
      ),
    },
    {
      value: "Medium",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-flag-fill text-yellow-500"></i>
          Medium
        </div>
      ),
    },
    {
      value: "Low",
      label: (
        <div className="flex items-center gap-2">
          <i className="bi bi-flag-fill text-green-500"></i>
          Low
        </div>
      ),
    },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
      borderRadius: "8px",
      borderColor: "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#2563eb",
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          1
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Request Details
        </h2>
      </div>

      {/* Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Maintenance Category
            <span className="text-red-500">*</span>
          </label>

          <Select
            value={categoryOptions.find(
              x => x.value === requestData.category
            )}
            onChange={(e) => {
              handleChange("category", e.value);
              handleChange("subCategory", "");
            }}
          />
        </div>

        {/* Sub Category */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Sub Category
            <span className="text-gray-400 text-xs">
              {" "}
              (Optional)
            </span>
          </label>

          <select
            value={requestData.subCategory}
            onChange={(e) => handleChange("subCategory", e.target.value)}
            className="w-full border rounded-lg h-11 px-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Sub Category</option>

            {subCategoryData[selectedCategory].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Priority
            <span className="text-red-500">*</span>
          </label>

          <Select
            options={priorityOptions}
            defaultValue={priorityOptions[0]}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
      </div>

      {/* Title */}
      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">
          Title / Subject
          <span className="text-red-500">*</span>
        </label>

        <input
          value={requestData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          type="text"
          placeholder="Water leakage in bathroom tap"
          className="w-full border rounded-lg h-11 px-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="block text-sm font-medium mb-2">
          Description
          <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <textarea
            rows={5}
            maxLength={1000}
            value={requestData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="There is a continuous leakage in the bathroom tap. Please fix it as soon as possible."
            className="w-full border rounded-lg px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span className="absolute bottom-3 right-3 text-xs text-gray-500">
            {requestData.description.length}/1000
          </span>
        </div>
      </div>
    </div>
  );
};