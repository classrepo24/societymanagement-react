import React from 'react'

export const LateFeeSettings = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        3. Late Fee & Penalty Settings
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Configure penalty for late payments.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Penalty Type
          </label>

          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option>Fixed Amount</option>
            <option>Percentage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Penalty Amount (₹)
          </label>

          <input
            type="number"
            defaultValue="100"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Apply After (Days)
          </label>

          <div className="flex">
            <input
              type="number"
              defaultValue="1"
              className="w-full border border-r-0 rounded-l-md px-3 py-2 text-sm"
            />

            <span className="border rounded-r-md px-3 flex items-center bg-gray-50 text-sm">
              day(s)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between bg-green-50 border border-green-100 rounded-lg p-3">
        <span className="text-sm text-gray-700">
          ₹100 will be charged after due date.
        </span>

        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            defaultChecked
            className="peer sr-only"
          />

          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
        </label>
      </div>
    </div>

  )

}
