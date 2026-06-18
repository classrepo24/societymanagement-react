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
  Open: "bg-red-50 text-red-600",
  "In Progress": "bg-orange-50 text-orange-600",
  Resolved: "bg-green-50 text-green-600",
};

export const RecentComplaints = () => {
  const totalOpen = complaints.filter(c => c.status === "Open").length;

  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-full flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Complaints
          </h2>
          <p className="text-xs text-gray-500">
            Live updates from society
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-500">
          View All
        </span>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {complaints.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Flat {item.flat} • {item.time}
              </p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                statusColor[item.status]
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Open Complaints
        </p>

        <p className="text-lg font-bold text-red-600">
          {totalOpen}
        </p>
      </div>

    </div>
  );
};