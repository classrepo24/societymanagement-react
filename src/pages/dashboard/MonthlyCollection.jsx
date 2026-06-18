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
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        
        <h2 className="text-lg font-semibold">
          Monthly Collection
        </h2>

        <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
          <option>this year</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          
          <LineChart data={data}>
            
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
              dataKey="collected"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={true}
            />

            <Line
              type="monotone"
              dataKey="expected"
              stroke="#10b981"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
<div className="flex gap-3 mt-4">
  <div className="flex-1 bg-blue-50 rounded-lg p-3">
    <div className="flex justify-between items-center">
      <div>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
        <i className="bi bi-cash-stack text-blue-600"></i>
      </div>
        <p className="text-xs text-gray-500">
          Total Collected
        </p>

        <h3 className="text-lg font-bold text-gray-800">
          ₹4,58,200
        </h3>
      </div>

      
    </div>
  </div>

  <div className="flex-1 bg-green-50 rounded-lg p-3">
    <div className="flex justify-between items-center">
      <div>
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
        <i className="bi bi-wallet2 text-green-600"></i>
      </div>
        <p className="text-xs text-gray-500">
          Total Expected
        </p>

        <h3 className="text-lg font-bold text-gray-800">
          ₹5,00,000
        </h3>
      </div>

      
    </div>
  </div>

  <div className="flex-1 bg-purple-50 rounded-lg p-3">
    <div className="flex justify-between items-center">
      <div>
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
        <i className="bi bi-graph-up-arrow text-purple-600"></i>
      </div>
        <p className="text-xs text-gray-500">
          Collection Rate
        </p>

        <h3 className="text-lg font-bold text-gray-800">
          91.6%
        </h3>
      </div>

      
    </div>
  </div>
</div>

    </div>
  );
};