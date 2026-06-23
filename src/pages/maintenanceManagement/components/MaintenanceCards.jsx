import React from "react";
import {FaClipboardList, FaClock, FaTools, FaCheckCircle, FaExclamationTriangle,} from "react-icons/fa";
 import { requests } from "../data/maintenanceData";
const cards = [
    {
        title: "Total Requests",
        value: requests.length,
        subtitle: "This Month",
        icon: <FaClipboardList />,
        bg: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        title: "Pending",
        value: requests.filter((item) => item.status === "Pending").length,
        subtitle: "Needs Attention",
        icon: <FaClock />,
        bg: "bg-yellow-100",
        iconColor: "text-yellow-500",
    },
    {
    title: "In Progress",
    value: requests.filter(
        (item) => item.status === "In Progress"
    ).length,
    subtitle: "Ongoing",
    icon: <FaTools />,
    bg: "bg-green-100",
    iconColor: "text-green-600",
},
{
    title: "Completed",
    value: requests.filter(
        (item) => item.status === "Completed"
    ).length,
    subtitle: "This Month",
    icon: <FaCheckCircle />,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
},
    {
        title: "Overdue",
        value: requests.filter((item) => item.status === "Overdue").length,
        subtitle: "Delayed",
        icon: <FaExclamationTriangle />,
        bg: "bg-pink-100",
        iconColor: "text-pink-500",
    },
];

const MaintenanceCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 m-8">
            {cards.map((card, index) => {
                const Icon = card.icon;

                return (
                    <div
                        key={index}
                        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-20 h-20 rounded-full flex items-center justify-center ${card.bg} -mt-8`}
                            >
                                <span className={`text-5xl ${card.iconColor}`}>
                                    {card.icon}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-gray-700 text-xl font-medium">
                                    {card.title}
                                </h3>

                                <h2 className="text-5xl font-bold text-slate-900 mt-1">
                                    {card.value}
                                </h2>

                                <p className="text-lg text-gray-500 mt-1">
                                    {card.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MaintenanceCards;