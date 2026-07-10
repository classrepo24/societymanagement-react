import React from "react";

const WorkInfoCard = ({ staff, isEditing, handleChange }) => {
  return (
    <div className="bg-white rounded-xl border p-4 h-[330px]">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Work Information</h2>
      </div>

      <div className="space-y-3">

        {/* Department */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Department</span>

          {isEditing ? (
            <select
              value={staff.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="border rounded px-2 py-1 w-44"
            >
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Administration">Administration</option>
              <option value="Accounts">Accounts</option>
            </select>
          ) : (
            <span className="text-gray-500">{staff.department}</span>
          )}
        </div>

        {/* Designation */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Designation</span>

          {isEditing ? (
            <select
              value={staff.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="border rounded px-2 py-1 w-44"
            >
              <option value="Security Guard">Security Guard</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Manager">Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="Housekeeping Staff">Housekeeping Staff</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
            </select>
          ) : (
            <span className="text-gray-500">{staff.role}</span>
          )}
        </div>

        {/* Employee ID */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Employee ID</span>

          {isEditing ? (
            <input
              value={staff.id}
              onChange={(e) => handleChange("id", e.target.value)}
              className="border rounded px-2 py-1 w-44"
            />
          ) : (
            <span className="text-gray-500">{staff.id}</span>
          )}
        </div>

        {/* Joining Date */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Joining Date</span>

          {isEditing ? (
            <input
              type="date"
              value={staff.joiningDate}
              onChange={(e) => handleChange("joiningDate", e.target.value)}
              className="border rounded px-2 py-1 w-44"
            />
          ) : (
            <span className="text-gray-500">{staff.joiningDate}</span>
          )}
        </div>

        {/* Employment Type */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Employment Type</span>

          {isEditing ? (
            <select
              value={staff.employmentType || "Full Time"}
              onChange={(e) =>
                handleChange("employmentType", e.target.value)
              }
              className="border rounded px-2 py-1 w-44"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
          ) : (
            <span className="text-gray-500">
              {staff.employmentType || "Full Time"}
            </span>
          )}
        </div>

        {/* Shift */}
        <div className="flex items-center">
          <span className="w-36 ml-10 text-gray-500">Shift</span>

          {isEditing ? (
            <select
              value={staff.shift || "Morning"}
              onChange={(e) => handleChange("shift", e.target.value)}
              className="border rounded px-2 py-1 w-44"
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
              <option value="Night">Night</option>
            </select>
          ) : (
            <span className="text-gray-500">
              {staff.shift || "Morning"}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default WorkInfoCard;