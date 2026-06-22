import React from "react";

const VisitorStatsCards = () => {
  const stats = [
    {
      title: "Visitors Today",
      value: "23",
      icon: "bi-people",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      growth: "+15% from yesterday",
      growthColor: "text-green-600",
    },
    {
      title: "This Week",
      value: "128",
      icon: "bi-calendar-week",
      bg: "bg-green-100",
      iconColor: "text-green-600",
      growth: "+12% from last week",
      growthColor: "text-green-600",
    },
    {
      title: "This Month",
      value: "542",
      icon: "bi-person",
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      growth: "+18% from last month",
      growthColor: "text-green-600",
    },
    {
      title: "Currently Inside",
      value: "7",
      icon: "bi-clock-history",
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
      growth: "As of now",
      growthColor: "text-gray-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg}`}
            >
              <i
                className={`bi ${item.icon} text-3xl ${item.iconColor}`}
              ></i>
            </div>

            {/* Content */}
            <div>
              <p className="text-gray-600 text-sm font-medium">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-slate-900 mt-1">
                {item.value}
              </h2>

              <p className={`text-sm mt-2 ${item.growthColor}`}>
                {item.growth}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VisitorStatsCards;