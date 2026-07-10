import React from "react";

const StaffProfileCard = ({ staff, isEditing, formData, onChange, handleChange }) => {
    const data = isEditing ? (formData || {}) : (staff || {});

    return (
        <div className="bg-white rounded-xl border p-4 h-[750px]">
            {/* Avatar */}
            <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-700">
                    {data.name?.charAt(0) || "-"}
                </div>

                <span
                    className={`px-3 py-1 rounded-md text-sm mt-4 ${data.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : data.status === "Inactive"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    ● {data.status}
                </span>

                {isEditing ? (
                    <>
                        <input
                            name="name"
                            value={staff.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className="border rounded px-3 py-2 mt-3 text-center font-bold text-xl w-full"
                        />

                        <select
                            name="role"
                            value={staff.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            className="border rounded px-3 py-2 mt-2 text-gray-500 w-full"
                        >
                            <option value="">Select Designation</option>
                            <option value="Security Guard">Security Guard</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Manager">Manager</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Housekeeping Staff">Housekeeping Staff</option>
                            <option value="Electrician">Electrician</option>
                            <option value="Plumber">Plumber</option>
                        </select>
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mt-3">
                            {data.name}
                        </h2>

                        <p className="text-gray-500">
                            {data.role}
                        </p>
                    </>
                )}
            </div>

            <div className="my-6">
                <div className="space-y-4 text-sm">

                    {/* Staff ID */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-person-vcard-fill pr-2"></i>Staff ID
                        </span>

                        {isEditing ? (
                            <input
                                name="id"
                                value={staff.id}
                                onChange={(e) => handleChange("id", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span>{data.id}</span>
                        )}
                    </div>

                    {/* Department */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-buildings-fill pr-2"></i>Department
                        </span>

                        {isEditing ? (
                            <select
                                name="department"
                                value={staff.department}
                                onChange={(e) => handleChange("department", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            >
                                <option value="">Select Department</option>
                                <option value="Security">Security</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Housekeeping">Housekeeping</option>
                                <option value="Administration">Administration</option>
                                <option value="Accounts">Accounts</option>
                            </select>
                        ) : (
                            <span>{data.department}</span>
                        )}
                    </div>

                    {/* Designation */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-person-fill-gear pr-2"></i>Designation
                        </span>

                        {isEditing ? (
                            <select
                                name="role"
                                value={staff.role}
                                onChange={(e) => handleChange("role", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            >
                                <option value="">Select Designation</option>
                                <option value="Security Guard">Security Guard</option>
                                <option value="Supervisor">Supervisor</option>
                                <option value="Manager">Manager</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Housekeeping Staff">Housekeeping Staff</option>
                                <option value="Electrician">Electrician</option>
                                <option value="Plumber">Plumber</option>
                            </select>
                        ) : (
                            <span>{data.role}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-envelope pr-2"></i>Email
                        </span>

                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={staff.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span className="min-w-0 break-all">
                                {data.email}
                            </span>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-telephone pr-2"></i>Phone
                        </span>

                        {isEditing ? (
                            <input
                                name="phone"
                                value={staff.phone}
                                onChange={(e) => handleChange("phone", e.target.value)}

                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span>{data.phone}</span>
                        )}
                    </div>

                    {/* DOB */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-cake2-fill pr-2"></i>Date of Birth
                        </span>

                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                value={staff.dob}
                                onChange={(e) => handleChange("dob", e.target.value)}
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span>{data.dob}</span>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-person-standing pr-2"></i>Gender
                        </span>

                        {isEditing ? (
                            <select
                                name="gender"
                                value={staff.gender}
                                onChange={(e) => handleChange("gender", e.target.value)}

                                className="border rounded px-2 py-1 w-full"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        ) : (
                            <span>{data.gender}</span>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-geo-alt-fill pr-2"></i>Address
                        </span>

                        {isEditing ? (
                            <textarea
                                name="address"
                                value={staff.address}
                                onChange={(e) => handleChange("address", e.target.value)}

                                className="border rounded px-2 py-1 w-full"
                                rows={2}
                            />
                        ) : (
                            <span>{data.address}</span>
                        )}
                    </div>

                    {/* Joining Date */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-calendar-check pr-2"></i>Joining Date
                        </span>

                        {isEditing ? (
                            <input
                                type="date"
                                name="joiningDate"
                                value={staff.joiningDate}
                                onChange={(e) => handleChange("joiningDate", e.target.value)}

                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span>{data.joiningDate}</span>
                        )}
                    </div>

                    {/* Reporting */}
                    <div className="flex items-start gap-3">
                        <span className="text-gray-500 w-32 shrink-0">
                            <i className="bi bi-person-fill-gear pr-2"></i>Reporting to
                        </span>

                        {isEditing ? (
                            <input
                                name="reporting"
                                value={staff.reporting}
                                onChange={(e) => handleChange("reporting", e.target.value)}

                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span>{data.reporting}</span>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StaffProfileCard;