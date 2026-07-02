import React from "react";

export const Breadcrumb = ({ items, title, subtitle }) => {
  return (
    <div className="mb-6">

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-2">

        {items.map((item, index) => (
          <div key={index} className="flex items-center">

            <span
              className={`${
                index === items.length - 1
                  ? "text-gray-900 font-medium"
                  : "hover:text-blue-600 cursor-pointer"
              }`}
            >
              {item.label}
            </span>

            {index !== items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}

          </div>
        ))}

      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-500 mt-1">
          {subtitle}
        </p>
      )}

    </div>
  );
};