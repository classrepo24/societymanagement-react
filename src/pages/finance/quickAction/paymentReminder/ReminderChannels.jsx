import React from "react";

export const ReminderChannels = ({ channels, setChannels }) => {
    const handleChange = (key) => {
        setChannels((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const channelList = [
        {
            key: "email",
            title: "Email",
            subtitle: "Send via email",
            icon: "bi-envelope-fill",
        },
        {
            key: "sms",
            title: "SMS",
            subtitle: "Send via SMS",
            icon: "bi-chat-dots-fill",
        },
        {
            key: "whatsapp",
            title: "WhatsApp",
            subtitle: "Send via WhatsApp",
            icon: "bi-whatsapp",
        },
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold text-[#1E2A5A] mb-6">
                3. Reminder Channels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {channelList.map((item) => (
                    <label
                        key={item.key}
                        className={`border rounded-xl px-4 py-4 cursor-pointer transition-all
              ${channels[item.key]
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                    >
                        <div className="flex items-start gap-3">

                            {/* Checkbox */}
                            <input
                                type="checkbox"
                                checked={channels[item.key]}
                                onChange={() => handleChange(item.key)}
                                className="mt-1 h-4 w-4 accent-blue-600 cursor-pointer hidden"
                            />

                            {/* Content */}
                            <div className="flex gap-3">

                                {/* Icon */}
                                <i
                                    className={`bi ${item.icon} text-blue-600 text-lg mt-0.5`}
                                ></i>

                                {/* Text */}
                                <div>
                                    <h4 className="font-semibold text-[#1E2A5A] leading-none">
                                        {item.title}
                                    </h4>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.subtitle}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </label>
                ))}
            </div>
        </div>
    );
};