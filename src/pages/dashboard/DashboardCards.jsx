import React from "react";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Residents",
      value: "1,248",
      icon: "bi-people-fill",
      color: "bg-purple-500",
    },
    {
      title: "Total Flats",
      value: "512",
      icon: "bi-building",
      color: "bg-blue-500",
    },
    {
      title: "Pending Maintenance",
      value: "₹ 2,45,780",
      icon: "bi-wallet2",
      color: "bg-orange-500",
    },
    {
      title: "Open Complaints",
      value: "18",
      icon: "bi-chat-left-text",
      color: "bg-pink-500",
    },
    {
      title: "Visitors Today",
      value: "32",
      icon: "bi-people",
      color: "bg-teal-500",
    },
    {
      title: "Staff Attendance",
      value: "85%",
      icon: "bi-person-badge",
      color: "bg-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 mt-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${card.color}`}
            >
              <i className={`bi ${card.icon}`}></i>
            </div>

            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">
                {card.value}
              </h3>
            </div>
          </div>

          <p className="text-green-500 text-sm mt-4">
            ↑ 3.2% from last month
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;