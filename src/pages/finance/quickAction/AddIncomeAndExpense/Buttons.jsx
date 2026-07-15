import React from "react";

export const Buttons = () => {
  return (
    <div className="flex items-center gap-4">
        <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition flex items-center gap-2">
        <i className="bi bi-file-earmark-plus"></i>
        Save Transaction
      </button>

      <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
        <i class="bi bi-file-earmark-plus me-2"></i>
        Save & Add Another
      </button>

      <button className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition">
        Cancel
      </button>

      

      
    </div>
  );
};