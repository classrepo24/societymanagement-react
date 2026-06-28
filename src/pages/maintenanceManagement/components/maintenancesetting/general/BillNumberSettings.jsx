import React from "react";

export const BillNumberSettings = () => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold">
        7. Bill Number Settings
      </h2>

      <p className="text-gray-500 text-sm mb-5">
        Customize your maintenance bill number format.
      </p>

      <label className="text-sm font-medium">
        Bill Number Format
      </label>

      <select className="w-full border rounded-lg mt-2 p-2">
        <option>
          INV-(YYYY)-(MM)-(0000)
        </option>
      </select>

      <div className="mt-5 border rounded-lg bg-gray-50 p-4">
        <p className="text-blue-600 text-sm">
          Preview
        </p>

        <h3 className="font-semibold mt-2">
          INV-2025-05-0001
        </h3>
      </div>

      <div className="text-sm mt-5 text-gray-600 space-y-2">
        <p>Where,</p>

        <p>• (YYYY) - Year (2025)</p>

        <p>• (MM) - Month (05)</p>

        <p>• (0000) - Sequence Number (0001)</p>
      </div>
    </div>
  );
};

