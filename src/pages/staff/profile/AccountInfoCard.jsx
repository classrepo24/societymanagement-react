import { useState } from "react";

const AccountInfoCard = ({ staff, isEditing, handleChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-xl border p-4 h-[315px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Account Information</h2>
      </div>

      <div className="space-y-4">

        {/* Username */}
        <div className="flex items-center ml-10 gap-3">
          <span className="min-w-[110px] text-gray-500">Username</span>

          {isEditing ? (
            <input
              value={staff.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
              className="border rounded px-2 py-1 w-52"
            />
          ) : (
            <span className="text-gray-500">
              {staff.username || "rajeshkumar"}
            </span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center ml-10 gap-3">
          <span className="min-w-[110px] text-gray-500">Email</span>

          {isEditing ? (
            <input
              type="email"
              value={staff.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border rounded px-2 py-1 w-52"
            />
          ) : (
            <span className="text-gray-500">{staff.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex items-center ml-10 gap-3">
          <span className="min-w-[110px] text-gray-500">Password</span>

          {isEditing ? (
            <div className="relative w-52">
              <input
                type={showPassword ? "text" : "password"}
                value={staff.password || ""}
                onChange={(e) => handleChange("password", e.target.value)}
                className="border rounded px-2 py-1 pr-10 w-full"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                <i
                  className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"
                    }`}
                ></i>
              </button>
            </div>
          ) : (
            <span className="text-gray-500">********</span>
          )}
        </div>
        {/* Last Login */}
        <div className="flex items-center ml-10 gap-3">
          <span className="min-w-[110px] text-gray-500">Last Login</span>

          {isEditing ? (
            <input
              value={staff.lastLogin || ""}
              onChange={(e) => handleChange("lastLogin", e.target.value)}
              className="border rounded px-2 py-1 w-52"
            />
          ) : (
            <span className="text-gray-500">
              {staff.lastLogin || "Today, 10:30 AM"}
            </span>
          )}
        </div>

        {/* Account Status */}
        <div className="flex items-center ml-10 gap-3">
          <span className="min-w-[110px] text-gray-500">Account Status</span>

          {isEditing ? (
            <select
              value={staff.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="border rounded px-2 py-1 w-52"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Blocked">Blocked</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-sm ${staff.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : staff.status === "Inactive"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {staff.status}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AccountInfoCard;