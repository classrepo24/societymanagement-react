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
    <div className="bg-white p-4 rounded-xl shadow-md w-full h-[320px]">


      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Visitor Statistics
        </h2>
        <span className="text-sm text-gray-500">This Month</span>
      </div>

      <div className="flex items-center justify-between h-[85%]">

      
        <div className="w-[60%] h-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
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

          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-sm text-gray-500">Total Visitors</p>
            <p className="text-xl font-bold text-gray-800">{total}</p>
          </div>
        </div>

       
        <div className="w-[40%] space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-600">{item.name}</span>
              </div>

              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};