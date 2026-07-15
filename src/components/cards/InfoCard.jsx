import React from "react";

export const InfoCard = ({
  title,
  description,
  button,
  icon,
  bg,
  color,
  onClick,
}) => {
  return (
    <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6">
      {/* Top */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}
        >
          <i className={`${icon} ${color} text-2xl`}></i>
        </div>

        {/* Text */}
        <div>
          <h3 className="text-[20px] font-bold text-[#1E2A5A]">
            {title}
          </h3>

          <p className="mt-2 text-[15px] leading-6 text-gray-600">
            {description}
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="mt-5 ml-[70px] text-blue-600 font-semibold text-[15px] hover:text-blue-700 flex items-center gap-2"
      >
        {button}
        <i className="bi bi-arrow-right"></i>
      </button>
    </div>
  );
};