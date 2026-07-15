import React from "react";
import { useNavigate } from "react-router-dom";

export const OutstandingAmounts = () => {
  const navigate = useNavigate();

  const data = [
    {
      block: "Block A",
      amount: "₹85,250.00",
    },
    {
      block: "Block B",
      amount: "₹76,400.00",
    },
    {
      block: "Block C",
      amount: "₹54,100.00",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-[20px] font-bold text-[#1E2A5A]">
          Outstanding Amounts
        </h2>

        <button 
        onClick={() => navigate("/finance/outstanding_amount/view_all")} className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition">
          View All
        </button>

      </div>

      {/* List */}
      <div className="space-y-5">

        {data.map((item, index) => (

          <div
            key={index}
            className="flex justify-between items-center"
          >
            <span className="text-[16px] font-medium text-[#1E2A5A]">
              {item.block}
            </span>

            <span className="text-[16px] font-semibold text-red-600">
              {item.amount}
            </span>
          </div>

        ))}

      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-5"></div>

      {/* Total */}
      <div className="flex justify-between items-center">

        <span className="text-[18px] font-semibold text-[#1E2A5A]">
          Total
        </span>

        <span className="text-[20px] font-bold text-red-600">
          ₹2,15,750.00
        </span>

      </div>

    </div>
  );
};
