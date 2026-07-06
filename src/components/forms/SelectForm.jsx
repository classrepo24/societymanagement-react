import React from "react";

export const SelectForm = ({
  label,
  required = false,
  options = [],
  value,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select</option>

        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};