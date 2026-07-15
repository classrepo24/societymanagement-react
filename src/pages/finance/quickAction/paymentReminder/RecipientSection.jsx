import React, { useState } from "react";

export const RecipientSection = ({
    recipientType,
    setRecipientType,
    dueType,
    setDueType,
    status,
    setStatus,
    overdueDays,
    setOverdueDays,
    filteredMembers,
    selectedMembers,
    setSelectedMembers,
    members,
}) => {
    const toggleMember = (id) => {

        if (selectedMembers.includes(id)) {

            setSelectedMembers(
                selectedMembers.filter((item) => item !== id)
            );

        } else {

            setSelectedMembers([
                ...selectedMembers,
                id,
            ]);

        }

    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-[#1E2A5A] mb-6">
                1. Select Recipients
            </h2>

            {/* Radio Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* All Members */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="recipient"
                        value="all"
                        checked={recipientType === "all"}
                        onChange={(e) => setRecipientType(e.target.value)}
                        className="mt-1"
                    />

                    <div>
                        <h4 className="font-medium text-[#1E2A5A]">
                            All Members
                        </h4>

                        <p className="text-sm text-gray-500">
                            Send to all members
                        </p>
                    </div>
                </label>

                {/* Selected Members */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="recipient"
                        value="selected"
                        checked={recipientType === "selected"}
                        onChange={(e) => setRecipientType(e.target.value)}
                        className="mt-1"
                    />

                    <div>
                        <h4 className="font-medium text-[#1E2A5A]">
                            Selected Members
                        </h4>

                        <p className="text-sm text-gray-500">
                            Choose specific members
                        </p>
                    </div>
                </label>

                {/* Filter */}
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="radio"
                        name="recipient"
                        value="filter"
                        checked={recipientType === "filter"}
                        onChange={(e) => setRecipientType(e.target.value)}
                        className="mt-1"
                    />

                    <div>
                        <h4 className="font-medium text-[#1E2A5A]">
                            Filter By
                        </h4>

                        <p className="text-sm text-gray-500">
                            Send to members based on criteria
                        </p>
                    </div>
                </label>

            </div>
            {/* Selected Members */}
            {recipientType === "selected" && (
                <div className="mt-8 border rounded-xl bg-gray-50 p-5">

                    <input
                        type="text"
                        placeholder="Search Member..."
                        className="w-full border rounded-lg px-3 py-2 mb-4"
                    />

                    <div className="space-y-3 max-h-56 overflow-y-auto">

                        {members?.map((member) => (

                            <label
                                key={member.id}
                                className="flex items-center gap-3 cursor-pointer border rounded-lg p-3 hover:bg-white"
                            >

                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(member.id)}
                                    onChange={() => toggleMember(member.id)}
                                />

                                <div>
                                    <p className="font-medium text-[#1E2A5A]">
                                        {member.name}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {member.flat}
                                    </p>
                                </div>

                            </label>

                        ))}

                    </div>

                </div>
            )}


            {/* Filter Area */}
            {recipientType === "filter" && (

                <div className="mt-8 border rounded-xl bg-gray-50 p-5">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* Due Type */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Due Type
                            </label>

                            <select
                                value={dueType}
                                onChange={(e) => setDueType(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select due type</option>
                                <option>Maintenance</option>
                                <option>Parking</option>
                                <option>Water Bill</option>
                                <option>Penalty</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option>Pending</option>
                                <option>Partially Paid</option>
                                <option>Overdue</option>
                            </select>
                        </div>

                        {/* Date Overdue */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Date Overdue
                            </label>

                            <div className="flex gap-2">

                                <select
                                    className="border rounded-lg px-3 py-2"
                                >
                                    <option>More than</option>
                                    <option>Less than</option>
                                    <option>Equal</option>
                                </select>

                                <input
                                    type="number"
                                    value={overdueDays}
                                    onChange={(e) =>
                                        setOverdueDays(e.target.value)
                                    }
                                    className="w-24 border rounded-lg px-3 py-2"
                                />

                                <span className="flex items-center text-gray-500">
                                    days
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* Add Filter */}

                    <button
                        className="mt-5 border rounded-lg px-4 py-2 hover:bg-white"
                    >
                        + Add Another Filter
                    </button>

                </div>

            )}

            {/* Estimated Members */}

            <p className="mt-5 text-sm">

                Estimated Recipients :

                <span className="text-blue-600 font-semibold">

                    {recipientType === "all"
                        ? members.length
                        : recipientType === "selected"
                            ? selectedMembers.length
                            : filteredMembers.length}

                    {" "}Members

                </span>

            </p>

        </div>
    );
};