import React from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/Breadcrumb";
import { InvoiceHeader } from "./financeComponents/outstandingAmounts/outstandingDetails/InvoiceHeader";
import { outstandingData } from "./financeComponents/outstandingAmounts/outstandingData";
import { StatusTimeline } from "./financeComponents/outstandingAmounts/outstandingDetails/StatusTimeline";
import { AmountSummary } from "./financeComponents/outstandingAmounts/outstandingDetails/AmountSummary";
import { InvoiceDetails } from "./financeComponents/outstandingAmounts/outstandingDetails/InvoiceDetails";
import { QuickActions } from "./financeComponents/outstandingAmounts/outstandingDetails/QuickActions";
import { ResidentDetails } from "./financeComponents/outstandingAmounts/outstandingDetails/ResidentDetails";
import { Notes } from "./financeComponents/outstandingAmounts/outstandingDetails/Notes";
import { PaymentHistory } from "./financeComponents/outstandingAmounts/outstandingDetails/PaymentHistory";
import { useNavigate } from "react-router-dom";

export const OutstandingDetails = () => {
    const { invoice } = useParams();
    const navigate = useNavigate();

    console.log("URL Invoice:", invoice);

    const data = outstandingData.find(
        (item) => item.invoice === invoice
    );

    if (!data) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold text-red-600">
                    Invoice Not Found
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-6">

            <div className="flex justify-between items-start">

                <Breadcrumb
                    items={[
                        { label: "Dashboard" },
                        { label: "Finance" },
                        { label: "Outstanding Amounts" },
                        { label: data.invoice },
                    ]}
                    title="Outstanding Details"
                    subtitle="View detailed information about the outstanding invoice."
                />

                <div className="flex gap-3 mt-6">

                    <button
                        onClick={() => navigate("/finance/outstanding_amount/view_all")}
                        className="border rounded-lg px-5 py-2 bg-white hover:bg-gray-100">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                    </button>

                    <button className="border rounded-lg px-5 py-2 bg-white hover:bg-gray-100">
                        <i className="bi bi-send me-2"></i>
                        Send Reminder
                    </button>

                    <button className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700">
                        <i className="bi bi-arrow-repeat me-2"></i>
                        Record Payment
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-6">

                {/* Left Side */}
                <div className="col-span-12 xl:col-span-8 space-y-6">

                    <AmountSummary data={data} />

                    <InvoiceDetails data={data} />

                    <PaymentHistory data={data} />

                    <Notes data={data} />

                </div>

                {/* Right Side */}
                <div className="col-span-12 xl:col-span-4 space-y-6">

                    <StatusTimeline data={data} />

                    <QuickActions />

                    <ResidentDetails data={data} />

                </div>

            </div>
        </div>
    );
};