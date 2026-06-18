import React from "react";

const complaints = [
  {
    id: 1,
    title: "Water leakage in bathroom",
    flat: "A-101",
    status: "Open",
    time: "2 hrs ago",
  },
  {
    id: 2,
    title: "Lift not working",
    flat: "B-205",
    status: "In Progress",
    time: "5 hrs ago",
  },
  {
    id: 3,
    title: "Garbage not collected",
    flat: "C-310",
    status: "Resolved",
    time: "1 day ago",
  },
  {
    id: 4,
    title: "Power issue in block A",
    flat: "A-110",
    status: "Open",
    time: "1 day ago",
  },
];

const statusColor = {
  Open: "bg-red-100 text-red-600",
  "In Progress": "bg-orange-100 text-orange-600",
  Resolved: "bg-green-100 text-green-600",
};

export const Complaints = () => {

  const totalOpen = complaints.filter(c => c.status === "Open").length;

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full h-[320px] flex flex-col">

    
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Complaints
        </h2>
        <span className="text-sm text-gray-500">Today</span>
      </div>

  
      <div className="space-y-3 overflow-y-auto flex-1 pr-1">

        {complaints.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start border-b pb-2"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500">
                Flat: {item.flat} • {item.time}
              </p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        ))}

      </div>

      <div className="mt-3 pt-3 border-t flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Total Open Complaints
        </p>

        <p className="text-lg font-bold text-red-600">
          {totalOpen}
        </p>
      </div>

    </div>
  );
};