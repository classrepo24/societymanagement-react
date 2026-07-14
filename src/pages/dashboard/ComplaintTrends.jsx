import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export const ComplaintTrends = () => {
  const data = [
    { month: "Jan", open: 45, inProgress: 25, resolved: 10 },
    { month: "Feb", open: 50, inProgress: 28, resolved: 15 },
    { month: "Mar", open: 48, inProgress: 30, resolved: 18 },
    { month: "Apr", open: 55, inProgress: 35, resolved: 22 },
    { month: "May", open: 52, inProgress: 32, resolved: 25 },
    { month: "Jun", open: 47, inProgress: 29, resolved: 20 },
    { month: "Jul", open: 58, inProgress: 38, resolved: 28 },
    { month: "Aug", open: 62, inProgress: 40, resolved: 30 },
    { month: "Sep", open: 56, inProgress: 36, resolved: 27 },
    { month: "Oct", open: 60, inProgress: 42, resolved: 32 },
    { month: "Nov", open: 54, inProgress: 34, resolved: 24 },
    { month: "Dec", open: 49, inProgress: 31, resolved: 21 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Complaint Trends
          </h2>
          <p className="text-xs text-gray-500">
            Open vs In Progress vs Resolved
          </p>
        </div>

        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm">
          <option>Last 6 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* CHART */}
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ left: -10, right: 10, top: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Legend verticalAlign="top" />

            <Line
              type="monotone"
              dataKey="open"
              name="Open"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 3 }}
            />

            <Line
              type="monotone"
              dataKey="inProgress"
              name="In Progress"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 3 }}
            />

            <Line
              type="monotone"
              dataKey="resolved"
              name="Resolved"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};