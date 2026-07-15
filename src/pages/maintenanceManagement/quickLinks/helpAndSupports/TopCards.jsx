import React from "react";

const cards = [
  {
    id: 1,
    title: "FAQs",
    description: "Find quick answers to commonly asked questions.",
    button: "View FAQs",
    icon: "bi bi-question-circle",
    bg: "bg-blue-50",
    color: "text-blue-600",
  },
  {
    id: 2,
    title: "User Guides",
    description: "Step-by-step guides to help you use the system better.",
    button: "View Guides",
    icon: "bi bi-file-earmark-text",
    bg: "bg-green-50",
    color: "text-green-600",
  },
  {
    id: 3,
    title: "Video Tutorials",
    description: "Watch helpful videos to learn key features.",
    button: "Watch Videos",
    icon: "bi bi-play-btn",
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  {
    id: 4,
    title: "What's New",
    description: "See the latest updates and new features.",
    button: "View Updates",
    icon: "bi bi-megaphone",
    bg: "bg-purple-50",
    color: "text-purple-600",
  },
];

export const TopCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white rounded-[18px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6"
        >
          {/* Top */}
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-full ${card.bg} flex items-center justify-center flex-shrink-0`}
            >
              <i className={`${card.icon} ${card.color} text-2xl`}></i>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-[20px] font-bold text-[#1E2A5A]">
                {card.title}
              </h3>

              <p className="mt-2 text-[15px] leading-6 text-gray-600">
                {card.description}
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-5 ml-[70px] text-blue-600 font-semibold text-[15px] hover:text-blue-700 flex items-center gap-2">
            {card.button}
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      ))}
    </div>
  );
};