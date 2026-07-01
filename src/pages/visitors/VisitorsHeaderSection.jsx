import React from "react";
import { useNavigate } from "react-router-dom";
const VisitorsHeaderSection = ({
  visitorsToday,
  thisWeek,
  thisMonth,
  currentlyInside,
  todayGrowth,
  weekGrowth,
  monthGrowth,
}) => {

  const navigate = useNavigate();
  const cards = [
    {
      title: "Visitors Today",
      value: visitorsToday,
      growth: todayGrowth,
      icon: "bi bi-people-fill",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "This Week",
      value: thisWeek,
      growth: weekGrowth,
      icon: "bi bi-calendar-week",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "This Month",
      value: thisMonth,
      growth: monthGrowth,
      icon: "bi bi-bar-chart-fill",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Currently Inside",
      value: currentlyInside,
      icon: "bi bi-clock-history",
      subtitle: "As of Now",
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <p>
            Dashboard / <span className="font-bold">Visitors</span>
          </p>

          <h1 className="text-2xl font-semibold mt-2">
            Visitor Management
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Track and manage all visitors in the society.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
            onClick={() => navigate("/visitors/visitor-preregister")}
            className="px-4 py-2 border rounded-lg text-sm"
          >
            <i className="bi bi-person-fill-gear"></i> Pre-Register Visitor
          </button>

          <button
            onClick={() => navigate("/visitors/visitoradd")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            <i className="bi bi-plus"></i> Add New Visitor
          </button>


        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow flex items-start gap-4 min-h-[120px]">
            <div
              className={`w-16 h-16 ${card.bg} ${card.color} rounded-full flex items-center justify-center text-xl`}
            >
              <i className={card.icon}></i>
            </div>

            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>

              <h2 className="text-xl sm:text-2xl font-bold">{card.value ?? 0}</h2>

              {/* GROWTH ADDED HERE */}

              {typeof card.growth === "number" && (
                <p className="text-xs mt-1">
                  <span
                    className={
                      card.growth >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {card.growth !== undefined
                      ? card.growth >= 0
                        ? `+${card.growth}%`
                        : `${card.growth}%`
                      : ""}
                  </span>

                  <span className="text-black-500 ml-1">
                    {index === 0
                      ? "from yesterday"
                      : index === 1
                        ? "from last week"
                        : index === 2
                          ? "from last month"
                          : ""}
                  </span>
                </p>
              )}
              {card.subtitle && (
                <p className="text-xs text-black-500 mt-1">
                  {card.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default VisitorsHeaderSection;