import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTableSort } from "../../../../hooks/useTableSort";

export const OutstandingTable = ({ data }) => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);
    const formatCurrency = (amount) =>
        `₹${amount.toLocaleString("en-IN")}`;
    const getStatusClass = (status) => {
        switch (status) {
            case "Overdue":
                return "bg-red-100 text-red-600";

            case "Due Soon":
                return "bg-yellow-100 text-yellow-700";

            case "Not Yet Due":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getTypeClass = (type) => {
        switch (type) {
            case "Resident":
                return "bg-blue-100 text-blue-700";

            case "Supplier":
                return "bg-purple-100 text-purple-700";

            case "Vendor":
                return "bg-orange-100 text-orange-700";

            default:
                return "bg-gray-100 text-gray-600";
        }
    };
    const { sortedData, sortKey, sortOrder, handleSort, } = useTableSort(data);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
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
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <div className="bg-white rounded-xl shadow-sm border mt-6 overflow-x-auto">
            <table className="w-full min-w-[1450px]">
                <thead className="bg-gray-50 border-b">
                    <tr className="text-sm text-gray-600">
                        <th className="px-4 py-4 text-left">#</th>
                        <th onClick={() => handleSort("type")} className="px-4 py-4 text-left">Type <SortIcon column="type" /> </th>
                        <th onClick={() => handleSort("name")} className="px-4 py-4 text-left">
                            Name / Flat
                            <SortIcon column="name" />
                        </th>
                        <th
                            onClick={() => handleSort("category")}
                            className="px-4 py-4 text-left">
                            Category
                            <SortIcon column="category" />
                        </th>
                        <th
                            onClick={() => handleSort("invoice")}
                            className="px-4 py-4 text-left">
                            Invoice No.
                            <SortIcon column="invoice" />
                        </th>
                        <th
                            onClick={() => handleSort("invoiceDate")}
                            className="px-4 py-4 text-left">
                            Invoice Date
                            <SortIcon column="invoiceDate" />
                        </th>
                        <th
                            onClick={() => handleSort("dueDate")}
                            className="px-4 py-4 text-left">
                            Due Date
                            <SortIcon column="dueDate" />
                        </th>
                        <th
                            onClick={() => handleSort("days")}
                            className="px-4 py-4 text-center">
                            Days
                            <SortIcon column="days" />
                        </th>
                        <th
                            onClick={() => handleSort("amount")}
                            className="px-4 py-4 text-right">
                            Outstanding
                            <SortIcon column="amount" />
                        </th>
                        <th
                            onClick={() => handleSort("status")}
                            className="px-4 py-4 text-center">
                            Status
                            <SortIcon column="status" />
                        </th>
                        <th className="px-4 py-4 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr
                            key={item.id}
                            className="border-b hover:bg-gray-50 transition"
                        >
                            <td className="px-4 py-4">
                                {index + 1}
                            </td>
                            <td className="px-4 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeClass(
                                        item.type
                                    )}`}
                                >
                                    {item.type}
                                </span>
                            </td>
                            <td className="px-4 py-4 font-medium text-[#1E2A5A]">
                                {item.name}
                            </td>
                            <td className="px-4 py-4">
                                {item.category}
                            </td>
                            <td className="px-4 py-4">
                                <button className="text-blue-600 hover:underline">
                                    {item.invoice}
                                </button>
                            </td>
                            <td className="px-4 py-4">
                                {item.invoiceDate}
                            </td>
                            <td className="px-4 py-4">
                                {item.dueDate}
                            </td>
                            <td className="px-4 py-4 text-center">
                                {item.days === 0 ? "-" : item.days}
                            </td>
                            <td className="px-4 py-4 text-right font-semibold text-red-600">
                                {formatCurrency(item.amount)}
                            </td>
                            <td className="px-4 py-4 text-center">

                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                                        item.status
                                    )}`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-4 py-4 text-center relative">
                                <button
                                    onClick={() =>
                                        setOpenMenu(openMenu === item.id ? null : item.id)
                                    }
                                    className="w-9 h-9 rounded-lg hover:bg-gray-100"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                                {openMenu === item.id && (
                                    <div className="absolute right-6 top-14 w-52 bg-white border rounded-xl shadow-lg z-50">
                                        <button
                                            onClick={() => navigate(`/finance/outstanding_details/${item.invoice}`)} className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-eye"></i>
                                            View Details
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-bell"></i>
                                            Send Reminder
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-cash-stack"></i>
                                            Record Payment
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-file-earmark-text-fill"></i>
                                            View Invoice
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-download"></i>
                                            Download Invoice
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100">
                                            <i className="bi bi-pencil"></i>
                                            Edit
                                        </button>
                                        <button className="flex items-center gap-3 w-full px-4 py-3 text-green-600 hover:bg-green-50">
                                            <i className="bi bi-check-circle"></i>
                                            Mark as Paid
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td
                                colSpan={11}
                                className="text-center py-10 text-gray-500"
                            >
                                No Outstanding Records Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};