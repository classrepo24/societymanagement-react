import React from "react";

export const InvoiceButtons = () => {
    return (
        <div className="flex items-center justify-between mt-6">

            {/* Left Buttons */}
            <div className="flex flex-wrap gap-3">

                <button className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition">
                    <i className="bi bi-eye"></i>
                    Preview Invoice
                </button>

                <button className="px-5 py-3 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1E2A5A] flex items-center gap-2 transition">
                    <i className="bi bi-download"></i>
                    Download PDF
                </button>

                <button className="px-5 py-3 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1E2A5A] flex items-center gap-2 transition">
                    <i className="bi bi-send"></i>
                    Send Invoice
                </button>

                <button className="px-5 py-3 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1E2A5A] flex items-center gap-2 transition">
                    <i className="bi bi-file-earmark"></i>
                    Save as Draft
                </button>

            </div>

            {/* Right Button */}
            <button className="px-6 py-3 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-sm font-medium text-[#1E2A5A] transition">
                Cancel
            </button>

        </div>
    );
};