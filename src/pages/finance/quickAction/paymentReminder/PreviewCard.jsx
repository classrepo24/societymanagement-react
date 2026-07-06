import React from "react";

export const PreviewCard = ({ message }) => {
    const previewMessage = message
        .replaceAll("{member_name}", "Amit Verma")
        .replaceAll("{flat_no}", "A-403")
        .replaceAll("{due_amount}", "₹2,450")
        .replaceAll("{due_date}", "24 May 2025");
    return (
        <div className="bg-white">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-lg font-semibold text-[#1E2A5A]">
                    Preview
                </h2>

                <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-[#1E2A5A] hover:bg-gray-50 transition">
                    <i className="bi bi-eye text-sm"></i>
                    Preview Message
                </button>

            </div>

            {/* Preview Box */}
            <div className="border border-gray-200 rounded-xl bg-[#F8FAFC] p-5 min-h-[280px]">

                <div className="text-[15px] text-[#1E2A5A] whitespace-pre-wrap leading-7 font-medium">
                    {previewMessage}
                </div>

            </div>

        </div>
    );
};