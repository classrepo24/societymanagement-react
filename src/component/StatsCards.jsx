import React from "react";

const StatsCards = ({ cards, compact = false }) => {

  return (
    <div
      className={`grid gap-4 mb-6 ${cards.length === 5
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
        }`}
    >
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white rounded-xl shadow ${compact
            ? "p-5 flex items-center gap-4 h-28"
            : "p-4 flex items-start gap-4 min-h-[120px]"
            }`}
        >
          <div
            className={`${compact ? "w-10 h-10 text-2xl" : "w-16 h-16 text-2xl"
              } shrink-0 rounded-full flex items-center justify-center ${card.bg} ${card.color}`}
          >
            <i className={card.icon}></i>
          </div>

          <div className="flex-1">
            <p
              className={`${compact
                ? "text-xs text-gray-500 font-medium"
                : "text-sm text-gray-900"
                }`}
            >
              {card.title}
            </p>

            <h2
              className={`${compact
                ? "text-1.5xl font-bold text-gray-900 mt-1"
                : "text-xl sm:text-2xl font-bold"
                }`}
            >
              {card.value ?? 0}
            </h2>

            {card.growth ? (
              <p className="text-xs font-medium mt-1 text-green-600">
                {card.growth}
                {card.subtitle && (
                  <span className="text-gray-500 ml-1">
                    {card.subtitle}
                  </span>
                )}
              </p>
            ) : (
              card.subtitle && (
                <p className="text-sm text-gray-500 mt-1">
                  {card.subtitle}
                </p>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;