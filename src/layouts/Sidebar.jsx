// IMPORTS
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import { useState } from "react";

export const Sidebar = ({ isSidebarOpen,mobileSidebarOpen ,setMobileSidebarOpen}) => {

 // Sidebar submenu open/close state
  const [openMenus, setOpenMenus] = useState({});

    // Current route information
  const location = useLocation();


  // Toggle submenu visibility
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };


  // Main sidebar navigation items
  //if want to add sub menu only add children array
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
      //     path: "/complaints/raise",
      //     label: "Raise Complaint",
      //   },
      //   {
      //     path: "/complaints/my-complaints",
      //     label: "My Complaints",
      //   },
      //   {
      //     path: "/complaints/categories",
      //     label: "Complaint Categories",
      //   },
      // ],
    },


    {
      path: "/visitors",
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


  // Module-specific quick links// only add like these in future
  const quickLinks = {

    dashboard: [
      {
        icon: "bi-chat-dots",
        label: "Messages",
        module: "dashboard",
        type: "messages",
      },
      {
        icon: "bi-question-circle",
        label: "Help & Support",
        module: "dashboard",
        type: "helpSupport",
      },
    ],

    complaints: [
      {
        path: "/complaints/raise",
        icon: "bi-plus-circle",
        label: "Raise Complaint",
      },
      {
        path: "/complaints/my-complaints",
        icon: "bi-journal-check",
        label: "My Complaints",
      },
      {
        path: "/complaints/categories",
        icon: "bi-folder2-open",
        label: "Complaint Categories",
      },
    ],


  };


  // Detect active module from current URL
  const currentModule = Object.keys(quickLinks).find((key) =>
    location.pathname.startsWith(`/${key}`)
  );


  // Modal actions
  const { openModal } = useModal();
  console.log("Sidebar loaded");





// Common styling for sidebar links
  const linkClass = ({ isActive }) =>
    `flex items-center rounded-lg transition-all duration-200
     ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
     ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;



     

  return (

<>
//Jab mobile sidebar open ho to background dark ho aur user bahar click karke sidebar close kar sake
    {mobileSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/50 z-40 md:hidden"
    onClick={() => setMobileSidebarOpen(false)}
  />
)}
{/* Mobile → sidebar page ke upar slide hokar aaye.
Desktop → normal layout me rahe.
Mobile pe sidebar smoothly left se open/close ho.
Mobile open → full sidebar show ho.
Desktop expanded → full width.
Desktop collapsed → icon only
*/}
   <aside
  className={`
    bg-[#01214a] text-white flex flex-col
    overflow-y-auto transition-all duration-300
      
    fixed md:static 
    top-0 left-0 h-screen z-50

    ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0

   ${
  mobileSidebarOpen
    ? "w-[260px]"
    : isSidebarOpen
    ? "w-[260px]"
    : "w-[80px]"
}

  `}
>

      {/* LOGO */}
      <div className="h-14 flex items-center px-3 border-b border-blue-900 flex-shrink-0">
        <NavLink
          to="/dashboard"
          className={`flex items-center w-full ${isSidebarOpen ? "gap-2" : "justify-center"
            }`}
        >
          <i className="bi bi-buildings text-2xl"></i>

        {(isSidebarOpen || mobileSidebarOpen) && (
            <div className="leading-tight">
              <h2 className="text-base font-bold">SOCIETY</h2>
              <p className="text-[10px] text-blue-200"> MANAGEMENT SYSTEM</p>
            </div>
          )}
        </NavLink>
      </div>

{/*  MAIN NAVIGATION MENU */}
      {menuItems.map((item) =>
        item.children ? (
          <div key={item.label}>
            <div className="flex items-center">
              {/* Main Menu Link */}
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex-1 flex items-center rounded-lg transition-all duration-200
            ${isSidebarOpen
                    ? "gap-3 px-3 py-2 text-sm"
                    : "justify-center py-2"
                  }
            ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`
                }
              >
                <i className={`${item.icon} text-lg`}></i>
                {(isSidebarOpen || mobileSidebarOpen) && ( <span>{item.label}</span>)}
              </NavLink>

              {/* Arrow */} {/* Submenu Toggle Button */}
              {isSidebarOpen && (
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="px-3 py-2 hover:bg-[#0b2f63] rounded-lg"
                >
                  <i
                    className={`bi ${openMenus[item.label]
                        ? "bi-chevron-down"
                        : "bi-chevron-right"
                      }`}
                  />
                </button>
              )}
            </div>


{/* Child Navigation Links */}
            {(openMenus[item.label] ||
              item.children?.some((child) =>
                location.pathname.startsWith(child.path)
              )) &&
              isSidebarOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) =>
                    child.path ? (
                      <NavLink
                        key={child.label}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg ${isActive
                            ? "bg-[#095de8]"
                            : "hover:bg-[#0b2f63]"
                          }`
                        }
                      >
                        {/* Single Navigation Item */}
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
      {currentModule && (
        <>
        {(isSidebarOpen || mobileSidebarOpen) && (
            <p className="text-[10px] text-blue-300 px-2 mt-2">
              QUICK LINKS
            </p>
          )}
{/* Route Based Quick Link */}
          {quickLinks[currentModule].map((item) =>
            item.path ? (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center rounded-lg transition-all duration-200
   ${isSidebarOpen
                    ? "gap-2 px-3 py-2 text-sm"
                    : "justify-center py-2"
                  }
   ${isActive
                    ? "bg-[#095de8]"
                    : "hover:bg-[#0b2f63]"
                  }`
                }
              >
                <i className={`bi ${item.icon}`}></i>
                {(isSidebarOpen || mobileSidebarOpen) && item.label}
              </NavLink>
              
            ) : (
              <button
                key={item.label}
                onClick={() =>
                  openModal({
                    module: item.module,
                    type: item.type,
                  })
                }
                className={`flex items-center rounded-lg transition-all duration-200
  ${isSidebarOpen
                    ? "gap-2 px-3 py-2 text-sm"
                    : "justify-center py-2"
                  }
  hover:bg-[#0b2f63]`}        >
                <i className={`bi ${item.icon}`}></i>
                {isSidebarOpen && item.label}
              </button>
            )
          )}
        </>
      )}

      {/* FOOTER */}
      <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
        {isSidebarOpen ? "© 2025 Society System" : "©"}
      </div>

    </aside>
    </>
  );
};