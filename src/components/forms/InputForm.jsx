import React from "react";

export const InputForm = ({
  label,
  required = false,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full h-12 px-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:bg-gray-100"
      />
    </div>
  );
};