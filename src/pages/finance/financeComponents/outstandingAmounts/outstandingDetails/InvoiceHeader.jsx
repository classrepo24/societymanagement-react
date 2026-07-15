import React from "react";

export const InvoiceHeader = ({ data }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6">

      <div className="grid grid-cols-12 gap-6 items-center">

        {/* Left */}

        <div className="col-span-12 lg:col-span-4 flex gap-5">

          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

            <i className="bi bi-file-earmark-text text-3xl text-blue-600"></i>

          </div>

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-2xl font-bold text-[#1E2A5A]">
                Invoice {data.invoice}
              </h2>

              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full">
                {data.status}
              </span>

            </div>

            <p className="mt-3 text-sm text-gray-500">
              {data.type}
            </p>

            <h4 className="font-semibold text-lg">
              {data.flat} ({data.name})
            </h4>

            <p className="text-gray-500">
              {data.apartment}
            </p>

          </div>

        </div>

        {/* Category */}

        <div className="col-span-6 lg:col-span-2">

          <p className="text-gray-500 text-sm">
            Category
          </p>

          <h4 className="font-semibold">
            {data.category}
          </h4>

          <p className="text-gray-500">
            {data.billingPeriod}
          </p>

        </div>

        {/* Invoice Date */}

        <div className="col-span-6 lg:col-span-2">

          <p className="text-gray-500 text-sm">
            Invoice Date
          </p>

          <h4 className="font-semibold">
            {data.invoiceDate}
          </h4>

        </div>

        {/* Due Date */}

        <div className="col-span-6 lg:col-span-2">

          <p className="text-gray-500 text-sm">
            Due Date
          </p>

          <h4 className="font-semibold text-red-600">
            {data.dueDate}
          </h4>

        </div>

        {/* Amount */}

        <div className="col-span-6 lg:col-span-2">

          <p className="text-gray-500 text-sm">
            Outstanding Amount
          </p>

          <h2 className="text-4xl font-bold text-[#1E2A5A]">
            ₹{data.outstandingAmount.toLocaleString("en-IN")}
          </h2>

        </div>

      </div>

    </div>
  );
};