import React from "react";

export const InvoiceDetails = ({ data }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">

            <h3 className="text-lg font-semibold text-[#1E2A5A] mb-6">
                Invoice Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Side */}

                <div className="space-y-5 md:border-r md:pr-8">

                    <div className="flex justify-between items-start">

                        <span className="text-sm text-gray-600">
                            Invoice / Ref. No.
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A]">
                            {data.invoice}
                        </span>

                    </div>

                    <div className="flex justify-between items-start gap-6">

                        <span className="text-sm text-gray-600">
                            Description
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A] text-right">
                            {data.description}
                        </span>

                    </div>

                    <div className="flex justify-between items-start">

                        <span className="text-sm text-gray-600">
                            Floor / Flat
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A]">
                            {data.flat}, 1st Floor
                        </span>

                    </div>

                    <div className="flex justify-between items-start">

                        <span className="text-sm text-gray-600">
                            Invoice Type
                        </span>

                        <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                            {data.invoiceType}
                        </span>

                    </div>

                </div>

                {/* Right Side */}

                <div className="space-y-5">

                    <div className="flex justify-between items-start">

                        <span className="text-sm text-gray-600">
                            Billing Period
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A]">
                            {data.billingPeriod}
                        </span>

                    </div>

                    <div className="flex justify-between items-start">

                        <span className="text-sm text-gray-600">
                            Created By
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A]">
                            {data.createdBy}
                        </span>

                    </div>

                    <div className="flex justify-between items-start gap-6">

                        <span className="text-sm text-gray-600">
                            Created On
                        </span>

                        <span className="text-sm font-semibold text-[#1E2A5A] text-right">
                            {data.createdOn}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
};