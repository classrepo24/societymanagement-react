import React from 'react'

export const PaymentSettings = () => {
  const paymentMethods = [
    "Cash",
    "Credit / Debit Card",
    "Cheque",
    "Net Banking",
    "Bank Transfer",
    "Razorpay / Online",
    "UPI",
  ];
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        5. Payment Settings
      </h2>

      <p className="text-sm text-gray-500 mb-5">
        Select and manage accepted payment methods.
      </p>

      <div className="grid grid-cols-2 gap-y-3 gap-x-6">
        {paymentMethods.map((method) => (
          <label
            key={method}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-blue-600"
            />

            {method}
          </label>
        ))}
      </div>

      <div className="mt-5 bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-gray-700">
        ℹ️ Online payments will reflect automatically.
      </div>
    </div>
  )
}
