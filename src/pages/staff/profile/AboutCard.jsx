import React from "react";

const AboutCard = ({ staff, isEditing, handleChange }) => {
  return (
    <div className="bg-white rounded-xl border p-8 h-[670px]">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">About</h2>

        {isEditing && (
          <button className="text-blue-600 hover:text-blue-700">
          </button>
        )}
      </div>

      <div className="space-y-6">

        {/* Full Name */}
        <div className="flex items-center gap-12">
          <span className="w-36 shrink-0 text-gray-500">Full Name</span>

          {isEditing ? (
            <input
              type="text"
              value={staff.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700">{staff.name}</span>
          )}
        </div>

        {/* Gender */}
        <div className="flex items-center gap-12">
          <span className="w-36 shrink-0 text-gray-500">Gender</span>

          {isEditing ? (
            <select
              value={staff.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          ) : (
            <span className="text-gray-700">{staff.gender}</span>
          )}
        </div>

        {/* DOB */}
        <div className="flex items-center gap-12">
          <span className="w-36 shrink-0 text-gray-500">Date of Birth</span>

          {isEditing ? (
            <input
              type="date"
              value={staff.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700">{staff.dob}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center gap-12">
          <span className="w-36 shrink-0 text-gray-500">Phone Number</span>

          {isEditing ? (
            <input
              type="text"
              value={staff.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700">{staff.phone}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-12">
          <span className="w-36 shrink-0 text-gray-500">Email Address</span>

          {isEditing ? (
            <input
              type="email"
              value={staff.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700">{staff.email}</span>
          )}
        </div>

        {/* Address */}
        <div className="flex items-start gap-12">
          <span className="w-36 shrink-0 text-gray-500">Address</span>

          {isEditing ? (
            <textarea
              rows={4}
              value={staff.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 outline-none resize-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <span className="text-gray-700">{staff.address}</span>
          )}
        </div>

      </div>
    </div>
  );
};

export default AboutCard;