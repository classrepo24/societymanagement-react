import React from "react";
import { NavLink, useLocation,useNavigate} from "react-router-dom";

export const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

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

      {/* MAIN MENU */}
      <div className="px-2 py-2 space-y-1">
        {isSidebarOpen && (
          <p className="text-[10px] text-blue-300 px-2 mt-2 mb-1">
            MAIN MENU
          </p>
        )}

        {[
          ["dashboard", "bi-microsoft", "Dashboard"],
          ["resident", "bi-people", "Residents"],
          ["flats", "bi-buildings", "Flats"],
          ["maintenance", "bi-tools", "Maintenance"],
          ["complaints", "bi-exclamation-circle", "Complaints"],
          ["visitors", "bi-person-badge", "Visitors"],
          ["staff", "bi-person-workspace", "Staff"],
          ["notices", "bi-megaphone", "Notices"],
          ["amenities", "bi-building-check", "Amenities"],
          ["reports", "bi-bar-chart", "Reports"],
          ["finance", "bi-cash-stack", "Finance"],
          ["settings", "bi-gear", "Settings"],
        ].map(([path, icon, label]) => (
        
          <NavLink key={path} to={ `/${path}`} className={linkClass}>
            <i className={ `${icon} text-lg `}></i>
            {isSidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </div>

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

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
              <i className="bi bi-chat-dots"></i>
              {isSidebarOpen && "Messages"}
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
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

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
              <i className="bi bi-plus-circle"></i>
              {isSidebarOpen && "Raise Complaint"}
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
              <i className="bi bi-journal-check"></i>
              {isSidebarOpen && "My Complaints"}
            </button>

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
              <i className="bi bi-folder2-open"></i>
              {isSidebarOpen && "Categories"}
            </button>
          </>
        )}
        {/* Visitors */}
        {location.pathname === "/visitors" && (
          <>
            {isSidebarOpen && (
              <p className="text-[15px] text-blue-300 px-2 mt-3">
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

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
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

            <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#0b2f63] w-full text-sm">
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