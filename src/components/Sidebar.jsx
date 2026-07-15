// import React from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useModal } from "../context/ModalContext";
// import { useState } from "react";

// export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

//     const [openMenus, setOpenMenus] = useState({});

//     const toggleMenu = (label) => {
//         setOpenMenus((prev) => ({
//             ...prev,
//             [label]: !prev[label],
//         }));
//     };

//     const menuItems = [
//         {
//             path: "/dashboard",
//             icon: "bi-microsoft",
//             label: "Dashboard",
//         },
//         {
//             path: "/residents",
//             icon: "bi-people",
//             label: "Residents",
//             children: [
//                 {
//                     path: "/residents",
//                     label: "All Residents",
//                 },
//                 {
//                     path: "/add",
//                     label: "Add Resident",
//                 },
//                 {
//                     path: "/import-resident",
//                     label: "Import Residents",
//                 },
//                 {
//                     path: "/society-members",
//                     label: "Society Members",
//                 },
//             ],
//         },
//         {
//             path: "/flats",
//             icon: "bi-buildings",
//             label: "Flats",
//         },
//         {
//             path: "/maintenance-management",
//             icon: "bi-tools",
//             label: "Maintenance",
//         },
//         {
//             path: "/complaints",
//             icon: "bi-exclamation-circle",
//             label: "Complaints",
//             // children: [
//             //   {
//             //     label: "My Complaints",
//             //      module: "complaints",
//             //    type: "myComplaints",
//             //   },
//             //   {
//             //     label: "Raise Complaint",
//             //     module: "complaints",
//             //     type: "raiseComplaint",
//             //   },
//             //   {
//             //     label: "Complaint Categories",
//             //     module: "complaints",
//             //     type: "categories",
//             //   },
//             // ],
//         },
//         {
//             path: "/visitors",
//             icon: "bi-person-badge",
//             label: "Visitors",

//         },
//         {
//             path: "/staff",
//             icon: "bi-person-workspace",
//             label: "Staff",
//         },
//         {
//             path: "/notices",
//             icon: "bi-megaphone",
//             label: "Notices",
//         },
//         {
//             path: "/amenities",
//             icon: "bi-building-check",
//             label: "Amenities",
//         },
//         {
//             path: "/reports",
//             icon: "bi-bar-chart",
//             label: "Reports",
//         },
//         {
//             path: "/finance",
//             icon: "bi-cash-stack",
//             label: "Finance",
//         },
//         {
//             path: "/settings",
//             icon: "bi-gear",
//             label: "Settings",
//         },
//     ];



//     const { openModal } = useModal();
//     console.log("Sidebar loaded");


//     const location = useLocation();



//     const linkClass = ({ isActive }) =>
//         `flex items-center rounded-lg transition-all duration-200
//      ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
//      ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;

//     return (
//         <aside
//             className={`fixed lg:static top-0 left-0 z-50 h-screen bg-[#01214a] text-white transition-all duration-300 overflow-y-auto
//     ${isSidebarOpen
//                     ? "translate-x-0 w-[260px]"
//                     : "-translate-x-full lg:translate-x-0 lg:w-[80px]"
//                 }
//   `}
//         >

//             {/* LOGO */}
//             <div className="h-14 flex items-center px-3 border-b border-blue-900 flex-shrink-0">
//                 <NavLink
//                     to="/dashboard"
//                     className={`flex items-center w-full ${isSidebarOpen ? "gap-2" : "justify-center"
//                         }`}
//                 >
//                     <i className="bi bi-buildings text-2xl"></i>

//                     {isSidebarOpen && (
//                         <div className="leading-tight">
//                             <div className="flex items-center justify-between h-16 px-4 border-b border-blue-900">

//                                 <div className="leading-none">
//                                     <h2 className="text-xl font-bold tracking-wide text-white">
//                                         SOCIETY
//                                     </h2>
//                                     <p className="text-[10px] tracking-[2px] text-blue-200 mt-1">
//                                         MANAGEMENT SYSTEM
//                                     </p>
//                                 </div>

//                                 <button
//                                     className="lg:hidden"
//                                     onClick={() => setIsSidebarOpen(false)}
//                                 >
//                                     <i className="bi bi-x-lg text-xl text-white"></i>
//                                 </button>

