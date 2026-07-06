import React from "react";

export const ResidentDetails = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            {/* Heading */}
            <h3 className="text-lg font-semibold text-[#1E2A5A] mb-5">
                Resident Details
            </h3>

            {/* Profile */}
            <div className="flex items-start gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">

                    <i className="bi bi-person text-2xl text-blue-600"></i>

                </div>

                <div className="flex-1">

                    <h4 className="text-[15px] font-semibold text-[#1E2A5A]">
                        {data.name}
                    </h4>

                    <p className="text-sm text-gray-600 mt-1">
                        {data.flat}, {data.apartment}
                    </p>

                    <div className="flex items-center gap-2 mt-4 text-sm text-[#1E2A5A]">

                        <span>{data.mobile}</span>

                        <span className="text-gray-400">•</span>

                        <span className="break-all">
                            {data.email}
                        </span>

                    </div>

                </div>

            </div>

            {/* Button */}

            <button className="mt-6 w-[50%] border border-gray-200 bg-slate-100 rounded-lg px-4 py-3 flex items-center justify-center gap-3 text-[#1E2A5A] font-medium hover:bg-gray-50 transition">

                <i className="bi bi-person"></i>

                View Resident Profile

            </button>

        </div>
    );
};