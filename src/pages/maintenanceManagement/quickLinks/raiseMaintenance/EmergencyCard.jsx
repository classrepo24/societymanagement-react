import React from "react";

export const EmergencyCard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <i className="bi bi-telephone-fill text-red-600 text-2xl"></i>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Need Immediate Help?
        </h2>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Content */}
      <p className="text-gray-600 text-sm">
        For urgent issues, please contact
      </p>

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        Maintenance Team
      </h3>

      <a
        href="tel:+919876543210"
        className="block mt-4 text-xl font-bold text-blue-600 hover:underline"
      >
        +91 98765 43210
      </a>

      <p className="mt-5 text-gray-500 text-sm">
        Available 24 × 7
      </p>
    </div>
  );
};