import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const purposeData = [
  { name: "Personal", value: 262 },
  { name: "Delivery", value: 132 },
  { name: "Service", value: 84 },
  { name: "Meeting", value: 40 },
  { name: "Others", value: 24 },
];

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#8b5cf6", "#64748b"];

const timeData = [
  { time: "6 AM", visitors: 5 },
  { time: "7 AM", visitors: 12 },
  { time: "8 AM", visitors: 13 },
  { time: "9 AM", visitors: 24 },
  { time: "10 AM", visitors: 23 },
  { time: "11 AM", visitors: 24 },
  { time: "12 PM", visitors: 24 },
  { time: "1 PM", visitors: 35 },
  { time: "2 PM", visitors: 20 },
  { time: "3 PM", visitors: 18 },
  { time: "4 PM", visitors: 21 },
  { time: "5 PM", visitors: 13 },
  { time: "6 PM", visitors: 12 },
  { time: "7 PM", visitors: 10 },
  { time: "8 PM", visitors: 12 },
  { time: "9 PM", visitors: 5 },
];

const VisitorCharts = ({totalVisitors}) => {

  // ✅ TOTAL FIX

  return (
    <div className="col-span-1 flex flex-col gap-3">

      {/* DONUT CHART */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Visitors by Purpose
        </h2>

        <div className="flex items-center justify-between">

          {/* ✅ FIXED DIV */}
                      <div className="w-40 h-[160px] relative">
  
  {/* CHART (send it behind text) */}
  <div className="absolute inset-0 z-0">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={purposeData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          dataKey="value"
        >
          {purposeData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* CENTER TEXT (force on top) */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
    <p className="text-xs text-gray-500">Total</p>
    <p className="text-lg font-bold text-gray-800">
      {totalVisitors ?? purposeData.reduce((a, b) => a + b.value, 0)}
    </p>
  </div>

</div>

          {/* LEGEND */}
          <div className="space-y-2 text-sm">
            {purposeData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span>{item.name}</span>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Visitors by Time
        </h2>

        <div className="h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} interval={2} />
              <YAxis ticks={[0, 10, 20, 30, 40]} tick={{ fontSize: 12 }} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#0a47cc"
                strokeWidth={3}
                name="Number Of Visitors"
              />

              <Legend
                verticalAlign="bottom"
                iconType="circle"
                formatter={(value) => (
                  <span style={{ color: "#000", fontSize: "14px" }}>
                    {value}
                  </span>
                )}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default VisitorCharts;