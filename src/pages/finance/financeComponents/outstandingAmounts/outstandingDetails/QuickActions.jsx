import React from "react";

export const QuickActions = () => {

    const actions = [
        {
            icon: "bi-send",
            title: "Send Payment Reminder",
        },
        {
            icon: "bi-arrow-clockwise",
            title: "Record Payment",
        },
        {
            icon: "bi-download",
            title: "Download Invoice",
        },
        {
            icon: "bi-clock-history",
            title: "View Payment History",
        },
        {
            icon: "bi-pencil",
            title: "Edit Invoice",
        },
    ];

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <h3 className="text-lg font-semibold text-[#1E2A5A] mb-4">
                Quick Actions
            </h3>

            <div className="space-y-3 w-[50%]">

                {actions.map((item, index) => (

                    <button
                        key={index}
                        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >

                        <i className={`bi ${item.icon} text-[#1E2A5A] text-lg`}></i>

                        <span className="text-sm font-medium text-[#1E2A5A]">
                            {item.title}
                        </span>

                    </button>

                ))}

            </div>

        </div>
    );
};