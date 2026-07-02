import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { requests } from "../maintenanceData";
// import { RechartsDevtools } from '@recharts/devtools';
const data = [
  { name: "Plumbing", value: requests.filter((item) => item.category === "Plumbing").length, color: "#2563eb" },
  { name: "Electrical", value: requests.filter((item) => item.category === "Electrical").length, color: "#f59e0b" },
  { name: "Civil", value: requests.filter((item) => item.category === "Civil").length, color: "#22c55e" },
  { name: "Gardening", value: requests.filter((item) => item.category === "Gardening").length, color: "#9333ea" },
  { name: "Carpentry", value: requests.filter((item) => item.category === "Carpentry").length, color: "#06b6d4" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export const MaintenanceOverview = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 self-star">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">
        Maintenance Overview
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Chart */}
        <div className="relative w-[280px] h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-5xl font-bold text-slate-900">
              {total}
            </h3>
            <p className="text-xl text-gray-500">
              Total
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-6 w-full">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-xl text-slate-700">
                  {item.name}
                </span>
              </div>

              <div className="font-semibold text-xl text-slate-900">
                {item.value}
                <span className="text-gray-500 ml-2">
                  (
                  {(
                    (item.value / total) *
                    100
                  ).toFixed(2)}
                  %)
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};