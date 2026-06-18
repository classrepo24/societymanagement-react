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

const COLORS = [
  "#22c55e", // Green
  "#ef4444", // Red
  "#f59e0b", // Orange
];

export const StaffAttendanceOverview = () => {
  const average = 85;

  const totalStaff = data.reduce(
  (sum, item) => sum + item.value,
  0
);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full h-[320px]">
      

      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Staff Attendance Overview
        </h2>

        <span className="text-sm text-gray-500">
          Today
        </span>
      </div>

      <div className="flex items-center justify-between h-[85%]">
        
       
        <div className="w-[55%] h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-sm text-gray-500">
              Average
            </p>

            <p className="text-2xl font-bold text-green-600">
              {average}%
            </p>
          </div>
        </div>

       
        <div className="w-[45%] space-y-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-blue-50 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  // style={{
                  //   backgroundColor: COLORS[index],
                  // }}
                />

                <span className="text-gray-600" mb-1>
                  {item.name}
                </span>
              </div>

              <span
                className={`font-semibold ${
                  item.name === "Present"
                    ? "text-green-600"
                    : item.name === "Absent"
                    ? "text-red-500"
                    : "text-orange-500"
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
           <div className="mt-3 flex justify-between items-center p-3 bg-blue-50 rounded-xl">
    <span className= "text-gray-600">
      Total Staff
    </span>

    <span className=" text-blue-600">
      {totalStaff}
    </span>
  </div>

        </div>

      </div>
    </div>
  );
};