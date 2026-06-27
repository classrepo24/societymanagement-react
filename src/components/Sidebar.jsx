import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export const Sidebar = ({ isSidebarOpen = true }) => {
    const [residentOpen, setResidentOpen] = useState(false);
    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-[#01214a] text-white flex flex-col shadow-xl transition-all duration-300 overflow-y-auto ${isSidebarOpen ? "w-[280px]" : "w-[90px]"
                }`}
        >
            {/* LOGO */}
            <div className="h-[85px] flex items-center px-4">
                <Link
                    to="/dashboard"
                    className={`flex items-center w-full ${isSidebarOpen ? "gap-3" : "justify-center"
                        }`}
                    title="Society Management System"
                >
                    <i className="bi bi-buildings text-3xl flex-shrink-0"></i>

                    {isSidebarOpen && (
                        <div className="flex flex-col leading-tight">
                            <h2 className="text-xl font-bold">Society</h2>
                            <p className="text-[11px] text-blue-200">
                                MANAGEMENT SYSTEM
                            </p>
                        </div>
                    )}
                </Link>
            </div>

            {/* MENU */}
            <div className="flex-1 px-3 py-4 space-y-1">

                <NavLink
                    to="/dashboard"
                    title="Dashboard"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-microsoft text-xl"></i>
                    {isSidebarOpen && <span>Dashboard</span>}
                </NavLink>

                <>
                    {/* Parent Menu */}
                    <div
                        onClick={() => setResidentOpen(!residentOpen)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-800"
                    >
                        <div className="flex items-center gap-3">
                            <i className="bi bi-people text-xl"></i>
                            {isSidebarOpen && <span>Residents</span>}
                        </div>

                        {isSidebarOpen && (
                            <i
                                className={`bi ${residentOpen ? "bi-chevron-down" : "bi-chevron-right"
                                    }`}
                            ></i>
                        )}
                    </div>

                    {/* Sub Menu */}
                    {residentOpen && isSidebarOpen && (
                        <div className="ml-8 mt-2 flex flex-col gap-2 border-l border-blue-500 pl-4">

                            <NavLink
                                to="/resident-view"
                                className="py-2 hover:text-blue-300"
                            >
                                All Residents
                            </NavLink>

                            <NavLink
                                to="/resident-form"
                                className="py-2 hover:text-blue-300"
                            >
                                Add Resident
                            </NavLink>

                            <NavLink
                                to="/import-resident"
                                className="py-2 hover:text-blue-300"
                            >
                                Import Residents
                            </NavLink>
                            <NavLink
                                to="/society-members"
                                className="py-2 hover:text-blue-300"
                            >
                                Society Members
                            </NavLink>

                        </div>
                    )}
                </>

                <NavLink to="/flats" title="Flats"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-buildings text-xl"></i>
                    {isSidebarOpen && <span>Flats</span>}
                </NavLink>

                <NavLink to="/maintenance-management" title="Maintenance"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-tools text-xl"></i>
                    {isSidebarOpen && <span>Maintenance</span>}
                </NavLink>

                <NavLink to="/complaints" title="Complaints"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-exclamation-circle text-xl"></i>
                    {isSidebarOpen && <span>Complaints</span>}
                </NavLink>

                <NavLink to="/visitors" title="Visitors"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-person-badge text-xl"></i>
                    {isSidebarOpen && <span>Visitors</span>}
                </NavLink>

                <NavLink to="/staff" title="Staff"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-person-workspace text-xl"></i>
                    {isSidebarOpen && <span>Staff</span>}
                </NavLink>

                <NavLink to="/notices" title="Notices"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-megaphone text-xl"></i>
                    {isSidebarOpen && <span>Notices</span>}
                </NavLink>

                <NavLink to="/amenities" title="Amenities"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-building-check text-xl"></i>
                    {isSidebarOpen && <span>Amenities</span>}
                </NavLink>

                <NavLink to="/reports" title="Reports"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-bar-chart text-xl"></i>
                    {isSidebarOpen && <span>Reports</span>}
                </NavLink>

                <NavLink to="/finance" title="Finance"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-cash-stack text-xl"></i>
                    {isSidebarOpen && <span>Finance</span>}
                </NavLink>

                <NavLink to="/settings" title="Settings"
                    className={({ isActive }) =>
                        `flex items-center rounded-xl transition ${isSidebarOpen ? "gap-3 px-4 py-3" : "justify-center py-3"
                        } ${isActive ? "bg-blue-600" : "hover:bg-blue-800"}`
                    }
                >
                    <i className="bi bi-gear text-xl"></i>
                    {isSidebarOpen && <span>Settings</span>}
                </NavLink>
            </div>

            {/* BOTTOM */}
            <div className="px-3 py-3">

                <NavLink to="/messages" title="Messages"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-800"
                >
                    <i className="bi bi-chat-dots"></i>
                    {isSidebarOpen && <span>Messages</span>}
                </NavLink>

                <NavLink to="/help-support" title="Help & Support"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-800"
                >
                    <i className="bi bi-question-circle"></i>
                    {isSidebarOpen && <span>Help & Support</span>}
                </NavLink>

                <div className="mt-3 pt-3 border-t border-blue-800">
                    {isSidebarOpen && (
                        <p className="text-center text-[11px] text-blue-300">
                            © 2025 Society Management System
                        </p>
                    )}
                </div>
            </div>
        </aside>
    );
};

// import React, { useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";

// export const Sidebar = ({ isSidebarOpen }) => {
//     const [openMenu, setOpenMenu] = useState("");
//     const location = useLocation();
//     const navigate = useNavigate();

//     const linkClass = ({ isActive }) =>
//         `flex items-center rounded-lg transition-all duration-200
//      ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
//      ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;

//     return (
//         <aside
//             className={`
//         h-screen bg-[#01214a] text-white flex flex-col
//         transition-all duration-300 flex-shrink-0
//         overflow-y-auto
//         ${isSidebarOpen ? "w-[260px]" : "w-[80px]"}
//       `}
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
//                             <h2 className="text-base font-bold">SOCIETY</h2>
//                             <p className="text-[10px] text-blue-200"> MANAGEMENT SYSTEM</p>
//                         </div>
//                     )}
//                 </NavLink>
//             </div>

//             {/* MAIN MENU */}
//             <div className="px-2 py-2 space-y-1">
//                 {isSidebarOpen && (
//                     <p className="text-[10px] text-blue-300 px-2 mt-2 mb-1">
//                         MAIN MENU
//                     </p>
//                 )}

//                 {[
//                     ["dashboard", "bi-microsoft", "Dashboard"],
//                     ["flats", "bi-buildings", "Flats"],
//                     ["maintenance", "bi-tools", "Maintenance"],
//                     ["complaints", "bi-exclamation-circle", "Complaints"],
//                     ["visitors", "bi-person-badge", "Visitors"],
//                     ["staff", "bi-person-workspace", "Staff"],
//                     ["notices", "bi-megaphone", "Notices"],
//                     ["amenities", "bi-building-check", "Amenities"],
//                     ["reports", "bi-bar-chart", "Reports"],
//                     ["finance", "bi-cash-stack", "Finance"],
//                     ["settings", "bi-gear", "Settings"],
//                 ].map(([path, icon, label]) => (

//                     <NavLink key={path} to={`/${path}`} className={linkClass}>
//                         <i className={`${icon} text-lg `}></i>
//                         {isSidebarOpen && <span>{label}</span>}
//                     </NavLink>
//                 ))}
//             </div>
//             <NavLink to="/dashboard" className={linkClass}>
//                 <i className="bi bi-microsoft"></i>
//                 {isSidebarOpen && <span>Dashboard</span>}
//             </NavLink>

//             {/* Residents */}
//             <button
//                 onClick={() =>
//                     setOpenMenu(openMenu === "resident" ? "" : "resident")
//                 }
//                 className="flex items-center w-full gap-3 px-3 py-2 rounded-lg hover:bg-[#0b2f63]"
//             >
//                 <i className="bi bi-people"></i>

//                 <span className="flex-1 text-left">
//                     Residents
//                 </span>

//                 <i
//                     className={`bi ${openMenu === "resident"
//                         ? "bi-chevron-up"
//                         : "bi-chevron-down"
//                         }`}
//                 />
//             </button>
//             {openMenu === "resident" && (
//                 <div className="ml-8 mt-1 space-y-1">

//                     <NavLink to="/resident">
//                         All Residents
//                     </NavLink>

//                     <NavLink to="/resident/add">
//                         Add Resident
//                     </NavLink>

//                     <NavLink to="/resident/requests">
//                         Resident Requests
//                     </NavLink>

//                     <NavLink to="/resident/documents">
//                         Documents
//                     </NavLink>

//                 </div>
//             )}

//             {/* QUICK LINKS (BOTTOM BUT NOT FIXED) */}
//             <div className="px-2 py-2 space-y-1">

//                 {/* COMPLAINTS */}
//                 {location.pathname === "/complaints" && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-2">
//                                 QUICK LINKS
//                             </p>
//                         )}

//                         <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//                             <i className="bi bi-plus-circle"></i>
//                             {isSidebarOpen && "Raise Complaint"}
//                         </button>

//                         <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//                             <i className="bi bi-journal-check"></i>
//                             {isSidebarOpen && "My Complaints"}
//                         </button>

//                         <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//                             <i className="bi bi-folder2-open"></i>
//                             {isSidebarOpen && "Categories"}
//                         </button>
//                     </>
//                 )}
//                 {/* Visitors */}
//                 {location.pathname === "/visitors" && (
//                     <>
//                         {isSidebarOpen && (
//                             <p className="text-[10px] text-blue-300 px-2 mt-3">
//                                 QUICK LINKS
//                             </p>
//                         )}

//                         <button
//                             onClick={() => navigate("/visitors?modal=add")}
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
//                         >
//                             <i className="bi bi-person-plus"></i>
//                             {isSidebarOpen && "Add New Visitor"}
//                         </button>

//                         <button
//                             onClick={() => navigate("/visitors?modal=log")}
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//                             <i className="bi bi-journal-text"></i>
//                             {isSidebarOpen && "Visitor Log"}
//                         </button>

//                         <button
//                             onClick={() => navigate("/visitors?modal=preregister")}
//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
//                         >
//                             <i className="bi bi-person-check"></i>
//                             {isSidebarOpen && "Pre-Registered Visitors"}
//                         </button>

//                         <button
//                             onClick={() => navigate("/visitors?modal=purpose")}

//                             className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
//                             <i className="bi bi-tags"></i>
//                             {isSidebarOpen && "Visitor Purpose"}
//                         </button>
//                     </>
//                 )}
//             </div>


//             {/* FOOTER (ALWAYS VISIBLE) */}
//             <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
//                 {isSidebarOpen ? "©️ 2025 Society System" : "©️"}
//             </div>

//         </aside>
//     );
// };