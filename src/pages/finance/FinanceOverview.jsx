import React, { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { IncomeExpenseChart } from "./financeComponents/IncomeExpenseChart";
import { CategoryChart } from "./financeComponents/CategoryChart";
import { QuickActions } from "./financeComponents/QuickActions";
import { TopPayers } from "./financeComponents/TopPayers";
import { OutstandingAmounts } from "./financeComponents/OutstandingAmounts";
import { RecentTransactions } from "./financeComponents/RecentTransactions";
import { TopPayersViewAll } from "./financeComponents/topPayers/TopPayersViewAll";
import { StatsCard } from "../../components/cards/StatsCard";
export const FinanceOverview = () => {
    const [showTopPayers, setShowTopPayers] = useState(false);
    const cards = [
        {
            title: "Total Balance",
            value: "₹8,42,350.00",
            subtitle: "As on 24 May 2025",
            icon: "bi bi-wallet2",
            bg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            title: "Total Income",
            value: "₹12,85,600.00",
            subtitle: "This Month",
            icon: "bi bi-arrow-up",
            bg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            title: "Total Expenses",
            value: "₹4,43,250.00",
            subtitle: "This Month",
            icon: "bi bi-arrow-down",
            bg: "bg-red-100",
            iconColor: "text-red-600",
        },
        {
            title: "Outstanding Amount",
            value: "₹2,15,750.00",
            subtitle: "From 23 Members",
            icon: "bi bi-exclamation-circle",
            bg: "bg-orange-100",
            iconColor: "text-orange-500",
        },
        {
            title: "Collection This Month",
            value: "92.45%",
            subtitle: "vs Last Month",
            extra: "▲ 8.25%",
            icon: "bi bi-percent",
            bg: "bg-purple-100",
            iconColor: "text-purple-600",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <Breadcrumb
                    items={[
                        { label: "Dashboard" },
                        { label: "Finance" },
                    ]}
                    title="Finance Overview"
                    subtitle="Track society income, expenses and manage payments"
                />

                <div className="flex gap-3 mt-10">
                    <button className="border rounded-lg px-5 py-3 hover:bg-gray-100 transition">
                        <i class="bi bi-file-earmark-arrow-up me-2"></i>
                        Upload Bank Statement
                    </button>

                    <button className="border rounded-lg px-5 py-3 hover:bg-gray-100 transition">
                        <i className="bi bi-download me-2"></i>
                        Download Report
                    </button>

                    <button className="bg-blue-600 text-white rounded-lg px-5 py-3 hover:bg-blue-700 transition">
                        <i className="bi bi-plus-lg me-2"></i>
                        Add Income / Expense
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">
                {cards.map((card, index) => (
                    <StatsCard
                        key={index}
                        title={card.title}
                        value={card.value}
                        subtitle={card.subtitle}
                        icon={card.icon}
                        bg={card.bg}
                        iconColor={card.iconColor}
                        extra={card.extra}
                    />
                ))}
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6 mt-6">

                {/* Left Side */}
                <div className="col-span-12 xl:col-span-9">

                    {/* Top */}
                    <div className="grid grid-cols-12 gap-6">

                        {/* Income Chart */}
                        <div className="col-span-12 lg:col-span-8">
                            <IncomeExpenseChart />
                        </div>

                        {/* Category Chart */}
                        <div className="col-span-12 lg:col-span-4">
                            <CategoryChart />
                        </div>

                    </div>

                    {/* Bottom */}
                    <div className="mt-6">
                        <RecentTransactions />
                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="col-span-12 xl:col-span-3 space-y-6">
                    <QuickActions />
                    <OutstandingAmounts />
                    <TopPayers onViewAll={() => setShowTopPayers(true)} />
                </div>
            </div>
        </div>
    );
};