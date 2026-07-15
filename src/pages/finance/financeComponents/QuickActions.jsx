import React from "react";

export const QuickActions = () => {
  const actions = [
    {
      title: "Add Income / Expense",
      subtitle: "Record new income",
      icon: "bi bi-plus-circle",
      iconColor: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Generate Invoice",
      subtitle: "Generate invoice for members",
      icon: "bi bi-file-earmark-text",
      iconColor: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Payment Reminder",
      subtitle: "Send payment reminder",
      icon: "bi bi-bell",
      iconColor: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      title: "Bank Reconciliation",
      subtitle: "Reconcile bank transactions",
      icon: "bi bi-bank",
      iconColor: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      {/* Heading */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Quick Actions
      </h2>

      {/* List */}
      <div className="space-y-3">
        {actions.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-start gap-4 text-left hover:bg-gray-50 rounded-xl p-2 transition"
          >
            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}
            >
              <i
                className={`${item.icon} ${item.iconColor} text-xl`}
              ></i>
            </div>

            {/* Text */}
            <div>
              <h3 className="font-semibold text-[16px] text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};