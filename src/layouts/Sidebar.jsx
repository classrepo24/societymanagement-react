import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useState } from "react";

export const Sidebar = ({ isSidebarOpen }) => {

  const [openMenus, setOpenMenus] = useState({});

const toggleMenu = (label) => {
  setOpenMenus((prev) => ({
    ...prev,
    [label]: !prev[label],
  }));
};

const menuItems = [
  {
    path: "/dashboard",
    icon: "bi-microsoft",
    label: "Dashboard",
  },
  {
    path: "/resident",
    icon: "bi-people",
    label: "Residents",
  },
  {
    path: "/flats",
    icon: "bi-buildings",
    label: "Flats",
  },
  {
    path: "/maintenance",
    icon: "bi-tools",
    label: "Maintenance",
  },
  {
  path: "/complaints",
  icon: "bi-exclamation-circle",
  label: "Complaints",
  // children: [
  //   {
  //     label: "My Complaints",
  //      module: "complaints",
  //    type: "myComplaints",
  //   },
  //   {
  //     label: "Raise Complaint",
  //     module: "complaints",
  //     type: "raiseComplaint",
  //   },
  //   {
  //     label: "Complaint Categories",
  //     module: "complaints",
  //     type: "categories",
  //   },
  // ],
},
  {
    path:"/visitors",
  icon: "bi-person-badge",
  label: "Visitors",
  
},
  {
    path: "/staff",
    icon: "bi-person-workspace",
    label: "Staff",
  },
  {
    path: "/notices",
    icon: "bi-megaphone",
    label: "Notices",
  },
  {
    path: "/amenities",
    icon: "bi-building-check",
    label: "Amenities",
  },
  {
    path: "/reports",
    icon: "bi-bar-chart",
    label: "Reports",
  },
  {
    path: "/finance",
    icon: "bi-cash-stack",
    label: "Finance",
  },
  {
    path: "/settings",
    icon: "bi-gear",
    label: "Settings",
  },
];



  const { openModal } = useModal();
  console.log("Sidebar loaded");


  const location = useLocation();



  const linkClass = ({ isActive }) =>
    `flex items-center rounded-lg transition-all duration-200
     ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
     ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;

  return (
    <aside
      className={`
        h-screen bg-[#01214a] text-white flex flex-col
        transition-all duration-300 flex-shrink-0
        overflow-y-auto
        ${isSidebarOpen ? "w-[260px]" : "w-[80px]"}
      `}
    >

      {/* LOGO */}
      <div className="h-14 flex items-center px-3 border-b border-blue-900 flex-shrink-0">
        <NavLink
          to="/dashboard"
          className={`flex items-center w-full ${
            isSidebarOpen ? "gap-2" : "justify-center"
          }`}
        >
          <i className="bi bi-buildings text-2xl"></i>

          {isSidebarOpen && (
            <div className="leading-tight">
              <h2 className="text-base font-bold">SOCIETY</h2>
              <p className="text-[10px] text-blue-200"> MANAGEMENT SYSTEM</p>
            </div>
          )}
        </NavLink>
      </div>

     {menuItems.map((item) =>
  item.children ? (
    <div key={item.label}>
      <div className="flex items-center">
        {/* Main Menu Link */}
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex-1 flex items-center rounded-lg transition-all duration-200
            ${
              isSidebarOpen
                ? "gap-3 px-3 py-2 text-sm"
                : "justify-center py-2"
            }
            ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`
          }
        >
          <i className={`${item.icon} text-lg`}></i>
          {isSidebarOpen && <span>{item.label}</span>}
        </NavLink>

        {/* Arrow */}
        {isSidebarOpen && (
          <button
            onClick={() => toggleMenu(item.label)}
            className="px-3 py-2 hover:bg-[#0b2f63] rounded-lg"
          >
            <i
              className={`bi ${
                openMenus[item.label]
                  ? "bi-chevron-down"
                  : "bi-chevron-right"
              }`}
            />
          </button>
        )}
      </div>

      {openMenus[item.label] && isSidebarOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((child) =>
            child.path ? (
              <NavLink
                key={child.label}
                to={child.path}
                className="block px-3 py-2 text-sm rounded-lg hover:bg-[#0b2f63]"
              >
                {child.label}
              </NavLink>
            ) : (
              <button
                key={child.label}
                onClick={() =>
                  openModal({
                    module: child.module,
                    type: child.type,
                  })
                }
                className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#0b2f63]"
              >
                {child.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  ) : (
    <NavLink
      key={item.path}
      to={item.path}
      className={linkClass}
    >
      <i className={`${item.icon} text-lg`}></i>
      {isSidebarOpen && <span>{item.label}</span>}
    </NavLink>
  )
)}

      {/* QUICK LINKS (BOTTOM BUT NOT FIXED) */}
      <div className="px-2 py-2 space-y-1">

       {/* DASHBOARD */}
{location.pathname === "/dashboard" && (
  <>
    {isSidebarOpen && (
      <p className="text-[10px] text-blue-300 px-2 mt-2">
        OTHER
      </p>
    )}

    {/* Messages */}
    <button
      onClick={() =>
        openModal({
          module: "dashboard",
          type: "messages",
        })
      }
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
    >
      <i className="bi bi-chat-dots"></i>
      {isSidebarOpen && "Messages"}
    </button>

    {/* Help & Support */}
    <button
      onClick={() =>
        openModal({
          module: "dashboard",
          type: "helpSupport",
        })
      }
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
    >
      <i className="bi bi-question-circle"></i>
      {isSidebarOpen && "Help & Support"}
    </button>
  </>
)}

        {/* COMPLAINTS */}
        {location.pathname === "/complaints" && (
          <>
            {isSidebarOpen && (
              <p className="text-[10px] text-blue-300 px-2 mt-2">
                QUICK LINKS
              </p>
            )}

            <button
              onClick={() =>{
                 console.log("CLICKED");
                
                openModal({
                  
                  module: "complaints",
                  type: "raiseComplaint",
                })
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
            >
              <i className="bi bi-plus-circle"></i>
              {isSidebarOpen && "Raise Complaint"}
            </button>

            <button
              onClick={() =>
                openModal({
                  module: "complaints",
                  type: "myComplaints",
                })
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
            >
              <i className="bi bi-journal-check"></i>
              {isSidebarOpen && "My Complaints"}
            </button>



            <button
              onClick={() =>
                openModal({
                  module: "complaints",
                  type: "categories",
                })
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
            >
              <i className="bi bi-folder2-open"></i>
              {isSidebarOpen && "Complaint Categories"}
            </button>
          </>
        )}
      </div>

      {/* FOOTER (ALWAYS VISIBLE) */}
      <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
        {isSidebarOpen ? "© 2025 Society System" : "©"}
      </div>

    </aside>
  );
};