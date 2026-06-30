// import React,{useEffect,useRef} from "react";
// import { NavLink, useLocation } from "react-router-dom";

// export const Sidebar = ({ isSidebarOpen,setIsSidebarOpen}) => {
//   const location = useLocation();
//     const sidebarRef = useRef(null);

//     useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         window.innerWidth < 1024 &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target)
//       ) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setIsSidebarOpen]);

//   const linkClass = ({ isActive }) =>
//     `flex items-center rounded-lg transition-all duration-200
//      ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
//      ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;

//   return (
//     <aside
//   ref={sidebarRef}
//   className={`
//     bg-[#01214a] text-white flex flex-col
//     transition-all duration-300 overflow-y-auto
//     fixed lg:relative
//     top-0 left-0 z-50 h-screen
//     ${isSidebarOpen
//       ? "translate-x-0 w-[260px]"
//       : "-translate-x-full lg:translate-x-0 lg:w-[80px]"
//     }
//   `}
// >
//       {/* LOGO */}
//       <div className="h-14 flex items-center px-3 border-b border-blue-900 flex-shrink-0">
//         <NavLink
//           to="/dashboard"
//           className={`flex items-center w-full ${isSidebarOpen ? "gap-2" : "justify-center"
//             }`}
//         >
//           <i className="bi bi-buildings text-2xl"></i>

//           {isSidebarOpen && (
//             <div className="leading-tight">
//               <h2 className="text-base font-bold">SOCIETY</h2>
//               <p className="text-[10px] text-blue-200"> MANAGEMENT SYSTEM</p>
//             </div>
//           )}
//         </NavLink>
//       </div>

//       {/* MAIN MENU */}
//       <div className="px-2 py-2 space-y-1">
//         {isSidebarOpen && (
//           <p className="text-[10px] text-blue-300 px-2 mt-2 mb-1">
//             MAIN MENU
//           </p>
//         )}

//         {[
//           ["dashboard", "bi-microsoft", "Dashboard"],
//           ["resident", "bi-people", "Residents"],
//           ["flats", "bi-buildings", "Flats"],
//           ["maintenance", "bi-tools", "Maintenance"],
//           ["complaints", "bi-exclamation-circle", "Complaints"],
//           ["visitors", "bi-person-badge", "Visitors"],
//           ["staff", "bi-person-workspace", "Staff"],
//           ["notices", "bi-megaphone", "Notices"],
//           ["amenities", "bi-building-check", "Amenities"],
//           ["reports", "bi-bar-chart", "Reports"],
//           ["finance", "bi-cash-stack", "Finance"],
//           ["settings", "bi-gear", "Settings"],
//         ].map(([path, icon, label,closeOnClick]) => (

//           <NavLink key={path} to={`/${path}`} className={linkClass}
//           onClick={() => {
//       if (window.innerWidth < 1024 && closeOnClick !== false) {
//         setIsSidebarOpen(false);
//       }
//     }}>
//             <i className={`${icon} text-lg `}></i>
//             {isSidebarOpen && <span>{label}</span>}
//           </NavLink>
//         ))}
//       </div>

//       {/* QUICK LINKS (BOTTOM BUT NOT FIXED) */}
//       <div className="px-2 py-2 space-y-1">

//         {/* DASHBOARD */}
//         {location.pathname === "/dashboard" && (
//           <>
//             {isSidebarOpen && (
//               <p className="text-[10px] text-blue-300 px-2 mt-2">
//                 OTHER
//               </p>
//             )}

//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//               <i className="bi bi-chat-dots"></i>
//               {isSidebarOpen && "Messages"}
//             </button>

//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//               <i className="bi bi-question-circle"></i>
//               {isSidebarOpen && "Help & Support"}
//             </button>
//           </>
//         )}

//         {/* COMPLAINTS */}
//         {location.pathname === "/complaints" && (
//           <>
//             {isSidebarOpen && (
//               <p className="text-[10px] text-blue-300 px-2 mt-2">
//                 QUICK LINKS
//               </p>
//             )}

//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//               <i className="bi bi-plus-circle"></i>
//               {isSidebarOpen && "Raise Complaint"}
//             </button>

