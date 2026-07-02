import React from 'react'

export const BillingCycleSetting = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Heading */}
      <h2 className="text-lg font-semibold text-slate-800">
        2. Billing Cycle Settings
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        Configure how bills are generated and due dates are set.
      </p>

      {/* Top Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Billing Cycle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Billing Cycle
          </label>

          <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>
        </div>

        {/* Bill Generation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bill Generation Date
          </label>

          <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option>1st of Every Month</option>
            <option>5th of Every Month</option>
            <option>10th of Every Month</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Due Date
          </label>

          <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            <option>10th of Every Month</option>
            <option>15th of Every Month</option>
            <option>20th of Every Month</option>
          </select>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 items-end">
        {/* Grace Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grace Period (Days)
          </label>

          <div className="relative">
            <input
              type="number"
              defaultValue={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-14 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              days
            </span>
          </div>
        </div>

        {/* Next Bill Date */}
        <div className="flex items-center gap-4 bg-green-50 border border-green-100 rounded-lg px-5 py-5">
          <div className="h-11 w-11 flex items-center justify-center rounded-lg bg-white border border-green-200">
            <i className="bi bi-calendar3 text-green-600 text-xl"></i>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Next Bill Date
            </p>

            <h3 className="text-xl font-bold text-green-700">
              01 Jun 2025
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}