//                             </div>

//                         </div>
//                     )}
//                 </NavLink>
//             </div>

//             {menuItems.map((item) =>
//                 item.children ? (
//                     <div key={item.label}>
//                         <div className="flex items-center">
//                             {/* Main Menu Link */}
//                             <NavLink
//                                 to={item.path}
//                                 className={({ isActive }) =>
//                                     `flex-1 flex items-center rounded-lg transition-all duration-200
//             ${isSidebarOpen
//                                         ? "gap-3 px-3 py-2 text-sm"
//                                         : "justify-center py-2"
//                                     }
//             ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`
//                                 }
//                             >
//                                 <i className={`${item.icon} text-lg`}></i>
//                                 {isSidebarOpen && <span>{item.label}</span>}
//                             </NavLink>

//                             {/* Arrow */}
//                             {isSidebarOpen && (
//                                 <button
//                                     onClick={() => toggleMenu(item.label)}
//                                     className="px-3 py-2 hover:bg-[#0b2f63] rounded-lg"
//                                 >
//                                     <i
//                                         className={`bi ${openMenus[item.label]
//                                             ? "bi-chevron-down"
//                                             : "bi-chevron-right"
//                                             }`}
//                                     />
//                                 </button>
//                             )}
//                         </div>

//                         {openMenus[item.label] && isSidebarOpen && (
//                             <div className="ml-8 mt-1 space-y-1">
//                                 {item.children.map((child) =>
//                                     child.path ? (
//                                         <NavLink
//                                             key={child.label}
//                                             to={child.path}
//                                             className="block px-3 py-2 text-sm rounded-lg hover:bg-[#0b2f63]"
//                                         >
//                                             {child.label}
//                                         </NavLink>
//                                     ) : (
//                                         <button
//                                             key={child.label}
//                                             onClick={() =>
//                                                 openModal({
//                                                     module: child.module,
//                                                     type: child.type,
//                                                 })
//                                             }
//                                             className="block w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#0b2f63]"
//                                         >
//                                             {child.label}
//                                         </button>
//                                     )
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <NavLink
//                         key={item.path}
//                         to={item.path}
//                         className={linkClass}
//                     >
//                         <i className={`${item.icon} text-lg`}></i>
//                         {isSidebarOpen && <span>{item.label}</span>}
//                     </NavLink>
//                 )
//             )}

//             {/* QUICK LINKS (BOTTOM BUT NOT FIXED) */}
//             <div className="px-2 py-2 space-y-1">

//                 {/* DASHBOARD */}
//                 {location.pathname.startsWith === "/dashboard" && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-2">
//                                 OTHER
//                             </p>
//                         )}

//                         {/* Messages */}
//                         <button
//                             onClick={() =>
//                                 openModal({
//                                     module: "dashboard",
//                                     type: "messages",
//                                 })
//                             }
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
//                         >
//                             <i className="bi bi-chat-dots"></i>
//                             {isSidebarOpen && "Messages"}
//                         </button>

//                         {/* Help & Support */}
//                         <button
//                             onClick={() =>
//                                 openModal({
//                                     module: "dashboard",
//                                     type: "helpSupport",
//                                 })
//                             }
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
//                         >
//                             <i className="bi bi-question-circle"></i>
//                             {isSidebarOpen && "Help & Support"}
//                         </button>
//                     </>
//                 )}
//                 {/* Resident */}
//                 {location.pathname.startsWith("/residents") && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-2">
//                                 QUICK LINKS
//                             </p>
//                         )}
//                         <NavLink
//                             to="/add"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-plus-circle"></i>
//                             {isSidebarOpen && "Add New Resident"}
//                         </NavLink>
//                         <NavLink
//                             to="/maintenance-management/history"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-folder2-open"></i>
//                             {isSidebarOpen && "Generate Maintenance"}
//                         </NavLink>
//                         <NavLink
//                             to="/maintenance-management/help&support"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-headset"></i>
//                             {isSidebarOpen && "Register Visitor"}
//                         </NavLink>
//                     </>
//                 )}
//                 {/* Mintenance */}
//                 {location.pathname.startsWith("/maintenance-management") && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-2">
//                                 QUICK LINKS
//                             </p>
//                         )}

