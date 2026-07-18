import React from "react";
import { useNavigate } from "react-router-dom";
import StatsCards from "../../component/StatsCards";
import Breadcrumb from "../../component/Breadcrumb";

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
      growth: `${todayGrowth > 0 ? "+" : ""}${todayGrowth}%`,
      subtitle: "from yesterday",
      icon: "bi bi-people-fill",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "This Week",
      value: thisWeek,
      growth: `${weekGrowth > 0 ? "+" : ""}${weekGrowth}%`,
      subtitle: "from last week",
      icon: "bi bi-calendar-week",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "This Month",
      value: thisMonth,
      growth: `${monthGrowth > 0 ? "+" : ""}${monthGrowth}%`,
      subtitle: "from last month",
      icon: "bi bi-bar-chart-fill",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Currently Inside",
      value: currentlyInside,
      subtitle: "As of Now",
      icon: "bi bi-clock-history",
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <Breadcrumb
            items={[
              { label: "Dashboard", path: "/dashboard" },
              { label: "Visitors" },
            ]}
          />

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
      <StatsCards cards={cards} />
    </>
  );
};

export default VisitorsHeaderSection;