import React from "react";

export const InvoiceDetails = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 min-h-[356px]">

      <h2 className="text-lg font-bold text-[#1E2A5A] mb-6">
        Invoice Details
      </h2>

      {/* Invoice Date & Due Date */}
      <div className="grid grid-cols-2 gap-4 mb-5">

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
            Invoice Date
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <i className="bi bi-calendar3 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text"
              value="24 May 2025"
              readOnly
              className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-3 outline-none bg-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
            Due Date
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <i className="bi bi-calendar3 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

            <input
              type="text"
              value="07 June 2025"
              readOnly
              className="w-full border border-gray-300 rounded-lg py-3 pl-11 pr-3 outline-none bg-white"
            />
          </div>
        </div>

      </div>

      {/* Invoice No & Reference */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
            Invoice No.
          </label>

          <input
            type="text"
            value="INV-2025-000124"
            readOnly
            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 outline-none"
          />

          <p className="text-xs text-gray-500 mt-1">
            Auto generated
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
            Reference (Optional)
          </label>

          <input
            type="text"
            placeholder="Enter reference (e.g., May Maintenance)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

    </div>
  );
};