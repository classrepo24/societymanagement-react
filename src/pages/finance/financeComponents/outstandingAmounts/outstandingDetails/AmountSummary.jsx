import React from "react";

export const AmountSummary = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">

      <h3 className="text-lg font-semibold text-[#1E2A5A] mb-6">
        Amount Summary
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-4">

        {/* Invoice Amount */}

        <div>
          <p className="text-sm text-gray-500">
            Invoice Amount
          </p>

          <h3 className="text-2xl font-bold text-[#1E2A5A] mt-2">
            ₹{data.amount.toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Paid */}

        <div className="lg:border-l lg:pl-8">
          <p className="text-sm text-gray-500">
            Paid Amount
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-2">
            ₹{data.paidAmount.toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Outstanding */}

        <div className="lg:border-l lg:pl-8 mt-6 lg:mt-0">
          <p className="text-sm text-gray-500">
            Outstanding Amount
          </p>

          <h3 className="text-2xl font-bold text-red-600 mt-2">
            ₹{data.outstandingAmount.toLocaleString("en-IN")}
          </h3>
        </div>

        {/* Days */}

        <div className="lg:border-l lg:pl-8 mt-6 lg:mt-0">
          <p className="text-sm text-gray-500">
            Days Overdue
          </p>

          <h3 className="text-2xl font-bold text-red-600 mt-2">
            {data.days} Days
          </h3>
        </div>

      </div>

    </div>
  );
};