//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//               <i className="bi bi-journal-check"></i>
//               {isSidebarOpen && "My Complaints"}
//             </button>

//             <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//               <i className="bi bi-folder2-open"></i>
//               {isSidebarOpen && "Categories"}
//             </button>
//           </>
//         )}
//         {/* Visitors */}
//         {location.pathname.startsWith("/visitors") && (
//           <>
//             {isSidebarOpen && (
//               <p className="text-[10px] text-blue-300 px-2 mt-3">
//                 QUICK LINKS
//               </p>
//             )}

//             <NavLink
//               to="/visitors/visitoradd"
//               className={linkClass}
//               onClick={() => {
//     if (window.innerWidth < 1024) {
//       setIsSidebarOpen(false);
//     }
//   }}
//             >
//               <i className="bi bi-person-plus text-lg"></i>
//               {isSidebarOpen && <span>Add New Visitor</span>}
//             </NavLink>

//             <NavLink
//               to="/visitors/visitorlog"
//               className={linkClass}
//               onClick={() => {
//     if (window.innerWidth < 1024) {
//       setIsSidebarOpen(false);
//     }
//   }}>
//               <i className="bi bi-journal-text text-lg"></i>
//               {isSidebarOpen && <span>Visitor Log</span>}
//             </NavLink>

//             <NavLink
//               to="/visitors/visitor-preregister"
//               className={linkClass}
//               onClick={() => {
//     if (window.innerWidth < 1024) {
//       setIsSidebarOpen(false);
//     }
//   }}
//             >
//               <i className="bi bi-person-check text-lg"></i>
//               {isSidebarOpen && <span>Pre-Registered Visitors</span>}
//             </NavLink>


//           </>
//         )}
//       </div>


//       {/* FOOTER (ALWAYS VISIBLE) */}
//       <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
//         {isSidebarOpen ? "©️ 2025 Society System" : "©️"}
//       </div>

//     </aside>
//   );
// };


// IMPORTS
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

export const Sidebar = ({ isSidebarOpen, mobileSidebarOpen, setMobileSidebarOpen }) => {

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


    visitors: [
      {
        path: "/visitors/visitoradd",
        icon: "bi-person-plus",
        label: "Add New Visitor",
      },
      {
        path: "/visitors/visitorlog",
        icon: "bi-journal-text",
        label: "Visitor Log",
      },
      {
        path: "/visitors/visitor-preregister",
        icon: "bi-person-check",
        label: "Pre-Registered Visitors",
      },
    ],

  };


  // Detect active module from current URL
  const currentModule = Object.keys(quickLinks).find((key) =>
    location.pathname.startsWith(`/${key}`)
  );


  // Modal actions
  console.log("Sidebar loaded");





  // Common styling for sidebar links
  const linkClass = ({ isActive }) =>
    `flex items-center rounded-lg transition-all duration-200
     ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
     ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;





  return (
    //Jab mobile sidebar open ho to background dark ho aur user bahar click karke sidebar close kar sake

    <>
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

   ${mobileSidebarOpen
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
        <div className="flex flex-col gap-2 px-2 py-3">

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
                  {(isSidebarOpen || mobileSidebarOpen) && (<span>{item.label}</span>)}
                </NavLink>

                {/* Arrow /} {/ Submenu Toggle Button */}
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



                    {item.children.map((child) => (
                      <NavLink
                        key={child.label}
                        to={child.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
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
        </div>

        {/* QUICK LINKS */}
        {currentModule && (
          <>
            {(isSidebarOpen || mobileSidebarOpen) && (
              <p className="text-[10px] text-blue-300 px-2 mt-2">
                QUICK LINKS
              </p>
            )}

            {quickLinks[currentModule].map((item) => (
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
                <i className={`bi ${item.icon} text-lg`}></i>
                {(isSidebarOpen || mobileSidebarOpen) && (
                  <span>{item.label}</span>
                )}
              </NavLink>
            ))}
          </>
        )}

        {/* FOOTER */}
        <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
          {isSidebarOpen ? "©️ 2025 Society System" : "©️"}
        </div>

      </aside>
    </>
  );
};