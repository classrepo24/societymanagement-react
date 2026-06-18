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
    <div className="bg-white p-6 rounded-xl shadow-sm ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">
          Complaint Trends
        </h2>

        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>Last 6 Months</option>
        </select>
      </div>

      <div className="h-[363px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}
            margin={{
              left: -30,
              right: 10,
              top: 10,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />
            <Legend
  verticalAlign="top"
  align="center"
  height={36}
/>

            <Line
              type="monotone"
              dataKey="open"
              stroke="#ef4444"
              strokeWidth={3}
              dot={true}
              name="Open"
            />

            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#22c55e"
              strokeWidth={3}
              dot={true}
              name="Resolved"
            />

            <Line
              type="monotone"
              dataKey="inProgress"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={true}
              name="In Progress"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};