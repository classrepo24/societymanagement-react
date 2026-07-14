import React from "react";

const data = [
  {
    complaint: "Water leakage in bathroom",
    flat: "A-102",
    name: "Rahul Sharma",
    status: "Open",
    time: "2h ago",
  },
  {
    complaint: "Lift not working",
    flat: "B-201",
    name: "Priya Mehta",
    status: "In Progress",
    time: "5h ago",
  },
  {
    complaint: "Garbage not collected",
    flat: "C-305",
    name: "Amit Verma",
    status: "Resolved",
    time: "1d ago",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Open":
      return "bg-red-100 text-red-600";
    case "In Progress":
      return "bg-blue-100 text-blue-600";
    case "Resolved":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export const RecentComplaints = () => {
  return (
    <div className="w-full min-w-0 flex flex-col h-full">

      {/* TITLE */}
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        Recently Complaints
      </h2>

      {/* LIST */}
      <div className="flex flex-col flex-1 min-w-0">

        {data.map((item, i) => (
          <div
            key={i}
            className="border-b border-gray-200 py-3 last:border-b-0"
          >

            {/* TOP ROW */}
            <div className="flex items-start justify-between gap-2 min-w-0">

              <p className="text-sm text-gray-800 font-semibold break-words max-w-[65%]">
                {item.complaint}
              </p>

              <div className="flex items-center gap-2 flex-shrink-0">

                <span
                  className={`text-[10px] px-2 py-[2px] rounded-full whitespace-nowrap ${getStatusStyle(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>

                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {item.time}
                </span>

              </div>
            </div>

            {/* SECOND ROW */}
            <div className="text-xs text-gray-500 mt-1 break-words">
              Flat No: {item.flat} | {item.name}
            </div>

          </div>
        ))}

      </div>

      {/* FOOTER BUTTON */}
      <div className="mt-3">
        <button className="w-full flex items-center justify-center gap-1 text-xs font-semibold text-blue-600 border border-gray-200 rounded-md py-2 hover:bg-blue-50 transition">
          View All Complaints
          <span>→</span>
        </button>
      </div>

    </div>
  );
};