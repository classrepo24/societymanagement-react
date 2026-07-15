import React from "react";

export const DuesCarryForwardSettings = () => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        8. Dues & Carry Forward Settings
      </h2>

      <p className="text-gray-500 text-sm mb-5">
        Manage previous dues and carry forward settings.
      </p>

      <div className="space-y-5">

        {/* Carry Forward */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Carry Forward Previous Dues
          </span>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="w-11 h-6 rounded-full bg-gray-300 transition peer-checked:bg-blue-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Partial Payment */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Allow Partial Payments
          </span>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="w-11 h-6 rounded-full bg-gray-300 transition peer-checked:bg-blue-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Round Off */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Round Off Amounts
          </span>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer sr-only"
            />
            <div className="w-11 h-6 rounded-full bg-gray-300 transition peer-checked:bg-blue-600 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>

        {/* Round Off Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Round Off To
          </label>

          <select className="w-full border border-gray-300 rounded-lg p-2">
            <option>Nearest Rupee</option>
            <option>Nearest 5</option>
            <option>Nearest 10</option>
          </select>
        </div>

      </div>
    </div>
  );
};