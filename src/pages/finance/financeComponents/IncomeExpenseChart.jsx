import React, { useState } from "react";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);

const chartData = {
    "This Month": {
        labels: [
            "01 May",
            "03 May",
            "06 May",
            "09 May",
            "11 May",
            "14 May",
            "16 May",
            "19 May",
            "21 May",
            "23 May",
            "24 May",
        ],
        income: [0.2, 0.7, 1.4, 2, 2.1, 2.7, 2.8, 3.5, 3.8, 4, 4.5],
        expense: [0.05, 0.3, 0.55, 1.05, 1.1, 1.55, 1.5, 1.75, 1.75, 2.1, 2],
    },

    "Last Month": {
        labels: [
            "01 Apr",
            "03 Apr",
            "06 Apr",
            "09 Apr",
            "12 Apr",
            "15 Apr",
            "18 Apr",
            "21 Apr",
            "24 Apr",
            "27 Apr",
            "30 Apr",
        ],
        income: [0.1, 0.5, 1, 1.6, 2, 2.2, 2.8, 3.1, 3.4, 3.8, 4],
        expense: [0.1, 0.2, 0.4, 0.8, 1, 1.2, 1.4, 1.6, 1.7, 1.8, 2],
    },

    "This Year": {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        income: [2, 2.5, 3, 4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
        expense: [1, 1.3, 1.8, 2.5, 3, 3.4, 4, 4.3, 4.7, 5, 5.3, 5.6],
    },
};

export const IncomeExpenseChart = () => {
    const [filter, setFilter] = useState("This Month");
    const current = chartData[filter];
    const data = {
        labels: current.labels,

        datasets: [
            {
                label: "Income",
                data: current.income,
                borderColor: "#16a34a",
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(34,197,94,.22)");
                    gradient.addColorStop(1, "rgba(34,197,94,0)");
                    return gradient;
                },
                fill: true,
                tension: .42,
                borderWidth: 2,
                pointRadius: 2.8,
                pointHoverRadius: 5,
                pointBorderWidth: 2,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#16a34a",
            },
            {
                label: "Expenses",
                data: current.expense,
                borderColor: "#ff3b30",
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(0, 0, 0, chartArea.bottom);
                    gradient.addColorStop(0, "rgba(255,59,48,.18)");
                    gradient.addColorStop(1, "rgba(255,59,48,0)");
                    return gradient;
                },
                fill: true,
                tension: .42,
                borderWidth: 2,
                pointRadius: 2.8,
                pointHoverRadius: 5,
                pointBorderWidth: 2,
                pointBackgroundColor: "#fff",
                pointBorderColor: "#ff3b30",
            },
        ],
    };
    const maxValue = Math.max(
        ...current.income,
        ...current.expense
    );
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: "index",
            intersect: false,
        },
        plugins: {
            legend: {
                position: "top",
                align: "start",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 30,
                    color: "#1e3a8a",
                    font: {
                        size: 14,
                        weight: "600",
                    },
                },
            },
            tooltip: {
                backgroundColor: "#fff",
                titleColor: "#111827",
                bodyColor: "#111827",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                displayColors: true,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: "#1e3a8a",
                    font: {
                        weight: "500",
                    },
                },
            },
            y: {
                beginAtZero: true,
                max: Math.ceil(maxValue + 1),
                ticks: {
                    stepSize: 1,
                    callback: (value) => `₹${value}L`,
                },
                grid: {
                    color: "#edf2f7",
                    drawBorder: false,
                },
                border: {
                    display: false,
                },
            },
        },
    };
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">

                <h2 className="text-[22px] font-bold text-[#1E2A5A]">
                    Income vs Expenses (This Month)
                </h2>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none bg-white cursor-pointer"

                >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>

            </div>

            {/* Chart */}
            <div className="h-[300px]">
                <Line data={data} options={options} />
            </div>

        </div>
    );
};
