import React, { useState } from "react";

export const InvoiceType = () => {
    const [type, setType] = useState("Maintenance");

    const invoiceTypes = [
        {
            id: "Maintenance",
            title: "Maintenance Invoice",
            desc: "Monthly maintenance and related charges",
        },
        {
            id: "Other",
            title: "Other Charges Invoice",
            desc: "Charges for amenities, penalties, etc.",
        },
        {
            id: "Advance",
            title: "Advance Invoice",
            desc: "Advance collection / pre-payment",
        },
        {
            id: "Custom",
            title: "Custom Invoice",
            desc: "Custom invoice with manual items",
        },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Heading */}
            <h2 className="text-lg font-bold text-[#1E2A5A] mb-4">
                Invoice Type
            </h2>

            <div className="space-y-2.5">
                {invoiceTypes.map((item) => (
                    <label
                        key={item.id}
                        className={`flex items-start gap-3 rounded-lg p-2.5 cursor-pointer transition ${type === item.id
                                ? "bg-blue-50"
                                : "hover:bg-gray-50"
                            }`}
                    >
                        <input
                            type="radio"
                            name="invoiceType"
                            checked={type === item.id}
                            onChange={() => setType(item.id)}
                            className="mt-1 accent-blue-600"
                        />

                        <div>
                            <h4 className="text-sm font-semibold text-[#1E2A5A]">
                                {item.title}
                            </h4>

                            <p className="text-xs text-gray-500 leading-4 mt-0.5">
                                {item.desc}
                            </p>
                        </div>
                    </label>
                ))}
            </div>

        </div>
    );
};