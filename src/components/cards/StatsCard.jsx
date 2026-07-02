import React from "react";

export const StatsCard = ({
    title,
    value,
    subtitle,
    icon,
    bg,
    iconColor,
}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4">
                <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center ${bg} -mt-8`}
                >
                    <i className={`${icon} ${iconColor} text-5xl`}></i>
                </div>

                <div>
                    <h3 className="text-gray-700 text-xl font-medium">
                        {title}
                    </h3>

                    <h2 className="text-5xl font-bold text-slate-900 mt-1">
                        {value}
                    </h2>

                    <p className="text-lg text-gray-500 mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};