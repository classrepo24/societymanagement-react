import React from "react";
import { ToWords } from "to-words";

const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
        currency: false,
        ignoreDecimal: true,
        ignoreZeroCurrency: true,
    },
});

export const InvoiceSummary = ({ items = [] }) => {
    const subTotal = items.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
    );

    const totalTax = items.reduce(
        (sum, item) =>
            sum +
            (Number(item.amount || 0) * Number(item.tax || 0)) / 100,
        0
    );

    const discount = 0;

    const taxableAmount = subTotal - discount;

    const totalAmount = taxableAmount + totalTax;
    const amountInWords =
        totalAmount > 0
            ? toWords.convert(totalAmount) + " Only"
            : "Zero Rupees Only";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">

            {/* Heading */}
            <h2 className="text-[22px] font-bold text-[#1E2A5A] mb-8">
                Invoice Summary
            </h2>

            {/* Summary */}

            <div className="space-y-5 text-[15px]">

                <div className="flex justify-between items-center">
                    <span className="text-[#1E2A5A]">
                        Sub Total
                    </span>

                    <span className="font-semibold text-[#1E2A5A]">
                        ₹{subTotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-center">

                    <div className="flex items-center gap-3">

                        <span className="text-[#1E2A5A]">
                            Discount
                        </span>

                        <button className="text-blue-600 text-xs font-semibold hover:underline">
                            Add Discount
                        </button>

                    </div>

                    <span className="font-semibold text-[#1E2A5A]">
                        - ₹{discount.toFixed(2)}
                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span className="text-[#1E2A5A]">
                        Taxable Amount
                    </span>

                    <span className="font-semibold text-[#1E2A5A]">
                        ₹{taxableAmount.toFixed(2)}
                    </span>

                </div>

                <div className="flex justify-between items-center">

                    <span className="text-[#1E2A5A]">
                        Total Tax
                    </span>

                    <span className="font-semibold text-[#1E2A5A]">
                        ₹{totalTax.toFixed(2)}
                    </span>

                </div>

            </div>

            <hr className="my-6" />

            {/* Total */}

            <div className="flex justify-between items-center">

                <h3 className="text-2xl font-bold text-[#1E2A5A]">
                    Total Amount
                </h3>

                <span className="text-3xl font-bold text-[#1E2A5A]">
                    ₹{totalAmount.toFixed(2)}
                </span>

            </div>

            {/* Amount in words */}

            <div className="mt-7">

                <p className="text-sm text-[#1E2A5A] mb-2">
                    Amount in Words
                </p>

                <p className="font-semibold text-[#1E2A5A] leading-7">
                    {amountInWords}
                </p>

            </div>

            <hr className="my-7" />

            {/* Send Invoice */}

            <div>

                <label className="flex items-center gap-3 cursor-pointer">

                    <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 accent-blue-600"
                    />

                    <span className="font-medium text-[#1E2A5A]">
                        Send invoice to member via
                    </span>

                </label>

                <div className="mt-5 ml-7 space-y-4">

                    <label className="flex justify-between items-center cursor-pointer">

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                            />

                            <span>Email</span>

                        </div>

                        <span className="text-sm text-gray-500">
                            rahul.sharma@email.com
                        </span>

                    </label>

                    <label className="flex justify-between items-center cursor-pointer">

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span>SMS</span>

                        </div>

                        <span className="text-sm text-gray-500">
                            +91 98765 43210
                        </span>

                    </label>

                    <label className="flex justify-between items-center cursor-pointer">

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                defaultChecked
                            />

                            <span>WhatsApp</span>

                        </div>

                        <span className="text-sm text-gray-500">
                            +91 98765 43210
                        </span>

                    </label>

                </div>

            </div>

        </div>
    );
};