import React from 'react'
import { FiSettings, FiPlus } from "react-icons/fi";
import MaintenanceCards from '../components/MaintenanceCards'
import { MaintenanceTable } from '../components/MaintenanceTable';
import { MaintenanceOverview } from '../components/MaintenanceOverview';
import { RecentMaintenance } from '../components/RecentMaintenance';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const MaintenanceManagement = () => {
  const navigate = useNavigate();
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

        <MaintenanceCards />
        <MaintenanceTable />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-8 mt-8 items-start">
          <MaintenanceOverview />
          <RecentMaintenance />
        </div>

      </div>
    </div>
  )
}
