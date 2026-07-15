import React, { useState } from "react";
import { useTableSort } from "../../../hooks/useTableSort";
import { Pagination } from "../../../components/Pagination";

const transactions = [
    {
        date: "24 May 2025",
        description: "Maintenance Collection - Block A",
        category: "Maintenance",
        categoryColor: "bg-green-100 text-green-700",
        type: "Income",
        typeColor: "text-green-600",
        typeIcon: "bi bi-arrow-up",
        amount: "₹48,000.00",
        paymentMode: "UPI",
        status: "Completed",
    },
    {
        date: "24 May 2025",
        description: "Electricity Bill - Common Area",
        category: "Utilities",
        categoryColor: "bg-purple-100 text-purple-700",
        type: "Expense",
        typeColor: "text-red-600",
        typeIcon: "bi bi-arrow-down",
        amount: "₹28,450.00",
        paymentMode: "Bank Transfer",
        status: "Completed",
    },
    {
        date: "23 May 2025",
        description: "Water Charges Collection",
        category: "Utilities",
        categoryColor: "bg-purple-100 text-purple-700",
        type: "Income",
        typeColor: "text-green-600",
        typeIcon: "bi bi-arrow-up",
        amount: "₹12,750.00",
        paymentMode: "Cash",
        status: "Completed",
    },
    {
        date: "22 May 2025",
        description: "Security Staff Salary",
        category: "Salary",
        categoryColor: "bg-orange-100 text-orange-700",
        type: "Expense",
        typeColor: "text-red-600",
        typeIcon: "bi bi-arrow-down",
        amount: "₹65,000.00",
        paymentMode: "Bank Transfer",
        status: "Completed",
    },
    {
        date: "21 May 2025",
        description: "Club House Booking",
        category: "Amenities",
        categoryColor: "bg-blue-100 text-blue-700",
        type: "Income",
        typeColor: "text-green-600",
        typeIcon: "bi bi-arrow-up",
        amount: "₹3,000.00",
        paymentMode: "UPI",
        status: "Completed",
    },
];

export const RecentTransactions = () => {
    const { sortedData, sortKey, sortOrder, handleSort, } = useTableSort(transactions);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const SortIcon = ({ column }) => {
        if (sortKey !== column) {
            return <span className="ml-1 text-gray-300">▲▼</span>;
        }

        return sortOrder === "asc" ? (
            <span className="ml-1 text-blue-600">▲</span>
        ) : (
            <span className="ml-1 text-blue-600">▼</span>
        );
    };
    const totalItems = transactions.length;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = transactions.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
                <h2 className="text-xl font-bold text-[#1E2A5A]">
                    Recent Transactions
                </h2>

                <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50">
                    View All
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">

                    <thead>
                        <tr className="text-left text-[15px] font-semibold text-[#1E2A5A] border-b bg-slate-100">

                            <th
                                onClick={() => handleSort("date")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Date
                                    <SortIcon column="date" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("description")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Description
                                    <SortIcon column="description" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("category")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Category
                                    <SortIcon column="category" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("type")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Type
                                    <SortIcon column="type" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("amount")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Amount
                                    <SortIcon column="amount" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("paymentMode")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Payment Mode
                                    <SortIcon column="paymentMode" />
                                </div>
                            </th>

                            <th
                                onClick={() => handleSort("status")}
                                className="px-6 py-4 cursor-pointer"
                            >
                                <div className="flex items-center">
                                    Status
                                    <SortIcon column="status" />
                                </div>
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50 transition duration-200"
                            >
                                {/* Date */}
                                <td className="px-6 py-5 text-sm text-[#1E2A5A] font-medium whitespace-nowrap">
                                    {item.date}
                                </td>

                                {/* Description */}
                                <td className="px-6 py-5 text-sm text-[#1E2A5A] font-medium whitespace-nowrap">
                                    {item.description}
                                </td>

                                {/* Category */}
                                <td className="px-6 py-5">
                                    <span
                                        className={`px-3 py-1 rounded-md text-xs font-semibold ${item.categoryColor}`}
                                    >
                                        {item.category}
                                    </span>
                                </td>

                                {/* Type */}
                                <td className="px-6 py-5">
                                    <div className={`flex items-center gap-2 text-sm font-medium ${item.typeColor}`}>
                                        <i className={`${item.typeIcon} text-base`}></i>
                                        {item.type}
                                    </div>
                                </td>

                                {/* Amount */}
                                <td className="px-6 py-5 text-sm font-semibold text-[#1E2A5A] whitespace-nowrap">
                                    {item.amount}
                                </td>

                                {/* Payment Mode */}
                                <td className="px-6 py-5 text-sm text-[#1E2A5A] whitespace-nowrap">
                                    {item.paymentMode}
                                </td>

                                {/* Status */}
                                <td className="px-6 py-5">
                                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-md">
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* paginations */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};