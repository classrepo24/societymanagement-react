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