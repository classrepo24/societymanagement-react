import React from "react";

export const PaymentDetails = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      {/* Heading */}
      <h2 className="text-xl font-bold text-[#1E2A5A] mb-4">
        Payment Details
      </h2>

      {/* Payment Mode + Reference */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-1.5">
            Payment Mode <span className="text-red-500">*</span>
          </label>

          <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select payment mode</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Cheque</option>
            <option>Card</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
            Payment Reference No.
          </label>

          <input
            type="text"
            placeholder="Enter reference number"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Paid By */}
      <div className="mb-5">

        <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
          Paid By / Received From
          <span className="text-red-500">*</span>
        </label>

        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>
            Enter name (e.g., Member, Vendor, Tenant)
          </option>

          <option>Rajesh Kumar</option>
          <option>Priya Sharma</option>
          <option>Amit Verma</option>
          <option>Vendor</option>
        </select>

      </div>

      {/* Bank */}
      <div>

        <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
          Bank Account (Optional)
        </label>

        <select className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
          <option>Select bank account</option>

          <option>HDFC Bank</option>
          <option>SBI</option>
          <option>ICICI Bank</option>
          <option>Axis Bank</option>
        </select>

      </div>

    </div>
  );
};