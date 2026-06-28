import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
                path: "/add",
                label: "Add Resident",
            },
            {
                path: "/import-resident",
                label: "Import Residents",
            },
            {
                path: "/society-members",
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

export const Sidebar = ({ isSidebarOpen }) => {
    const [openMenu, setOpenMenu] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const isResidentActive =
        location.pathname.startsWith("/residents") ||
        location.pathname.startsWith("/resident") ||
        location.pathname.startsWith("/import-resident") ||
        location.pathname.startsWith("/society-members");

    const linkClass = ({ isActive }) =>
        `flex items-center rounded-lg transition-all duration-200
     ${isSidebarOpen ? "gap-3 px-3 py-2 text-sm" : "justify-center py-2"}
     ${isActive ? "bg-[#095de8]" : "hover:bg-[#0b2f63]"}`;

    useEffect(() => {
        const currentMenu = menuItems.find((item) =>
            item.children?.some((sub) => location.pathname.startsWith(sub.path))
        );

        if (currentMenu) {
            setOpenMenu(currentMenu.label);
        } else {
            setOpenMenu("");
        }
    }, [location.pathname]);

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
                    className={`flex items-center w-full ${isSidebarOpen ? "gap-2" : "justify-center"
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

            {/* MAIN MENU */}
            <div className="px-2 py-2 space-y-1">
                {isSidebarOpen && (
                    <p className="text-[10px] text-blue-300 px-2 mt-2 mb-1">
                        MAIN MENU
                    </p>
                )}

                {menuItems.map((item) => (
                    <div key={item.label}>
                        {item.children ? (
                            <>
                                <button
                                    onClick={() => {
                                        setOpenMenu(openMenu === item.label ? "" : item.label);
                                        navigate(item.path);   // 👈 ye line add karo
                                    }}
                                    className={`flex items-center justify-between w-full rounded-lg px-3 py-2 transition
    ${isResidentActive
                                            ? "bg-[#095de8]"
                                            : "hover:bg-[#0b2f63]"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <i className={`${item.icon} text-lg`}></i>

                                        {isSidebarOpen && <span>{item.label}</span>}
                                    </div>

                                    {isSidebarOpen && (
                                        <i
                                            className={`bi ${openMenu === item.label
                                                ? "bi-chevron-down"
                                                : "bi-chevron-right"
                                                }`}
                                        ></i>
                                    )}
                                </button>

                                {openMenu === item.label && (
                                    <div className="ml-8 mt-1 space-y-1">
                                        {item.children.map((sub) => (
                                            <NavLink
                                                key={sub.path}
                                                to={sub.path}
                                                className={({ isActive }) =>
                                                    `block px-3 py-2 rounded ${isActive
                                                        ? "bg-[#095de8] text-white"
                                                        : "hover:bg-[#0b2f63]"
                                                    }`
                                                }
                                            >
                                                {sub.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <NavLink
                                to={item.path}
                                className={linkClass}
                            >
                                <i className={`${item.icon} text-lg`}></i>

                                {isSidebarOpen && <span>{item.label}</span>}
                            </NavLink>
                        )}
                    </div>
                ))}
            </div>
            {/* QUICK LINKS (BOTTOM BUT NOT FIXED) */}
            <div className="px-2 py-2 space-y-1">
                {/* Resident */}
                {location.pathname.startsWith("/residents") && (
                    <>
                        {isSidebarOpen && (
                            <p className="text-[10px] text-blue-300 px-2 mt-2">
                                QUICK LINKS
                            </p>
                        )}

                        <button
                            onClick={() => navigate("/residents/add")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-plus-circle"></i>
                            {isSidebarOpen && "Add New Resident"}
                        </button>

                        <button
                            onClick={() => navigate("/residents/gen-maintenance")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-journal-check"></i>
                            {isSidebarOpen && "Generate Maintenance"}
                        </button>

                        <button
                            onClick={() => navigate("/residents/visitor")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-folder2-open"></i>
                            {isSidebarOpen && "Register Visitor"}
                        </button>
                    </>
                )}

                {/* Maintenance */}
                {location.pathname.startsWith("/maintenance-management") && (
                    <>
                        {isSidebarOpen && (
                            <p className="text-[10px] text-blue-300 px-2 mt-2">
                                QUICK LINKS
                            </p>
                        )}

                        <button
                            onClick={() => navigate("/maintenance-management/raise-maintenance-request")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-plus-circle"></i>
                            {isSidebarOpen && "Raise Maintenance"}
                        </button>

                        <button
                            onClick={() => navigate("/maintenance-management/my-request")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-journal-check"></i>
                            {isSidebarOpen && "My Request"}
                        </button>

                        <button
                            onClick={() => navigate("/maintenance-management/history")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-folder2-open"></i>
                            {isSidebarOpen && "Maintenance History"}
                        </button>
                        <button
                            onClick={() => navigate("/maintenance-management/help")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i class="bi bi-headset"></i>
                            {isSidebarOpen && "Help & Support"}
                        </button>
                    </>
                )}
                {/* Visitors */}
                {location.pathname === "/visitors" && (
                    <>
                        {isSidebarOpen && (
                            <p className="text-[10px] text-blue-300 px-2 mt-3">
                                QUICK LINKS
                            </p>
                        )}

                        <button
                            onClick={() => navigate("/visitors?modal=add")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-person-plus"></i>
                            {isSidebarOpen && "Add New Visitor"}
                        </button>

                        <button
                            onClick={() => navigate("/visitors?modal=log")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
                            <i className="bi bi-journal-text"></i>
                            {isSidebarOpen && "Visitor Log"}
                        </button>

                        <button
                            onClick={() => navigate("/visitors?modal=preregister")}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm"
                        >
                            <i className="bi bi-person-check"></i>
                            {isSidebarOpen && "Pre-Registered Visitors"}
                        </button>

                        <button
                            onClick={() => navigate("/visitors?modal=purpose")}

                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
                            <i className="bi bi-tags"></i>
                            {isSidebarOpen && "Visitor Purpose"}
                        </button>
                    </>
                )}
            </div>


            {/* FOOTER (ALWAYS VISIBLE) */}
            <div className="mt-auto border-t border-blue-900 px-2 py-3 text-center text-[10px] text-blue-300">
                {isSidebarOpen ? "©️ 2025 Society System" : "©️"}
            </div>

        </aside>
    );
};