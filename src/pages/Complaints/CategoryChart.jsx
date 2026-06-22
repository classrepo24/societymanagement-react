import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Plumbing", value: 45 },
  { name: "Electrical", value: 35 },
  { name: "Cleanliness", value: 25 },
  { name: "Security", value: 30 },
  { name: "Parking", value: 10 },
  { name: "Others", value: 11 },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#6B7280",
];

export const CategoryChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full">
      
      {/* TITLE */}
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Complaints by Category
      </h2>

      {/* RESPONSIVE LAYOUT */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full">

        {/* PIE CHART */}
        <div className="relative w-full sm:w-[160px] h-[160px] flex items-center justify-center">
          
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xl font-bold text-gray-800">{total}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="w-full flex-1 flex flex-col gap-2">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between">
              
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: COLORS[i] }}
                />
                <span className="text-gray-600 text-xs truncate">
                  {item.name}
                </span>
              </div>

              <span className="text-gray-500 text-xs ml-2">
                {item.value}
              </span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};