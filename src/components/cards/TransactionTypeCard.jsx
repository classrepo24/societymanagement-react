import React from "react";

export const TransactionTypeCard = ({
  title,
  subtitle,
  icon,
  iconBg,
  iconColor,
  active,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300
      ${
        active
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}
      >
        <i className={`${icon} ${iconColor} text-xl`}></i>
      </div>

      <h3 className="font-bold text-[#1E2A5A]">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    </div>
  );
};