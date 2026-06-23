import React, { useState } from "react";
import { requests } from "../data/maintenanceData";


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
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-4 h-4 rounded-full ${item.color}`}
                                    />

                                    {index !== displayRequests.length - 1 && (
                                        <div className="w-[2px] h-16 bg-gray-200 mt-1" />
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 text-lg mt-1">
                                        Requested by {item.resident}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="flex items-center gap-8">
                                <span
                                    className={`px-4 py-2 rounded-xl text-sm font-medium ${item.badge}`}
                                >
                                    {item.status}
                                </span>

                                <span className="text-gray-600 font-medium min-w-[90px] text-right">
                                    {item.time}
                                </span>
                            </div>
                        </div>

                        {index !== requests.length - 1 && (
                            <div className="border-b border-gray-200 mt-5" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};