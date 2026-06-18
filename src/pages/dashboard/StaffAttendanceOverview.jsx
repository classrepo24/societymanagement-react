import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Present", value: 42 },
  { name: "Absent", value: 7 },
  { name: "Leave", value: 6 },
];

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

export const StaffAttendanceOverview = () => {
  const average = 85;

  const totalStaff = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Staff Attendance
          </h2>
          <p className="text-xs text-gray-500">
            Today Overview
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
                outerRadius={80}
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
            <p className="text-xs text-gray-500">Average</p>
            <p className="text-2xl font-bold text-green-600">
              {average}%
            </p>
          </div>
        </div>

        {/* LEGEND */}
        <div className="w-[45%] space-y-2">

          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600 text-sm">
                  {item.name}
                </span>
              </div>

              <span
                className={`font-semibold text-sm ${
                  item.name === "Present"
                    ? "text-green-600"
                    : item.name === "Absent"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}

          {/* TOTAL */}
          <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg mt-2">
            <span className="text-gray-600 text-sm">
              Total Staff
            </span>

            <span className="font-bold text-blue-600">
              {totalStaff}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};