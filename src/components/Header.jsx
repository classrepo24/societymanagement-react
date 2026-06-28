// import React from "react";
// import profile from "../assets/profile.svg";

// export const Header = ({ setIsSidebarOpen }) => {
//   return (
//     <div className="h-16 bg-white flex items-center justify-between px-6 border-b border-gray-200">

//       {/* Left */}
//       <div className="flex items-center gap-5">

//         <button
//           onClick={() => setIsSidebarOpen((show) => !show)}
//           className="text-xl text-gray-700"
//         >
//           <i className="bi bi-list"></i>
//         </button>

//         <div className="relative w-[380px]">
//           <input
//             type="text"
//             placeholder="Search anything..."
//             className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 outline-none"
//           />

//           <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
//         </div>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-5">

//         <div className="relative">
//           <i className="bi bi-bell text-xl text-gray-700 cursor-pointer"></i>

//           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
//             5
//           </span>
//         </div>

//         <div className="h-8 border-l border-gray-300"></div>

//         <div className="flex items-center gap-3 cursor-pointer">
//           <img
//             src={profile}
//             alt="profile"
//             className="w-10 h-10 rounded-full border"
//           />

//           <div>
//             <h4 className="text-sm font-semibold">
//               Admin User
//             </h4>

//             <p className="text-xs text-gray-500">
//               Super Admin
//             </p>
//           </div>

//           <i className="bi bi-chevron-down text-sm"></i>
//         </div>

//       </div>
//     </div>
//   );
// };

import React from "react";
import profile from "../assets/profile.svg";

export const Header = ({ setIsSidebarOpen }) => {
  return (
    <div className="h-16 bg-white flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 shrink-0">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">

        {/* MENU BUTTON */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="text-2xl text-gray-700 hover:bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg"
        >
          <i className="bi bi-list"></i>
        </button>

        {/* SEARCH */}
        <div className="relative w-[180px] sm:w-[300px] md:w-[380px]">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-4 pr-10 outline-none focus:ring-2 focus:ring-blue-200"
          />

          <i className="bi bi-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer">
          <i className="bi bi-bell text-xl text-gray-700"></i>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </div>

        {/* DIVIDER */}
        <div className="h-6 border-l border-gray-300"></div>

        {/* PROFILE */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">

          <img
            src={profile}
            alt="profile"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border"
          />

          <div className="hidden sm:block leading-tight">
            <h4 className="text-sm font-semibold">
              Admin User
            </h4>
            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

          <i className="bi bi-chevron-down text-sm text-gray-600"></i>

        </div>

      </div>
    </div>
  );
};