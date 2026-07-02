import React, { useState } from 'react'

export const InterestSettings = () => {
  const [interestEnabled, setInterestEnabled] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Heading */}
      <h2 className="text-lg font-semibold text-slate-800">
        4. Interest Settings
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Configure interest on overdue payments.
      </p>

      {/* Interest Toggle */}
      <div className="flex items-center justify-between mt-6">
        <label className="text-sm font-medium text-gray-700">
          Interest
        </label>

        <button
          onClick={() => setInterestEnabled(!interestEnabled)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${interestEnabled ? "bg-blue-600" : "bg-gray-300"
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${interestEnabled ? "translate-x-5" : ""
              }`}
          ></span>
        </button>
      </div>

      {/* Interest Rate */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Interest Rate (%)
        </label>

        <div className="flex items-center gap-2">
          <input
            type="number"
            defaultValue={18}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span className="text-sm text-gray-500 whitespace-nowrap">
            % per annum
          </span>
        </div>
      </div>

      {/* Frequency */}
      <div className="mt-6 flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
          Interest Frequency
        </label>

        <select className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Half Yearly</option>
          <option>Yearly</option>
        </select>
      </div>
    </div>

  )
}
