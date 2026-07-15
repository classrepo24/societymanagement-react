import React from "react";

export const LocationDetails = ({ requestData, handleChange }) => {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          2
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Location Details
        </h2>
      </div>

      {/* Three Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Flat / Unit */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Flat / Unit
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="relative">
            <select
              value={requestData.flat}
              onChange={(e) => handleChange("flat", e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option>A-101</option>
              <option>A-102</option>
              <option>A-103</option>
              <option>B-101</option>
              <option>B-102</option>
            </select>

            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Location (Within Flat / Society)
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="relative">
            <select
              value={requestData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option>Bathroom</option>
              <option>Kitchen</option>
              <option>Bedroom</option>
              <option>Balcony</option>
              <option>Parking</option>
              <option>Terrace</option>
            </select>

            <i className="bi bi-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
          </div>
        </div>

        {/* Landmark */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Area / Landmark
            <span className="text-gray-400 text-xs ml-1">(Optional)</span>
          </label>

          <input
            value={requestData.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
            type="text"
            placeholder="E.g. Near wash basin"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

    </div>
  );
};