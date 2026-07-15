import React, { useState } from "react";

export const InvoiceItems = ({items, setItems}) => {
    const handleAmountChange = (id, value) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        amount: Number(value),
                    }
                    : item
            )
        );
    };

    const handleTaxChange = (id, value) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        tax: Number(value),
                    }
                    : item
            )
        );
    };

    const deleteRow = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const addRow = () => {
        setItems([
            ...items,
            {
                id: Date.now(),
                item: "",
                description: "",
                category: "Maintenance",
                categoryColor: "bg-blue-100 text-blue-700",
                period: "May 2025",
                amount: 0,
                tax: 0,
            },
        ]);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            {/* Heading */}
            <h2 className="text-lg font-bold text-[#1E2A5A] mb-6">
                Invoice Items
            </h2>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b text-sm font-semibold text-[#1E2A5A] bg-slate-50">

                            <th className="text-left py-3">#</th>

                            <th className="text-left py-3">Item / Description</th>

                            <th className="text-left py-3">Category</th>

                            <th className="text-left py-3">Period / Month</th>

                            <th className="text-center py-3">
                                Amount (₹)
                            </th>

                            <th className="text-center py-3">
                                Tax (%)
                            </th>

                            <th className="text-center py-3">
                                Tax Amount (₹)
                            </th>

                            <th className="text-center py-3">
                                Total (₹)
                            </th>

                            <th className="text-center py-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {items.map((item, index) => {
                            const amount = Number(item.amount || 0);
                            const tax = Number(item.tax || 0);
                            const taxAmount = (item.amount * item.tax) / 100;
                            const total = item.amount + taxAmount;
                            return (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100"
                                >
                                    <td className="py-5 font-medium">
                                        {index + 1}
                                    </td>
                                    <td>
                                        <h4 className="font-semibold text-[#1E2A5A]">
                                            {item.item}
                                        </h4>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.description}
                                        </p>
                                    </td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded-md text-xs font-semibold ${item.categoryColor}`}
                                        >
                                            {item.category}
                                        </span>
                                    </td>
                                    <td>
                                        <select className="border rounded-lg px-3 py-2 text-sm">
                                            <option>{item.period}</option>
                                        </select>
                                    </td>
                                    <td className="text-center">
                                        <input
                                            type="number"
                                            value={item.amount}
                                            onChange={(e) =>
                                                handleAmountChange(item.id, e.target.value)
                                            }
                                            className="w-24 border rounded-lg px-2 py-2 text-center"
                                        />
                                    </td>
                                    <td className="text-center">
                                        <select
                                            value={item.tax}
                                            onChange={(e) =>
                                                handleTaxChange(item.id, e.target.value)
                                            }
                                            className="border rounded-lg px-2 py-2"
                                        >
                                            <option value={0}>0%</option>
                                            <option value={5}>5%</option>
                                            <option value={12}>12%</option>
                                            <option value={18}>18%</option>
                                            <option value={28}>28%</option>
                                        </select>
                                    </td>
                                    <td className="text-center font-medium">
                                        ₹{taxAmount.toFixed(2)}
                                    </td>
                                    <td className="text-center font-semibold text-green-600">
                                        ₹{total.toFixed(2)}
                                    </td>
                                    <td className="text-center">
                                        <button
                                            onClick={() => deleteRow(item.id)}
                                            className="w-9 h-9 rounded-lg border border-red-200 hover:bg-red-50"
                                        >
                                            <i className="bi bi-trash text-red-500"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* Add Button */}
            <button
                onClick={addRow}
                className="mt-5 border border-gray-300 rounded-lg px-5 py-2 font-medium hover:bg-gray-50"
            >

                <i className="bi bi-plus-lg me-2"></i>

                Add Item

            </button>

            {/* Bottom Section */}

            <div className="grid grid-cols-2 gap-6 mt-8">

                <div>

                    <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
                        Notes to Member (Optional)
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Add a note or message..."
                        className="w-full border rounded-xl p-3 resize-none"
                    ></textarea>

                </div>

                <div>

                    <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
                        Terms & Conditions (Optional)
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Add terms and conditions..."
                        className="w-full border rounded-xl p-3 resize-none"
                    ></textarea>

                </div>

            </div>

        </div>
    );
};