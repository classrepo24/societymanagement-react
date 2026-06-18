import React from "react";

import { Link, NavLink } from "react-router-dom";


export const Sidebar = ({ isSidebarOpen }) => {
  return (

    <div
      className={`overflow-visible h-screen bg-blue-900 text-white fixed left-0 top-0 shadow-lg flex flex-col overflow-y-auto overflow-x-visible
  ${isSidebarOpen ? "w-64" : "w-24"}`}
    >
      <div className="p-4 border-b border-blue-800">
        <Link to="/"
         title={!isSidebarOpen ? "SOCIETY Management System" : ""}

          className={`flex items-center ${isSidebarOpen ? "gap-3" : "justify-center"}`}>

          <i className="bi bi-buildings" style={{ fontSize: "36px" }}></i>
         
          {isSidebarOpen && (
            <div>
              <h2 className="font-bold text-lg">SOCIETY</h2>
              <p className="text-xs text-dark-200">MANAGEMENT SYSTEM</p>
            </div>
          )}
        </Link>
      </div>


      <ul className="mt-4 space-y-1 px-2 flex-1">

        <NavLink
          to="/dashboard"
title={!isSidebarOpen ? "Dashboard" : ""}
          className={({ isActive }) =>
            `flex items-center rounded-lg transition ${isSidebarOpen
              ? "gap-3 p-3"
              : "justify-center p-3"
            } ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
            }`
          }
        >
          <i className="bi bi-microsoft text-xl"></i>

          {isSidebarOpen && <span>Dashboard</span>}

        </NavLink>



        {isSidebarOpen && (<h6>MAIN MODULE</h6>)}


        <li>
          <NavLink
            to="/resident"
title={!isSidebarOpen ? "Resident" : ""}
            className={({ isActive }) =>
              `flex items-center rounded-lg transition ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"
              } ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-people text-xl"></i>

            {isSidebarOpen && <span>Resident</span>}
          </NavLink>
        </li>



        <li>
          <NavLink
            to="/flats"

title={!isSidebarOpen ? "Flats" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-building"></i>
            {isSidebarOpen && <span>Flats</span>}
          </NavLink>
        </li>


        <li>
          <NavLink
            to="/maintenance"

title={!isSidebarOpen ? "Mainteance" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
             ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-tools"></i>
            {isSidebarOpen && <span>Mainteance</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/complaints"
title={!isSidebarOpen ? "Complaints" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
             ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-exclamation-circle"></i>
            {isSidebarOpen && <span>Complaints</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/visitors"
title={!isSidebarOpen ? "Visitors" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-person-badge"></i>
            {isSidebarOpen && <span>Visitors</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/staff"
title={!isSidebarOpen ? "Staff" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
             ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-person-workspace"></i>
            {isSidebarOpen && <span>Staff</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/notices"
title={!isSidebarOpen ? "Notices" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
             ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-megaphone"></i>
            {isSidebarOpen && <span>Notices</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/amenities"
title={!isSidebarOpen ? "Amenities" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition   ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-building-check"></i>
            {isSidebarOpen && <span>Amenities</span>}
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
title={!isSidebarOpen ? "Reports" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-file-earmark-bar-graph"></i>
            {isSidebarOpen && <span>Reports</span>}

          </NavLink>
        </li>

        <li>
          <NavLink
            to="/finance"
title={!isSidebarOpen ? "Finance" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-cash-stack"></i>
            {isSidebarOpen && <span>Finance</span>}

          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
title={!isSidebarOpen ? "Settings" : ""}

            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
            ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
              }`
            }
          >
            <i className="bi bi-gear"></i>
            {isSidebarOpen && <span>Settings</span>}

          </NavLink>
        </li>
      </ul>

      <div className="px-3 mt-2">
        {isSidebarOpen && (<h6 className="text-xs text-blue-200 mb-2">OTHER</h6>)}
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/messages"
title={!isSidebarOpen ? "Messages" : ""}

              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
              ${isActive ? "bg-blue-800" : "hover:bg-blue-1000"
                }`
              }
            >
              <i className="bi bi-chat-dots"></i>
              {isSidebarOpen && <span>Messages</span>}

            </NavLink>
          </li>

          <li>
            <NavLink
              to="/help-support"
title={!isSidebarOpen ? "help & Support" : ""}

              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition  ${isSidebarOpen ? "gap-3 p-3" : "justify-center p-3"}
              ${isActive ? "bg-blue-800" : "hover:bg-blue-800"
                }`
              }
            >
              <i className="bi bi-question-circle"></i>
              {isSidebarOpen && <span>Help & Support</span>}
            </NavLink>
          </li>
        </ul>
      </div>


      <div className="text-xs text-blue-200 p-4 border-t border-blue-800 mt-3">
        {isSidebarOpen && <span> © 2025 Society MS. All Rights Reserved</span>}

      </div>

    </div>
  );
};