import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Residents Guests", value: 120 },
  { name: "Delivery Persons", value: 75 },
  { name: "Service Providers", value: 45 },
  { name: "Others", value: 45 },
];

const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#8b5cf6"];

export const VisitorStatistics = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Visitor Statistics
          </h2>
          <p className="text-xs text-gray-500">
            This Month Overview
          </p>
        </div>

        <select className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md outline-none cursor-pointer">
  <option>This Month</option>
  <option>Last Month</option>
  <option>This Year</option>
  <option>Last Year</option>
</select>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 items-center gap-4 min-h-0">

        {/* PIE */}
        <div className="w-[55%] h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-800">{total}</p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="w-[45%] space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600 text-xs">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};