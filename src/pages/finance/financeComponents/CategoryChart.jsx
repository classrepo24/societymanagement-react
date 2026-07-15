import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const CategoryChart = () => {
    const data = {
        labels: [
            "Maintenance",
            "Parking",
            "Events",
            "Penalty",
            "Others",
        ],
        datasets: [
            {
                data: [45, 20, 15, 10, 10],
                backgroundColor: [
                    "#2563eb", // Blue
                    "#22c55e", // Green
                    "#f59e0b", // Yellow
                    "#ef4444", // Red
                    "#8b5cf6", // Purple
                ],
                borderWidth: 0,
                cutout: "72%",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },
        },
    };

    const categories = [
        {
            name: "Maintenance",
            amount: "₹5,78,000",
            color: "bg-blue-600",
        },
        {
            name: "Parking",
            amount: "₹2,45,000",
            color: "bg-green-500",
        },
        {
            name: "Events",
            amount: "₹1,52,000",
            color: "bg-yellow-500",
        },
        {
            name: "Penalty",
            amount: "₹96,000",
            color: "bg-red-500",
        },
        {
            name: "Others",
            amount: "₹72,000",
            color: "bg-purple-500",
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-full">

            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Income by Category
                    </h2>
                    <p className="text-sm text-gray-500">
                        Current Month
                    </p>
                </div>

                <button className="text-gray-500 hover:text-black">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
            </div>

            {/* Chart + Categories */}
            <div className="flex items-center justify-between gap-6 mt-6">

                {/* Doughnut */}
                <div className="relative w-44 h-44 flex-shrink-0">
                    <Doughnut data={data} options={options} />

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <p className="text-xl font-bold text-gray-800">₹12.8L</p>
                        <span className="text-xs text-gray-500">Total</span>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex-1 space-y-3">
                    {categories.map((item, index) => (
                        <div key={index} className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${item.color}`}></span>

                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.amount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹12,85,600</span>
                    </div>
                </div>

            </div>

        </div>
    );
};