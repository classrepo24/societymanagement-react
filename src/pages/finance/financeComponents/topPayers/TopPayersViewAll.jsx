import React, { useState } from "react";
import { Pagination } from "../../../../components/Pagination";
import { Breadcrumb } from "../../../../components/Breadcrumb";
import { ExportButtons } from "../../../../components/exportFile/ExportButtons";
import { exportToCSV } from "../../../../components/exportFile/exportToExcel";
const members = [
    {
        id: 1,
        name: "Amit Verma",
        flat: "A-403, Green View Apartment",
        amount: 245000,
        payments: 7,
        lastPayment: "20 May 2025",
    },
    {
        id: 2,
        name: "Suresh Yadav",
        flat: "B-203, Green View Apartment",
        amount: 198600,
        payments: 6,
        lastPayment: "18 May 2025",
    },
    {
        id: 3,
        name: "Priya Sharma",
        flat: "C-302, Green View Apartment",
        amount: 175500,
        payments: 6,
        lastPayment: "15 May 2025",
    },
    {
        id: 4,
        name: "Rajesh Kumar",
        flat: "A-101, Green View Apartment",
        amount: 150000,
        payments: 5,
        lastPayment: "12 May 2025",
    },
    {
        id: 5,
        name: "Deepak Joshi",
        flat: "B-501, Green View Apartment",
        amount: 125400,
        payments: 5,
        lastPayment: "10 May 2025",
    },
    {
        id: 6,
        name: "Neha Patil",
        flat: "D-104, Green View Apartment",
        amount: 110000,
        payments: 4,
        lastPayment: "09 May 2025",
    },
    {
        id: 7,
        name: "Manoj Singh",
        flat: "A-604, Green View Apartment",
        amount: 95000,
        payments: 4,
        lastPayment: "07 May 2025",
    },
    {
        id: 8,
        name: "Ramesh Gupta",
        flat: "C-502, Green View Apartment",
        amount: 88000,
        payments: 4,
        lastPayment: "05 May 2025",
    },
    {
        id: 9,
        name: "Anjali Mehta",
        flat: "D-201, Green View Apartment",
        amount: 75000,
        payments: 3,
        lastPayment: "04 May 2025",
    },
    {
        id: 10,
        name: "Vikram Malhotra",
        flat: "B-402, Green View Apartment",
        amount: 65000,
        payments: 3,
        lastPayment: "02 May 2025",
    },
];
const exportData = members.map((member, index) => ({
    "Sr No": index + 1,
    "Resident": member.name,
    "Flat": member.flat,
    "Total Paid (₹)": member.amount,
    "Payments": member.payments,
    "Last Payment": member.lastPayment,
}));

export const TopPayersViewAll = ({ onClose }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = members.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = members.slice(
        indexOfFirstItem,
        indexOfLastItem
    );
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-start border-b">
                <Breadcrumb
                    items={[
                        { label: "Dashboard" },
                        { label: "Finance" },
                        { label: "TopPayers" },
                        { label: "ViewAll" }
                    ]}
                    title="Top Payers"
                    subtitle="These residents have made the highest payments."
                />
                <button
                onClick={() => exportToCSV(exportData, "Top_Payers")}
                 className="border px-4 py-2 rounded-lg">
                    <i className="bi bi-download me-2"></i>
                    Export
                </button>
            </div>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200 text-left text-sm font-semibold text-[#1E2A5A]">
                            <th className="py-4 px-4">#</th>
                            <th className="py-4 px-4">Resident</th>
                            <th className="py-4 px-4">Total Paid (₹)</th>
                            <th className="py-4 px-4">Payments</th>
                            <th className="py-4 px-4">Last Payment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((member, index) => (
                            <tr
                                key={member.id}
                                className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
                            >
                                <td className="py-5 px-4 font-semibold text-[#1E2A5A]">
                                    {index + 1}
                                </td>

                                <td className="py-5 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://i.pravatar.cc/45?img=${index + 10}`}
                                            alt={member.name}
                                            className="w-10 h-10 rounded-full border border-gray-200"
                                        />

                                        <div>
                                            <h4 className="font-semibold text-[#1E2A5A]">
                                                {member.name}
                                            </h4>

                                            <p className="text-xs text-gray-500">
                                                {member.flat}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="py-5 px-4 font-semibold text-[#1E2A5A]">
                                    ₹{member.amount.toLocaleString("en-IN")}.00
                                </td>

                                <td className="py-5 px-4 font-semibold text-[#1E2A5A]">
                                    {member.payments}
                                </td>

                                <td className="py-5 px-4 font-semibold text-[#1E2A5A]">
                                    {member.lastPayment}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Footer */}
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