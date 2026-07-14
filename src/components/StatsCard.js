import React from "react";

const StatsCard = ({
  icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",

  title,
  value,
  subtitle,

  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        border border-[#E5E7EB]
        rounded-2xl
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        px-5
        py-5
        ${className}
      `}
    >
      <div className="flex items-center gap-4">

        {/* Icon */}
        <div
          className={`
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            shrink-0
            ${iconBg}
          `}
        >
          <i className={`${icon} text-[26px] ${iconColor}`}></i>
        </div>

        {/* Content */}
        <div className="flex flex-col">

          <p className="text-[14px] font-medium text-[#6B7280]">
            {title}
          </p>

          <h2 className="text-[22px] font-bold text-[#111827] mt-1">
            {value}
          </h2>

          {subtitle && (
            <p className="text-[13px] text-[#9CA3AF] mt-1">
              {subtitle}
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default StatsCard;