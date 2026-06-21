import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside
      // className={`h-screen bg-[#01214a] text-white transition-all duration-300${isSidebarOpen ? "w-[280px]" : "w-[90px]"}`}
      className={`h-screen bg-blue-600 text-white transition-all duration-300${isSidebarOpen ? "w-[280px]" : "w-[90px]"}`}
    >
      {/* LOGO */}
      <div className="h-[85px] flex items-center px-4">
        <Link
          to="/dashboard"
          className={`flex items-center w-full ${
            isSidebarOpen ? "gap-3" : "justify-center"
          }`}
          title="Society Management System"
        >
          <i className="bi bi-buildings text-3xl flex-shrink-0"></i>

          {isSidebarOpen && (
            <div className="flex flex-col leading-tight">
              <h2 className="text-xl font-bold">SOCIETY</h2>
              <p className="text-[10px] text-blue-200">
                MANAGEMENT SYSTEM
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-4 space-y-1">
        {isSidebarOpen && <p className="py-3">MAIN MENU</p>}

        <NavLink
          to="/dashboard"
          title="Dashboard"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-microsoft text-xl"></i>
          {isSidebarOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink
          to="/resident"
          title="Residents"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-people text-xl"></i>
          {isSidebarOpen && <span>Residents</span>}
        </NavLink>

        <NavLink
          to="/flats"
          title="Flats"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-buildings text-xl"></i>
          {isSidebarOpen && <span>Flats</span>}
        </NavLink>

        <NavLink
          to="/maintenance"
          title="Maintenance"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-tools text-xl"></i>
          {isSidebarOpen && <span>Maintenance</span>}
        </NavLink>

        <NavLink
          to="/complaints"
          title="Complaints"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-exclamation-circle text-xl"></i>
          {isSidebarOpen && <span>Complaints</span>}
        </NavLink>

        <NavLink
          to="/visitors"
          title="Visitors"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-person-badge text-xl"></i>
          {isSidebarOpen && <span>Visitors</span>}
        </NavLink>

        <NavLink
          to="/staff"
          title="Staff"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-person-workspace text-xl"></i>
          {isSidebarOpen && <span>Staff</span>}
        </NavLink>

        <NavLink
          to="/notices"
          title="Notices"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-megaphone text-xl"></i>
          {isSidebarOpen && <span>Notices</span>}
        </NavLink>

        <NavLink
          to="/amenities"
          title="Amenities"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-building-check text-xl"></i>
          {isSidebarOpen && <span>Amenities</span>}
        </NavLink>

        <NavLink
          to="/reports"
          title="Reports"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-bar-chart text-xl"></i>
          {isSidebarOpen && <span>Reports</span>}
        </NavLink>

        <NavLink
          to="/finance"
          title="Finance"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-cash-stack text-xl"></i>
          {isSidebarOpen && <span>Finance</span>}
        </NavLink>

        <NavLink
          to="/settings"
          title="Settings"
          className={({ isActive }) =>
            `flex items-center rounded-xl transition ${
              isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
            } ${isActive ? "bg-[#095de8]" : "hover:bg-blue-800"}`
          }
        >
          <i className="bi bi-gear text-xl"></i>
          {isSidebarOpen && <span>Settings</span>}
        </NavLink>
      </div>

      {/* BOTTOM */}
      <div className="px-3 py-3">
        {isSidebarOpen && <p>OTHER</p>}

        <NavLink
          to="/messages"
          title="Messages"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-800"
        >
          <i className="bi bi-chat-dots"></i>
          {isSidebarOpen && <span>Messages</span>}
        </NavLink>

        <NavLink
          to="/help-support"
          title="Help & Support"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-800"
        >
          <i className="bi bi-question-circle"></i>
          {isSidebarOpen && <span>Help & Support</span>}
        </NavLink>

        <div className="mt-3 pt-3 border-t border-blue-800">
          {isSidebarOpen && (
            <p className="text-center text-[11px] text-blue-300">
              ©️ 2025 Society Management System
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};