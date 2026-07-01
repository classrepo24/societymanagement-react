import React from "react";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Residents",
      value: "1,248",
      icon: "bi-people-fill",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "↑ 3.2%",
      trendText: "from last month",
      trendColor: "text-green-600",
    },
    {
      title: "Total Flats",
      value: "512",
      icon: "bi-building",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "↑ 1.5%",
      trendText: "from last month",
      trendColor: "text-green-600",
    },
    {
      title: "Pending Maintenance",
      value: "₹ 2,45,780",
      icon: "bi-wallet2",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "↓ 2.1%",
      trendText: "from last month",
      trendColor: "text-red-600",
    },
    {
      title: "Open Complaints",
      value: "18",
      icon: "bi-chat-left-text",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      trend: "↑ 5.0%",
      trendText: "from last week",
      trendColor: "text-green-600",
    },
    {
      title: "Visitors Today",
      value: "32",
      icon: "bi-people",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      trend: "↑ 2.0%",
      trendText: "from yesterday",
      trendColor: "text-green-600",
    },
    {
      title: "Staff Attendance",
      value: "85%",
      icon: "bi-person-badge",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      trend: "↓ 1.0%",
      trendText: "from yesterday",
      trendColor: "text-red-600",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-[#E8EDF5] rounded-2xl shadow-sm p-5 h-[136px] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
        >
          {/* Top */}
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}
            >
              <i
                className={`${card.icon} text-[28px] ${card.iconColor}`}
              ></i>
            </div>

            <div>
              <p className="text-[14px] text-[#475569] font-medium leading-5">
                {card.title}
              </p>

              <h2 className="text-[18px] font-bold text-[#0F172A] mt-1 leading-none">
                {card.value}
              </h2>
            </div>
          </div>

          {/* Bottom */}
          <p className="text-[14px] flex items-center gap-1">
            <span
              className={`${card.trendColor} font-semibold whitespace-nowrap`}
            >
              {card.trend}
            </span>

            <span className="text-[#64748B] whitespace-nowrap">
              {card.trendText}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;