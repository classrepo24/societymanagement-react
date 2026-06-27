import React, { useState } from "react";
import { requests } from "../data/maintenanceData";

const badgeStyles = {
    Pending: "bg-yellow-100 text-yellow-600",
    "In Progress": "bg-blue-100 text-blue-600",
    Completed: "bg-green-100 text-green-600",
    Overdue: "bg-red-100 text-red-600",
}
const dotStyles = {
    Pending: "bg-yellow-500",
    "In Progress": "bg-blue-500",
    Completed: "bg-green-500",
    Overdue: "bg-red-500",
};


export const RecentMaintenance = () => {
    const [showAll, setShowAll] = useState(false);
    const recentRequests = [...requests].slice(-3).reverse();

    const displayRequests = showAll ? requests : recentRequests;
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-900">
                    Recent Maintenance Requests
                </h2>

                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-blue-600 font-semibold hover:text-blue-700"
                >
                    {showAll ? "Show Recent" : "View All"}
                </button>
            </div>

            {/* Requests */}
            <div className="space-y-6">
                {displayRequests.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex items-start justify-between">

                            {/* Left Side */}
                            <div className="flex gap-4">
                                {/* Timeline */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-3 h-3 rounded-full ${dotStyles[item.status]}`}
                                    />

                                    {index !== displayRequests.length - 1 && (
                                        <div className="w-[2px] h-16 bg-gray-300" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pb-5">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Requested by {item.resident}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-8">
                                <span
                                    className={`px-3 py-1 rounded text-sm ${badgeStyles[item.status]}`}
                                >
                                    {item.status}
                                </span>

                                <span className="text-gray-600 font-medium min-w-[90px] text-right">
                                    {item.time}
                                </span>
                            </div>
                        </div>

                        {index !== displayRequests.length - 1 && (
                            <div className="flex mt-3">
                                {/* Vertical line continuation */}
                                <div className="ml-[5px] w-[2px] h-4 bg-gray-300"></div>

                                {/* Horizontal border */}
                                <div className="flex-1 border-b border-gray-200"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};