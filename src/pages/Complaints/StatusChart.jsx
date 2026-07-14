import React from "react";

const data = [
  { name: "Open", value: 28, color: "#EF4444" },
  { name: "In Progress", value: 45, color: "#3B82F6" },
  { name: "Resolved", value: 70, color: "#10B981" },
  { name: "Overdue", value: 13, color: "#F59E0B" },
];

export const StatusChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full min-w-0">

      {/* TITLE */}
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Complaints by Status
      </h2>

      <div className="flex flex-col gap-4 w-full">

        {data.map((item, i) => {
          const percent = Math.round((item.value / total) * 100);

          return (
            <div key={i} className="flex items-center gap-3 w-full min-w-0">

              {/* LABEL */}
              <span className="text-xs text-gray-600 w-24 sm:w-28 truncate">
                {item.name}
              </span>

              {/* BAR */}
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-0">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${percent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              {/* VALUE */}
              <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">
                {item.value}
              </span>

            </div>
          );
        })}

      </div>
    </div>
  );
};