import React from "react";

export const StatusTimeline = ({ data }) => {

    const getStyle = (type) => {

        switch (type) {

            case "danger":
                return {
                    bg: "bg-red-500",
                    icon: "bi-exclamation-lg",
                };

            case "warning":
                return {
                    bg: "bg-orange-500",
                    icon: "bi-bell-fill",
                };

            default:
                return {
                    bg: "bg-blue-600",
                    icon: "bi-file-earmark-text",
                };

        }

    };

    return (

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <h3 className="text-lg font-semibold text-[#1E2A5A] mb-6">
                Status & Timeline
            </h3>

            <div className="relative">

                {data.timeline.map((item, index) => {

                    const style = getStyle(item.type);

                    return (

                        <div
                            key={index}
                            className="relative flex justify-between gap-5 pb-8 last:pb-0"
                        >

                            {/* Left */}

                            <div className="flex gap-4 flex-1">

                                {/* Timeline */}

                                <div className="relative flex flex-col items-center">

                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${style.bg}`}
                                    >
                                        <i className={`bi ${style.icon} text-sm`}></i>
                                    </div>

                                    {index !== data.timeline.length - 1 && (
                                        <div className="absolute top-8 w-[2px] h-full bg-gray-200"></div>
                                    )}

                                </div>

                                {/* Content */}

                                <div>

                                    <h4 className="font-semibold text-[#1E2A5A]">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.description}
                                    </p>

                                </div>

                            </div>

                            {/* Date */}

                            <div className="text-right whitespace-nowrap">

                                <p className="text-[#1E2A5A] text-sm font-medium">
                                    {item.date}
                                </p>

                                <p className="text-[#1E2A5A] text-sm mt-1">
                                    {item.time}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

        </div>

    );

};