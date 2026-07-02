import React from 'react'
import {
    FiUsers,
    FiUserCheck,
    FiUserX,
    FiShield,
} from "react-icons/fi";

const stats = [
    {
        title: "Total Members",
        value: 24,
        subtitle: "All Time",
        icon: <FiUsers size={32} />,
        bg: "bg-blue-100",
        text: "text-blue-600",
    },
    {
        title: "Active Members",
        value: 18,
        subtitle: "Currently Active",
        icon: <FiUserCheck size={32} />,
        bg: "bg-green-100",
        text: "text-green-600",
    },
    {
        title: "In-Active Members",
        value: 4,
        subtitle: "Not Active",
        icon: <FiUserX size={32} />,
        bg: "bg-orange-100",
        text: "text-orange-500",
    },
    {
        title: "Committee Members",
        value: 6,
        subtitle: "In Committee",
        icon: <FiShield size={32} />,
        bg: "bg-purple-100",
        text: "text-purple-600",
    },
];

export const SocietyMembersCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-6">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-4">

                        <div
                            className={`w-20 h-20 rounded-full flex items-center justify-center -mt-8 ${item.bg} ${item.text}`}
                        >
                            {item.icon}
                        </div>

                        <div>
                            <h3 className="text-gray-700 text-xl font-medium">
                                {item.title}
                            </h3>

                            <h2 className="text-5xl font-bold text-slate-900 mt-1">
                                {item.value}
                            </h2>

                            <p className={`text-sm mt-2 ${item.text}`}>
                                {item.subtitle}
                            </p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}
