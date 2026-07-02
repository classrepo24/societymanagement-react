import React from "react";

const StatsCards = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow p-4 flex items-start gap-4 min-h-[120px]"
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${card.bg} ${card.color}`}
          >
            <i className={card.icon}></i>
          </div>

          <div>
            <p className="text-gray-900 text-sm ">{card.title}</p>

            <h2 className="text-xl sm:text-2xl font-bold">
              {card.value ?? 0}
            </h2>

            {typeof card.growth === "number" && (
              <p className="text-xs mt-1">
                <span
                  className={
                    card.growth >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {card.growth >= 0
                    ? `+${card.growth}%`
                    : `${card.growth}%`}
                </span>

                {card.growthText && (
                  <span className="text-gray-500 ml-1">
                    {card.growthText}
                  </span>
                )}
              </p>
            )}

            {card.subtitle && (
              <p className="text-sm text-gray-500 mt-1">
                {card.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;