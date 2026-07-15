import React from "react";
import { Breadcrumb } from "../../../../components/Breadcrumb";

export const OutstandingCards = ({ data }) => {
    const getTotal = (items) => {
        return items.reduce((total, item) => total + item.amount, 0);
    };

    const totalOutstanding = getTotal(data);

    const overdue = getTotal(
        data.filter((item) => item.status === "Overdue")
    );

    const dueSoon = getTotal(
        data.filter((item) => item.status === "Due Soon")
    );

    const notYetDue = getTotal(
        data.filter((item) => item.status === "Not Yet Due")
    );

    const formatCurrency = (amount) => {
        return `₹${amount.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    const cards = [
        {
            title: "Total Outstanding",
            amount: formatCurrency(totalOutstanding),
            icon: "bi-wallet2",
            bg: "bg-blue-100",
            color: "text-blue-600",
        },
        {
            title: "Overdue",
            amount: formatCurrency(overdue),
            icon: "bi-calendar-x",
            bg: "bg-red-100",
            color: "text-red-600",
        },
        {
            title: "Due Soon (0-30 Days)",
            amount: formatCurrency(dueSoon),
            icon: "bi-clock-history",
            bg: "bg-orange-100",
            color: "text-orange-600",
        },
        {
            title: "Not Yet Due (>30 Days)",
            amount: formatCurrency(notYetDue),
            icon: "bi-file-earmark-text",
            bg: "bg-green-100",
            color: "text-green-600",
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
                >

                    <div className="flex items-center gap-4">

                        <div
                            className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.bg}`}
                        >
                            <i
                                className={`bi ${card.icon} ${card.color} text-2xl`}
                            ></i>
                        </div>

                        <div>

                            <p className="text-gray-500 text-sm">
                                {card.title}
                            </p>

                            <h2 className={`text-2xl font-bold mt-1 ${card.color}`}>
                                {card.amount}
                            </h2>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
};