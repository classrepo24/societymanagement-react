import React, { useState } from "react";
import DashboardCards from "./DashboardCards";
import {MonthlyCollection} from "./MonthlyCollection";
import {ComplaintTrends} from "./ComplaintTrends";
import {QuickActions} from "./QuickActions";
import { VisitorStatistics } from "./VisitorStatistics";
import { StaffAttendanceOverview } from "./StaffAttendanceOverview";
import { RecentComplaints } from "./RecentComplaints";

const Dashboard = () => {
  const dates = [];

  for (let i = 0; i < 30; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    dates.push(
      d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    );
  }

  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <div className="p-6 bg-[#fbfbfe] min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back, Admin! Here's what's happening in your society.
          </p>
        </div>

        {/* DATE SELECTOR */}
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
          <i className="bi bi-calendar3 text-gray-600"></i>

          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="outline-none bg-transparent cursor-pointer text-gray-700"
          >
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="mb-6">
        <DashboardCards />
      </div>
{/* ROW 1 */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="h-[360px]">
    <MonthlyCollection />
  </div>

  <div className="h-[360px]">
    <ComplaintTrends />
  </div>

  <div className="h-[360px]">
    <QuickActions />
  </div>

</div>
{/* ROW 2 */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

  <div className="h-[360px]">
    <VisitorStatistics/>
  </div>

  <div className="h-[360px]">
    <StaffAttendanceOverview/>
  </div>

  <div className="h-[360px]">
<RecentComplaints/>
  </div>

</div>

</div>
  );
};

export default Dashboard;