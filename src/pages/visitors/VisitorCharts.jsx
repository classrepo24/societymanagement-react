import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f59e0b", "#8b5cf6", "#64748b"];

const VisitorCharts = ({ totalVisitors, visitors }) => {

  //  DONUT DATA (REAL)
  const purposeData = [
    {
      name: "Personal",
      value: visitors.filter(v => v.purpose === "Personal").length
    },
    {
      name: "Delivery",
      value: visitors.filter(v => v.purpose === "Delivery").length
    },
    {
      name: "Service",
      value: visitors.filter(v => v.purpose === "Service").length
    },
    {
      name: "Meeting",
      value: visitors.filter(v => v.purpose.includes("Meeting")).length
    },
    {
      name: "Others",
      value: visitors.filter(v =>
        !["Personal", "Delivery", "Service", "Meeting"].includes(v.purpose)
      ).length
    }
  ];

  // LINE CHART DATA (REAL)
  const timeData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    visitors: visitors.filter(v =>
      parseInt(v.inTime.split(":")[0]) === i
    ).length
  }));

  const total =
    purposeData.reduce((sum, item) => sum + item.value, 0);
    
    const isMobile = window.innerWidth < 640;

  return (
    <div className="col-span-1 flex flex-col gap-3">

      {/* DONUT CHART */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Visitors by Purpose
        </h2>

        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start">
          {/* CHART */}
          <div className="w-full sm:w-60 h-[160px] relative">
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
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* CENTER TEXT */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-lg font-bold text-gray-800">
                {totalVisitors ??
                  purposeData.reduce((a, b) => a + b.value, 0)}
              </p>
            </div>

          </div>

          {/* LEGEND */}
          <div className="space-y-2 text-xs sm:text-sm pl-0 sm:pl-4 w-full">
            {purposeData.map((item, index) => {
              const percentage =
                total > 0
                  ? ((item.value / total) * 100).toFixed(1)
                  : 0;

              return (


                <div
                  key={index}
                  className="flex items-center justify-between gap-2 ml-6 mt-4 flex-wrap"
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  />

                  <span className="flex-1">{item.name}</span>
                  <span className="font-medium ">
                    {item.value}
                  </span>

                  <span className="text-xs mr-16 text-gray-500">
                    ({percentage}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Visitors by Time
        </h2>

        <div className="h-[220px] sm:h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="time"
                  tick={{ fontSize: isMobile ? 8 : 12 }}
                interval={0.5}
                tickFormatter={(value) => {
                  const hour = parseInt(value.split(":")[0]);

                  const labels = {
                    3: "3AM",
                    6: "6AM",
                    9: "9AM",
                    12: "12PM",
                    15: "3PM",
                    18: "6PM",
                    21: "9PM",
                  };

                  return labels[hour] || "";
                }}
              />
              <YAxis ticks={[0,10,20,30,40]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#0a47cc"
                fill="#0a47cc"
                fillOpacity={0.2}
                legendType="none"
              />

              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#0a47cc"
                strokeWidth={2}
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
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default VisitorCharts;