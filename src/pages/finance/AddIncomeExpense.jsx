import React from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { TransactionDetails, TranscationDetails } from "./quickAction/AddIncomeAndExpense/TranscationDetails";
import { PaymentDetails } from "./quickAction/AddIncomeAndExpense/PaymentDetails";
import { Attachment } from "./quickAction/AddIncomeAndExpense/Attachment";
import { Notes } from "./quickAction/AddIncomeAndExpense/Notes";
import { Buttons } from "./quickAction/AddIncomeAndExpense/Buttons";
export const AddIncomeExpense = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] p-6">

            {/* Breadcrumb */}
            <div className="flex justify-between items-center mb-6">

                <Breadcrumb
                    items={[
                        { label: "Dashboard" },
                        { label: "Finance" },
                        { label: "Add Income / Expense" },
                    ]}
                    title="Add Income / Expense"
                    subtitle="Record a new financial transaction"
                />

            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6 items-stretch">

                {/* Left */}
                <div className="col-span-12 lg:col-span-6">
                    <TransactionDetails />
                </div>

                {/* Right */}
                <div className="col-span-12 lg:col-span-6">
                    <div className="h-full flex flex-col gap-6">

                        <div className="flex-1">
                            <PaymentDetails />
                        </div>

                        <div className="flex-1">
                            <Attachment />
                        </div>

                        <div className="flex-1">
                            <Notes />
                        </div>

                    </div>
                </div>

            </div>
            <div className="mt-6">
                <Buttons />
            </div>

        </div>
    );
};