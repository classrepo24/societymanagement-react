import React from "react";

export const MemberCard = ({ member }) => {
  if (!member) return null;

  return (
    <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between bg-white">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg uppercase">
          {member.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .slice(0, 2)}
        </div>

        {/* Member Info */}
        <div>
          <h3 className="font-semibold text-[#1E2A5A] text-base">
            {member.name}
          </h3>

          <p className="text-sm text-gray-500">
            {member.flat}
            {member.block && `, ${member.block}`}
          </p>
        </div>

      </div>

      {/* Right */}
      <div className="text-right">

        <p className="text-sm text-gray-500">
          Due Amount
        </p>

        <h3
          className={`text-lg font-bold ${
            member.due === "₹0" || member.due === "₹0.00"
              ? "text-green-600"
              : "text-blue-600"
          }`}
        >
          {member.due}
        </h3>

      </div>

    </div>
  );
};