import React, { useState } from "react";
import { TransactionTypeCard } from "../../../../components/cards/TransactionTypeCard";
import { InputForm } from "../../../../components/forms/InputForm";
import {SelectForm} from "../../../../components/forms/SelectForm";
export const TransactionDetails = () => {
  const [transactionType, setTransactionType] = useState("Income");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      {/* Heading */}
      <h2 className="text-xl font-bold text-[#1E2A5A] mb-6">
        Transaction Details
      </h2>

      {/* Transaction Type */}
      <div className="mb-6">

        <label className="block text-sm font-semibold text-[#1E2A5A] mb-3">
          Transaction Type <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-2 gap-4">

          <TransactionTypeCard
            active={transactionType === "Income"}
            title="Income"
            subtitle="Record money received"
            icon="bi bi-arrow-up"
            iconBg="bg-green-100"
            iconColor="text-green-600"
            onClick={() => setTransactionType("Income")}
          />

          <TransactionTypeCard
            active={transactionType === "Expense"}
            title="Expense"
            subtitle="Record money spent"
            icon="bi bi-arrow-down"
            iconBg="bg-red-100"
            iconColor="text-red-600"
            onClick={() => setTransactionType("Expense")}
          />

        </div>

      </div>

      {/* Category */}
      <div className="mb-5">

        <SelectForm
          label="Category"
          required
          options={[
            "Maintenance",
            "Parking",
            "Water",
            "Salary",
            "Utilities",
            "Others",
          ]}
        />

      </div>

      {/* Description */}
      <div className="mb-5">

        <InputForm
          label="Description"
          required
          placeholder="Enter description"
        />

      </div>

      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-5 mb-5">

        <InputForm
          label="Amount (₹)"
          required
          placeholder="Enter amount"
          type="number"
        />

        <InputForm
          label="Date"
          required
          type="date"
        />

      </div>

      {/* Related */}
      <div className="mb-5">

        <SelectForm
          label="Related To"
          options={[
            "Block",
            "Flat",
            "Vendor",
            "Tenant",
          ]}
        />

      </div>

      {/* Tax */}
      <div className="grid grid-cols-2 gap-5 mb-5">

        <SelectForm
          label="Tax"
          options={[
            "No Tax",
            "GST 5%",
            "GST 12%",
            "GST 18%",
          ]}
        />

        <InputForm
          label="Tax Amount (₹)"
          placeholder="Enter tax amount"
          type="number"
        />

      </div>

      {/* Total */}
      <div>

        <label className="block text-sm font-semibold text-[#1E2A5A] mb-2">
          Total Amount (₹)
        </label>

        <div className="bg-gray-100 rounded-lg h-12 flex items-center px-4 text-lg font-semibold text-[#1E2A5A]">
          0.00
        </div>

        <p className="text-xs text-gray-500 mt-2">
          (Including tax)
        </p>

      </div>

    </div>
  );
};