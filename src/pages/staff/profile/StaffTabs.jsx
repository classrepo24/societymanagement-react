import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const StaffTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const tabs = [
    { label: "Overview", path: `/staff/profile/${id}` }, 
    { label: "Documents", path: `/staff/profile/${id}/documents` },

    { label: "Attendance", path: "/staff/profile/attendance" },
    { label: "Leave History", path: "/staff/profile/leave-history" },
    { label: "Salary & Payroll", path: "/staff/profile/salary-payroll" },
    { label: "Activity Log", path: "/staff/profile/activity-log" },
  ];

  return (
    <div className="bg-white border-b rounded-xl">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
              location.pathname === tab.path
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffTabs;