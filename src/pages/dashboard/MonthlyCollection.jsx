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

export const MonthlyCollection = () => {
  const data = [
    { month: "Jan", collected: 170000, expected: 100000 },
    { month: "Feb", collected: 240000, expected: 170000 },
    { month: "Mar", collected: 260000, expected: 210000 },
    { month: "Apr", collected: 250000, expected: 250000 },
    { month: "May", collected: 330000, expected: 280000 },
    { month: "Jun", collected: 250000, expected: 320000 },
    { month: "Jul", collected: 290000, expected: 380000 },
    { month: "Aug", collected: 350000, expected: 390000 },
    { month: "Sep", collected: 420000, expected: 380000 },
    { month: "Oct", collected: 320000, expected: 370000 },
    { month: "Nov", collected: 380000, expected: 400000 },
    { month: "Dec", collected: 370000, expected: 420000 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 h-full overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            Monthly Collection
          </h2>
          <p className="text-xs text-gray-500">
            Collected vs Expected Amount
          </p>
        </div>

        <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs bg-white shadow-sm">
          <option>This Year</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* CHART (REDUCED HEIGHT FIX) */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />
            <Legend verticalAlign="top" />

            <Line
              type="monotone"
              dataKey="collected"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={{ r: 2 }}
            />

            <Line
              type="monotone"
              dataKey="expected"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* STATS (COMPACT) */}
      <div className="grid grid-cols-3 gap-2 mt-3">

        <div className="bg-blue-50 rounded-lg p-2">
          <p className="text-[10px] text-gray-500"> Total Collected</p>
          <h3 className="text-sm font-bold text-gray-800">₹4.58L</h3>
        </div>

        <div className="bg-green-50 rounded-lg p-2">
          <p className="text-[10px] text-gray-500"> Total Expected</p>
          <h3 className="text-sm font-bold text-gray-800">₹5.00L</h3>
        </div>

        <div className="bg-purple-50 rounded-lg p-2">
          <p className="text-[10px] text-gray-500">Collection Rate</p>
          <h3 className="text-sm font-bold text-gray-800">91.6%</h3>
        </div>

      </div>

    </div>
  );
};