//                         <NavLink
//                             to="/maintenance-management/raise-maintenance-request"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-plus-circle"></i>
//                             {isSidebarOpen && "Raise Maintenance"}
//                         </NavLink>

//                         <NavLink
//                             to="/maintenance-management/my-request"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-journal-check"></i>
//                             {isSidebarOpen && "My Request"}
//                         </NavLink>



//                         <NavLink
//                             to="/maintenance-management/history"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-folder2-open"></i>
//                             {isSidebarOpen && "Maintenance History"}
//                         </NavLink>

//                         <NavLink
//                             to="/maintenance-management/help&support"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-headset"></i>
//                             {isSidebarOpen && "Help & Support"}
//                         </NavLink>
//                     </>
//                 )}

//                 {/* COMPLAINTS */}
//                 {location.pathname === "/complaints" && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-2">
//                                 QUICK LINKS
//                             </p>
//                         )}

//                         <NavLink
//                             to="/complaints/raise"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-plus-circle"></i>
//                             {isSidebarOpen && "Raise Complaint"}
//                         </NavLink>

//                         <NavLink
//                             to="/complaints/my-complaints"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-journal-check"></i>
//                             {isSidebarOpen && "My Complaints"}
//                         </NavLink>



//                         <NavLink
//                             to="/complaints/categories"
//                             className={({ isActive }) =>
//                                 `flex items-center gap-2 px-3 py-2 rounded-lg w-full text-sm ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"
//                                 }`
//                             }
//                         >
//                             <i className="bi bi-folder2-open"></i>
//                             {isSidebarOpen && "Complaint Categories"}
//                         </NavLink>
//                     </>
//                 )}
//             </div>

//             {/* FOOTER */}
//             <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
//                 {isSidebarOpen ? "© 2025 Society System" : "©"}
//             </div>

//         </aside>
//     );
// };

// IMPORTS
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useModal } from "../context/ModalContext";
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
            path: "/residents",
            icon: "bi-people",
            label: "Residents",
            children: [
                {
                    path: "/residents",
                    label: "All Residents",
                },
                {
                    path: "/resident/add",
                    label: "Add Resident",
                },
                {
                    path: "/resident/import-resident",
                    label: "Import Residents",
                },
                {
                    path: "/resident/society-members",
                    label: "Society Members",
                },
            ],
        },


        {
            path: "/flats",
            icon: "bi-buildings",
            label: "Flats",
        },
        {
            path: "/maintenance-management",
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
        resident: [
            {
                path: "/resident/add",
                icon: "bi-plus-circle",
                label: "Add New Resident",
            },
            {
                path: "/resident/Generate_maintenance",
                icon: "bi bi-folder2-open",
                label: "Generate Maintenance",
            },
            {
                path: "/resident/registor_visitor",
                icon: "bi bi-headse",
                label: "Registor Visitor",
            },
        ],

        maintenance: [
            {
                path: "/maintenance-management/raise-maintenance-request",
                icon: "bi-plus-circle",
                label: "Raise Maintenance Request",
            },
            {
                path: "/maintenance-management/my-request",
                icon: "bi-journal-check",
                label: "My Request",
            },
            {
                path: "/maintenance-management/history",
                icon: "bi-folder2-open",
                label: "Maintenance History",
            },
            {
                path: "/maintenance-management/help&support",
                icon: "bi bi-headset",
                label: "Help & Support",
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
        finance: [
            {
                path: "/finance/add-income&expense",
                icon: "bi-plus-circle",
                label: "Add Income / Expenses",
            },
            {
                path: "/finance/generate-invoice",
                icon: "bi-file-earmark-plus",
                label: "Generate Invoice",
            },
            {
                path: "/finance/payment_reminder",
                icon: "bi-file-earmark-plus",
                label: "Payment Reminder",
            },
        ]


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
        //Jab mobile sidebar open ho to background dark ho aur user bahar click karke sidebar close kar sake

        <>
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}
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
                {/* MAIN MENU HEADING */}
                {(isSidebarOpen || mobileSidebarOpen) && (
                    <p className="text-[10px] text-blue-300 px-2 mt-2 mb-1">
                        MAIN MENU
                    </p>
                )}

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
                                    {(isSidebarOpen || mobileSidebarOpen) && (<span>{item.label}</span>)}
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