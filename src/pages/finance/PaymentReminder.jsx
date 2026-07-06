import React, { useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb";
import { RecipientSection } from "./quickAction/paymentReminder/RecipientSection";
import { ReminderDetails } from "./quickAction/paymentReminder/ReminderDetails";
import { AdditionalOptions } from "./quickAction/paymentReminder/AdditionalOptions";
import { PaymentDetails } from "./quickAction/paymentReminder/PaymentDetails";
import { PreviewCard } from "./quickAction/paymentReminder/PreviewCard";
import { ReminderChannels } from "./quickAction/paymentReminder/ReminderChannels";
import { members } from "./quickAction/paymentReminder/paymentData";

export const PaymentReminder = () => {
  const [recipientType, setRecipientType] = useState("filter");
  const [dueType, setDueType] = useState("");
  const [status, setStatus] = useState("");
  const [overdueDays, setOverdueDays] = useState(30);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const filteredMembers = members.filter((member) => {
    const due =
      !dueType || member.dueType === dueType;
    const paymentStatus =
      !status || member.status === status;
    const overdue =
      member.overdueDays >= Number(overdueDays);
    return due && paymentStatus && overdue;
  });
  const [reminderLevel, setReminderLevel] = useState("1st Reminder");
  const [reminderDate, setReminderDate] = useState("2025-05-24");
  const [subject, setSubject] = useState(
    "Payment Reminder - Pending Dues"
  );
  const [message, setMessage] = useState(`Dear {member_name},
This is a friendly reminder that you have pending dues in our records.
Please find the details below and make the payment at your earliest convenience.
Thank you for your cooperation.

---

Society Management Team`);
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    whatsapp: false,
  });
  const [paymentDetails, setPaymentDetails] = useState({
    summary: true,
    invoice: true,
    dueDate: true,
    paymentLink: true,
  });
  const [attachStatement, setAttachStatement] = useState(true);
  const [sendTime, setSendTime] = useState("10:00 AM");
  const [excludeRecent, setExcludeRecent] = useState(true);
  const [excludeDays, setExcludeDays] = useState("3");

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Dashboard" },
          { label: "Finance" },
          { label: "Payment Reminders" },
        ]}
        title="Payment Reminder"
        subtitle="Send payment reminders to members for pending dues and invoices."
      />

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

        {/* Left Section */}
        <div className="xl:col-span-2 space-y-6">

          {/* Recipient Section */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <RecipientSection
              recipientType={recipientType}
              setRecipientType={setRecipientType}
              dueType={dueType}
              setDueType={setDueType}
              status={status}
              setStatus={setStatus}
              overdueDays={overdueDays}
              setOverdueDays={setOverdueDays}
              filteredMembers={filteredMembers}
              selectedMembers={selectedMembers}
              setSelectedMembers={setSelectedMembers}
              members={members}
            />

            {/* Next Part */}
          </div>

          {/* Reminder Details */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <ReminderDetails
              reminderLevel={reminderLevel}
              setReminderLevel={setReminderLevel}
              reminderDate={reminderDate}
              setReminderDate={setReminderDate}
              subject={subject}
              setSubject={setSubject}
              message={message}
              setMessage={setMessage}
            />

            {/* Next Part */}
          </div>

          {/* Reminder Channels */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <ReminderChannels
              channels={channels}
              setChannels={setChannels}
            />
          </div>

        </div>

        {/* Right Section */}
        <div className="space-y-6">

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <PreviewCard
              subject={subject}
              message={message}
            />
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <PaymentDetails
              paymentDetails={paymentDetails}
              setPaymentDetails={setPaymentDetails}
            />
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <AdditionalOptions
              attachStatement={attachStatement}
              setAttachStatement={setAttachStatement}
              sendTime={sendTime}
              setSendTime={setSendTime}
              excludeRecent={excludeRecent}
              setExcludeRecent={setExcludeRecent}
              excludeDays={excludeDays}
              setExcludeDays={setExcludeDays}
            />
          </div>

        </div>

      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div className="flex flex-wrap gap-3">

          <button className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 py-2.5 rounded-md font-medium">
            <i className="bi bi-send"></i>
            Send Reminder
          </button>

          <button className="flex items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 rounded-md font-medium text-[#1E2A5A]">
            <i className="bi bi-calendar-event"></i>
            Schedule Reminder
          </button>

          <button className="flex items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 rounded-md font-medium text-[#1E2A5A]">
            <i className="bi bi-file-earmark-text"></i>
            Save as Draft
          </button>

        </div>

        <button className="border border-gray-300 bg-white px-8 py-2.5 rounded-md font-medium text-[#1E2A5A]">
          Cancel
        </button>

      </div>

    </div>
  );
};