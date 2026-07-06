import React from "react";
import { TopPayersViewAll } from "./TopPayersViewAll";

export const TopPayersModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-6xl shadow-2xl overflow-hidden animate-[fadeIn_.2s_ease]"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-8 py-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-[#1E2A5A]">
              Top Payers
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              These residents have made the highest payments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Export */}
            <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2">
              <i className="bi bi-download"></i>
              Export
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              <i className="bi bi-x-lg text-xl"></i>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          <TopPayersViewAll />
        </div>
      </div>
    </div>
  );
};