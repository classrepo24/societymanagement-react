import React from "react";

export const AdditionalOptions = ({
    attachStatement,
    setAttachStatement,
    sendTime,
    setSendTime,
    excludeRecent,
    setExcludeRecent,
    excludeDays,
    setExcludeDays,
}) => {
    return (
        <div className="bg-white">

            <h2 className="text-lg font-semibold text-[#1E2A5A] mb-6">
                5. Additional Options
            </h2>

            {/* Attach Statement */}

            <div className="flex justify-between items-center mb-6">

                <div>
                    <h4 className="font-medium text-[#1E2A5A]">
                        Attach Outstanding Statement
                    </h4>

                    <p className="text-sm text-gray-500">
                        PDF will be attached with reminder
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setAttachStatement(!attachStatement)}
                    className={`relative w-10 h-6 rounded-full transition-all duration-300
    ${attachStatement
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300
      ${attachStatement
                                ? "translate-x-4 border border-blue-500"
                                : ""
                            }`}
                    />
                </button>

            </div>

            {/* Send During */}

            <div className="mb-6">

                <label className="block font-medium text-[#1E2A5A] mb-1">
                    Send During
                </label>

                <p className="text-sm text-gray-500 mb-3">
                    Select time to send reminders
                </p>

                <select
                    value={sendTime}
                    onChange={(e) => setSendTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>02:00 PM</option>
                    <option>05:00 PM</option>
                </select>

            </div>

            {/* Exclude Members */}

            <div className="flex justify-between items-start">

                <div className="flex-1">

                    <h4 className="font-medium text-[#1E2A5A] mb-1">
                        Exclude Members Who Paid Recently
                    </h4>

                    <p className="text-sm text-gray-500 mb-3">
                        Don't send to those who paid in last
                    </p>

                    <div className="flex items-center gap-3">

                        <select
                            value={excludeDays}
                            onChange={(e) => setExcludeDays(e.target.value)}
                            className="w-24 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>1</option>
                            <option>3</option>
                            <option>5</option>
                            <option>7</option>
                            <option>15</option>
                            <option>30</option>
                        </select>

                        <span className="text-[#1E2A5A]">
                            days
                        </span>

                    </div>

                </div>

                <button
                    type="button"
                    onClick={() => setAttachStatement(!attachStatement)}
                    className={`relative w-10 h-6 rounded-full transition-all duration-300
    ${attachStatement
                            ? "bg-blue-600"
                            : "bg-gray-200"
                        }`}
                >
                    <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300
      ${attachStatement
                                ? "translate-x-4 border border-blue-500"
                                : ""
                            }`}
                    />
                </button>

            </div>

        </div>
    );
};