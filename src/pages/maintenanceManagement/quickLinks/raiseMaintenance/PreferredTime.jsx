import React, { useState } from "react";

export const PreferredTime = ({ requestData, handleChange }) => {
  const [anyTime, setAnyTime] = useState(false);
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          4
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Preferred Time
          </h2>

          <p className="text-sm text-gray-500">
            Let us know your preferred visit schedule.
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Preferred Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Date
          </label>

          <div className="relative">
            <i className="bi bi-calendar3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="date"
              disabled={requestData.anyTime}
              value={requestData.preferredDate}
              onChange={(e) => handleChange("preferredDate", e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${anyTime ? "bg-gray-100 cursor-not-allowed opacity-60" : ""
                }`}
            />
          </div>
        </div>

        {/* Preferred Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time Slot
          </label>

          <div className="relative">
            <i className="bi bi-clock absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <select
              disabled={requestData.anyTime}
              value={requestData.preferredTime}
              onChange={(e) => handleChange("preferredTime", e.target.value)}
              className={`w-full border border-gray-300 rounded-lg py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${anyTime ? "bg-gray-100 cursor-not-allowed opacity-60" : ""
                }`}
            >
              <option>09:00 AM - 11:00 AM</option>
              <option>11:00 AM - 01:00 PM</option>
              <option>02:00 PM - 04:00 PM</option>
              <option>04:00 PM - 06:00 PM</option>
              <option>06:00 PM - 08:00 PM</option>
            </select>
          </div>
        </div>

      </div>

      {/* Checkbox */}
      <div className="mt-5 flex items-center gap-2">
        <input
          type="checkbox"
          id="anytime"
          checked={requestData.anyTime}
          onChange={(e) => handleChange("anyTime", e.target.checked)}
          className="w-4 h-4 accent-blue-600"
        />

        <label
          htmlFor="anytime"
          className="text-sm text-gray-700 cursor-pointer"
        >
          Any Time is Fine
        </label>
      </div>

    </div>
  );
};