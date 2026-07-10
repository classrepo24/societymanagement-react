import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const LeaveRequest = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [attachment, setAttachment] = useState(null);

    const [formData, setFormData] = useState({
        leaveType: "",
        fromDate: "",
        toDate: "",
        halfDay: false,
        session: "",
        reason: "",
        address: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    //validation
    const validate = () => {
        let newErrors = {};

        if (!formData.leaveType) {
            newErrors.leaveType = "Leave type is required.";
        }

        if (!formData.fromDate) {
            newErrors.fromDate = "From date is required.";
        }

        if (!formData.toDate) {
            newErrors.toDate = "To date is required.";
        }

        if (
            formData.fromDate &&
            formData.toDate &&
            new Date(formData.toDate) < new Date(formData.fromDate)
        ) {
            newErrors.toDate = "To Date cannot be before From Date.";
        }

        if (!formData.reason.trim()) {
            newErrors.reason = "Reason is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    //submit
    const handleSubmit = () => {
        if (validate()) {
            alert("Leave Request Submitted");
            console.log(formData);
        }
    };
    //const totalDays =
    const totalDays =
        formData.fromDate && formData.toDate
            ? formData.halfDay
                ? 0.5
                : Math.ceil(
                    (new Date(formData.toDate) - new Date(formData.fromDate)) /
                    (1000 * 60 * 60 * 24)
                ) + 1
            : "-";

    //attachments
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setAttachment(file);
        }
    };
    return (
        <div className="bg-gray-50 min-h-screen p-6">


            {/* Header */}
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-2">
                <button
                    onClick={() => navigate("/dashboard")} > Dashboard</button> /
                <button
                    onClick={() => navigate("/staff")} >Staff</button>/
       
                <span className="text-gray-900 font-bold">
                     Leave Request
                </span>
            </div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#0B1F66]">
                        Leave Request
                    </h1>
                    <p className="text-gray-500">
                        Fill in the details below to submit a leave request.
                    </p>
                </div>

                
            </div>

            <div className="grid grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="col-span-2 space-y-6">

                    {/* Employee */}
                    {/* 1. Employee Information */}

                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            1. Employee Information
                        </h2>

                        <div className="grid grid-cols-2 gap-8 items-center">

                            {/* Left */}
                            <div className="flex items-center gap-5">

                                {/* Avatar */}
                                <div className="w-20 h-20 rounded-full bg-[#E8E4FF] flex items-center justify-center">
                                    <span className="text-3xl font-bold text-[#2B36C7]">
                                        RM
                                    </span>
                                </div>

                                {/* Details */}
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-[#0B1F66]">
                                            Rahul Mehta
                                        </h3>

                                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                                            Active
                                        </span>
                                    </div>

                                    <p className="text-[#0B1F66] font-medium">
                                        Maintenance Executive
                                    </p>

                                    <p className="text-[#0B1F66] mt-3 font-medium">
                                        EMP-2024-0012
                                    </p>
                                </div>

                            </div>

                            {/* Right */}
                            <div className="border-l pl-8">

                                <div className="mb-5">
                                    <p className="text-sm text-gray-500">
                                        Department
                                    </p>

                                    <p className="font-semibold text-[#0B1F66] mt-1">
                                        Maintenance
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Reporting Manager
                                    </p>

                                    <p className="font-semibold text-[#0B1F66] mt-1">
                                        Vikram Singh
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* Leave Details */}

                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="font-semibold text-[#0B1F66] mb-5">
                            2. Leave Details
                        </h2>

                        <div className="grid grid-cols-4 gap-4">

                            <div>
                                <label className="text-sm font-medium">
                                    Leave Type<span className="text-red-500">*</span>
                                </label>

                                <select
                                    name="leaveType"
                                    value={formData.leaveType}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                >
                                    <option value="">Select Leave Type</option>
                                    <option>Casual Leave</option>
                                    <option>Sick Leave</option>
                                    <option>Paid Leave</option>
                                </select>

                                {errors.leaveType && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.leaveType}
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="text-sm font-medium">
                                    From Date<span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formData.fromDate}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />

                                {errors.fromDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.fromDate}
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="text-sm font-medium">
                                    To Date<span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="date"
                                    name="toDate"
                                    value={formData.toDate}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />

                                {errors.toDate && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.toDate}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Days
                                </label>

                                <input
                                    type="text"
                                    value={totalDays ? `${totalDays} Day${totalDays > 1 ? "s" : ""}` : ""}
                                    readOnly
                                    className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
                                    placeholder="Auto Calculated"
                                />
                            </div>

                        </div>

                        {/* Half Day */}

                        <div className="mt-6">

                            <label className="flex gap-2 items-center">

                                <input
                                    type="checkbox"
                                    name="halfDay"
                                    checked={formData.halfDay}
                                    onChange={handleChange}
                                />

                                Half Day <span className="text-sm">(Select if you are applying for a half day leave)</span>

                            </label>

                        </div>

                        {formData.halfDay && (

                            <div className="flex gap-6 mt-4">

                                <label>

                                    <input
                                        type="radio"
                                        name="session"
                                        value="First Half"
                                        onChange={handleChange}
                                    />

                                    <span className="ml-2">
                                        First Half
                                    </span>

                                </label>

                                <label>

                                    <input
                                        type="radio"
                                        name="session"
                                        value="Second Half"
                                        onChange={handleChange}
                                    />

                                    <span className="ml-2">
                                        Second Half
                                    </span>

                                </label>

                            </div>

                        )}

                        {/* Reason */}

                        <div className="mt-6">

                            <label className="text-sm font-medium">
                                Reason for Leave <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                rows={5}
                                maxLength={250}
                                className="w-full border rounded-lg p-3"
                                placeholder="Enter reason for leave"
                            />

                            {errors.reason && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.reason}
                                </p>
                            )}

                        </div>

                    </div>

                    {/* Address */}

                    <div className="bg-white rounded-xl border p-6">

                        <h2 className="font-semibold text-[#0B1F66] mb-4">
                            3. Address During Leave(optional)
                        </h2>

                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address during leave"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                </div>

                {/* RIGHT */}

                <div className="space-y-6">

                    {/* Attachment */}

                    {/* 4. Attachments (Optional) */}
                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-5">
                            4. Attachments (Optional)
                        </h2>

                        <label
                            htmlFor="attachment"
                            className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
                        >
                            <input
                                id="attachment"
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            {attachment ? (
                                attachment.type.startsWith("image/") ? (
                                    <img
                                        src={URL.createObjectURL(attachment)}
                                        alt="Attachment"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <i className="bi bi-file-earmark-pdf text-5xl text-red-500"></i>
                                        <p className="mt-3 font-medium">{attachment.name}</p>
                                    </div>
                                )
                            ) : (
                                <>
                                    <i className="bi bi-cloud-arrow-up text-5xl text-blue-600"></i>
                                    <p className="mt-3 font-semibold text-gray-700">
                                        Click to upload
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        JPG, PNG, PDF (Max 5MB)
                                    </p>
                                </>
                            )}
                        </label>

                        {attachment && (
                            <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={URL.createObjectURL(attachment)}
                                        alt="Attachment"
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />

                                    <span className="text-sm">{attachment.name}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setAttachment(null)}
                                    className="text-red-500"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Summary */}

                    {/* 5. Leave Summary */}

                    <div className="bg-white border rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-[#0B1F66] mb-6">
                            5. Leave Summary
                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between items-center">
                                <span className="text-[#0B1F66] font-medium">
                                    Leave Type
                                </span>

                                <span className="text-gray-500">
                                    {formData.leaveType || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[#0B1F66] font-medium">
                                    From Date
                                </span>

                                <span className="text-gray-500">
                                    {formData.fromDate || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[#0B1F66] font-medium">
                                    To Date
                                </span>

                                <span className="text-gray-500">
                                    {formData.toDate || "-"}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[#0B1F66] font-medium">
                                    Total Days
                                </span>

                                <span className="text-gray-500">
                                    {totalDays === "-" ? "-" : `${totalDays} Day${totalDays > 1 ? "s" : ""}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[#0B1F66] font-medium">
                                    Session
                                </span>

                                <span className="text-gray-500">
                                    {formData.session || "-"}
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* Note */}

                    <div className="bg-blue-50 rounded-xl p-5">

                        <h3 className="flex items-center gap-2 font-semibold text-[#0B1F66] mb-3">
                            <i className="bi bi-exclamation-circle  text-blue-700"></i>
                            <span>Please Note</span>
                        </h3>

                        <ul className="list-disc ml-5 text-sm space-y-2">

                            <li>Leave request requires manager approval.</li>

                            <li>Apply in advance.</li>

                            <li>You will receive notification after approval.</li>

                        </ul>

                    </div>

                </div>

            </div>

            {/* Footer */}

            <div className="flex justify-end gap-4 mt-8">

                <button onClick={()=>navigate("/staff")} className="border px-8 py-3 rounded-lg">
                    Cancel
                </button>

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                    <i className="bi bi-send"></i> Submit Request
                </button>

            </div>

        </div>
    );
};

export default LeaveRequest;