import React from "react";

export const PaymentDetails = ({
  paymentDetails,
  setPaymentDetails,
}) => {
  const options = [
    {
      key: "summary",
      title: "Include Outstanding Summary",
      subtitle: "Show total pending amount",
    },
    {
      key: "invoice",
      title: "Include Invoice Details",
      subtitle: "Show invoice-wise breakup",
    },
    {
      key: "dueDate",
      title: "Include Due Date",
      subtitle: "Show original due dates",
    },
    {
      key: "paymentLink",
      title: "Include Payment Link / Instructions",
      subtitle: "Add payment instructions or link",
    },
  ];

  const toggleOption = (key) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white">

      <h2 className="text-lg font-semibold text-[#1E2A5A] mb-6">
        4. Payment Details to Include
      </h2>

      <div className="space-y-5">

        {options.map((item) => (
          <div
            key={item.key}
            onClick={() => toggleOption(item.key)}
            className="flex items-start gap-3 cursor-pointer"
          >
            {/* Custom Checkbox */}

            <div
              className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 transition
              ${
                paymentDetails[item.key]
                  ? "bg-[#2563EB]"
                  : "border border-gray-300"
              }`}
            >
              {paymentDetails[item.key] && (
                <i className="bi bi-check text-white text-xs"></i>
              )}
            </div>

            {/* Text */}

            <div>

              <h4 className="font-medium text-[#1E2A5A]">
                {item.title}
              </h4>

              <p className="text-sm text-gray-500">
                {item.subtitle}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};