import React from "react";

export const OutstandingFilter = ({
  activeTab,
  setActiveTab,
  search,
  setSearch,
  data,
}) => {
  const tabs = [
    {
      name: "All",
      count: data.length,
      text: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Overdue",
      count: data.filter((item) => item.status === "Overdue").length,
      text: "text-red-600",
      bg: "bg-red-100",
    },
    {
      name: "Due Soon",
      count: data.filter((item) => item.status === "Due Soon").length,
      text: "text-orange-600",
      bg: "bg-orange-100",
    },
    {
      name: "Not Yet Due",
      count: data.filter((item) => item.status === "Not Yet Due").length,
      text: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border mt-6">

      {/* Tabs */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-5 gap-5">

        <div className="flex flex-wrap gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-2 text-sm font-semibold border-b-2 transition ${activeTab === tab.name
                  ? "border-[#1E2A5A] text-[#1E2A5A]"
                  : "border-transparent text-gray-500 hover:text-[#1E2A5A]"
                }`}
            >
              {tab.name}{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${tab.name === "All"
                    ? "text-blue-600 bg-blue-50"
                    : tab.name === "Overdue"
                      ? "text-red-600 bg-red-50"
                      : tab.name === "Due Soon"
                        ? "text-orange-600 bg-orange-50"
                        : "text-green-600 bg-green-50"
                  }`}
              >
                {tab.count}
              </span>
            </button>
          ))}

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          {/* Search */}

          <div className="relative w-full sm:w-80">

            <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              placeholder="Search by name, invoice no., flat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>

          {/* Filter */}

          <button className="flex items-center justify-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100">
            <i className="bi bi-funnel"></i>
            Filters
          </button>

        </div>

      </div>

    </div>
  );
};