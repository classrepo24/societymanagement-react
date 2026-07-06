import React, { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { SelectMember } from "./quickAction/generateInvoice/SelectMember";
import { InvoiceDetails } from "./quickAction/generateInvoice/InvoiceDetails";
import { InvoiceType } from "./quickAction/generateInvoice/InvoiceType";
import { InvoiceItems } from "./quickAction/generateInvoice/InvoiceItems";
import { InvoiceSummary } from "./quickAction/generateInvoice/InvoiceSummary";
import { InvoiceButtons } from "./quickAction/generateInvoice/InvoiceButtons";


export const GenerateInvoice = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            item: "Monthly Maintenance",
            description: "Maintenance for May 2025",
            category: "Maintenance",
            categoryColor: "bg-blue-100 text-blue-700",
            period: "May 2025",
            amount: 5000,
            tax: 0,
        },
        {
            id: 2,
            item: "Parking Charges",
            description: "Basement Parking",
            category: "Parking",
            categoryColor: "bg-purple-100 text-purple-700",
            period: "May 2025",
            amount: 500,
            tax: 0,
        },
        {
            id: 3,
            item: "Garbage Collection",
            description: "Waste Management Charges",
            category: "Utilities",
            categoryColor: "bg-green-100 text-green-700",
            period: "May 2025",
            amount: 250,
            tax: 0,
        },
    ]);
    return (
        <div className="min-h-screen bg-[#f8fafc] p-6">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

                <Breadcrumb
                    items={[
                        { label: "Dashboard" },
                        { label: "Finance" },
                        { label: "Generate Invoice" },
                    ]}
                    title="Generate Invoice"
                    subtitle="Create and send invoice to members for maintenance and other charges"
                />

                <button
                    className="flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg bg-white text-[#1E2A5A] font-medium hover:bg-gray-50 transition shadow-sm"
                >
                    <i className="bi bi-gear"></i>
                    Invoice Settings
                </button>

            </div>
            {/* Top Section */}
            <div className="grid grid-cols-12 gap-6 mt-6">

                <div className="col-span-12 lg:col-span-4">
                    <SelectMember />
                </div>

                <div className="col-span-12 lg:col-span-5">
                    <InvoiceDetails />
                </div>

                <div className="col-span-12 lg:col-span-3">
                    <InvoiceType />
                </div>

            </div>

            {/* Bottom */}
            <div className="grid grid-cols-12 gap-6 mt-6" >

                <div className="col-span-12 lg:col-span-8">
                    <InvoiceItems
                        items={items}
                        setItems={setItems}
                    />
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <InvoiceSummary
                        items={items}
                    />
                </div>

            </div>

            <div className="mt-6">
                <InvoiceButtons />
            </div>

        </div>
    );
};