import React from "react";

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  bg,
  iconColor,
  extra,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">

        <div
          className={`w-14 h-14 shrink-0 rounded-full flex items-center justify-center ${bg}`}
        >
          <i className={`${icon} ${iconColor} text-2xl`}></i>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 font-semibold uppercase">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-1">
            {value}
          </h2>

          {extra ? (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500">
                {subtitle}
              </span>

              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                {extra}
              </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};