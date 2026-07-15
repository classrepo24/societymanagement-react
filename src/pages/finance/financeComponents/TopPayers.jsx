import React, { useState } from "react";
import { TopPayersModal } from "./topPayers/TopPayersModal";
import { useNavigate } from "react-router-dom";

export const TopPayers = () => {
  const navigate = useNavigate();
  const payers = [
    {
      flat: "A-101",
      name: "Rajesh Kumar",
      amount: "₹12,000.00",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      flat: "B-203",
      name: "Priya Sharma",
      amount: "₹11,000.00",
      color: "bg-red-100",
      iconColor: "text-red-500",
    },
    {
      flat: "C-302",
      name: "Amit Verma",
      amount: "₹10,500.00",
      color: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-lg font-bold text-[#1E2A5A]">
          Top Payers (This Month)
        </h2>

        <button
        onClick={() => navigate("/finance/top_payers/view_all")}
          className="text-blue-600 font-semibold text-sm"
        >
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-5">

        {payers.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between"
          >

            {/* Left */}
            <div className="flex items-center gap-3">

              <div
                className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center`}
              >
                <i
                  className={`bi bi-person ${item.iconColor} text-lg`}
                ></i>
              </div>

              <span className="font-medium text-[#1E2A5A]">
                {item.flat} | {item.name}
              </span>

            </div>

            {/* Right */}
            <span className="font-semibold text-[#1E2A5A]">
              {item.amount}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};