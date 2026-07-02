import React from "react";

export const HistoryCards = ({ data }) => {
  const cards = [
    {
      id: 1,
      title: "Total Requests",
      count: data.length,
      subtitle: "All Requests",
      icon: "bi-clipboard-data",
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      title: "Resolved",
      count: data.filter((item) => item.status === "Resolved").length,
      subtitle: "Successfully Resolved",
      icon: "bi-check-circle",
      bg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      title: "Closed",
      count: data.filter((item) => item.status === "Open").length,
      subtitle: "Awaiting Action",
      icon: "bi-clock-history",
      bg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      id: 4,
      title: "Reopened",
      count: data.filter((item) => item.status === "In Progress").length,
      subtitle: "Work Started",
      icon: "bi-arrow-repeat",
      bg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      id: 5,
      title: "Cancelled",
      count: data.filter((item) => item.status === "Closed").length,
      subtitle: "Closed Requests",
      icon: "bi-x-circle",
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mt-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-center gap-4">

            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center ${card.bg}`}
            >
              <i
                className={`bi ${card.icon} ${card.iconColor} text-2xl`}
              ></i>
            </div>

            {/* Content */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700">
                {card.title}
              </h4>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {card.count}
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {card.subtitle}
              </p>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};