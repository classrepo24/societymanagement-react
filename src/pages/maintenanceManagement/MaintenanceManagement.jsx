import React from 'react'
import { FiSettings, FiPlus } from "react-icons/fi";
import MaintenanceCards from './maintenancePageOverview/MaintenanceCards'
import { MaintenanceTable } from './maintenancePageOverview/MaintenanceTable';
import { MaintenanceOverview } from './maintenancePageOverview/MaintenanceOverview';
import { RecentMaintenance } from './maintenancePageOverview/RecentMaintenance';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { StatsCard } from '../../components/cards/StatsCard';
import { requests } from "./maintenanceData";

export const MaintenanceManagement = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Total Requests",
      value: requests.length,
      subtitle: "This Month",
      icon: "bi bi-clipboard-data",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Pending",
      value: requests.filter((item) => item.status === "Pending").length,
      subtitle: "Needs Attention",
      icon: "bi bi-clock-history",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      title: "In Progress",
      value: requests.filter(
        (item) => item.status === "In Progress"
      ).length,
      subtitle: "Ongoing",
      icon: "bi bi-tools",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Completed",
      value: requests.filter(
        (item) => item.status === "Completed"
      ).length,
      subtitle: "This Month",
      icon: "bi bi-check-circle",
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Overdue",
      value: requests.filter((item) => item.status === "Overdue").length,
      subtitle: "Delayed",
      icon: "bi bi-exclamation-triangle",
      bg: "bg-pink-100",
      iconColor: "text-pink-500",
    },
  ];
  return (
    <div>
      <div className="bg-[#fbfbfe] p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mx-8">

          {/* Left Side */}
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Maintenance Management
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Manage maintenance requests, assignments and track their status.
            </p>
          </div>

          {/* Right Side */}
          <div className="flex gap-4">

            <button
              onClick={() => navigate("/maintenance-management/maintenance-settings")}
              className="
              flex items-center gap-2
              px-5 py-3
              border border-gray-300
              rounded-xl
              bg-white
              hover:bg-gray-50
              font-medium
            "
            >
              <FiSettings className="text-lg" />
              Maintenance Settings
            </button>

            <button
              onClick={() => navigate("/maintenance-management/raise-maintenance-request")}
              className="
              flex items-center gap-2
              px-5 py-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
              font-medium
              shadow-md
            "
            >
              <FiPlus className="text-lg" />
              Raise Maintenance Request
            </button>

          </div>

        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 m-8">
          {cards.map((card, index) => (
            <StatsCard
              key={index}
              {...card}
            />
          ))}
        </div>

        {/* <MaintenanceCards /> */}
        <MaintenanceTable />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8 mt-8 items-start">
          <MaintenanceOverview />
          <RecentMaintenance />
        </div>

      </div>
    </div>
  )
}
