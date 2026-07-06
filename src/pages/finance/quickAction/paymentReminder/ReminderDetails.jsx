import React from "react";

export const ReminderDetails = ({
  reminderLevel,
  setReminderLevel,
  reminderDate,
  setReminderDate,
  subject,
  setSubject,
  message,
  setMessage,
}) => {
  return (
    <div>

      <h2 className="text-lg font-semibold text-[#1E2A5A] mb-6">
        2. Reminder Details
      </h2>

      {/* Top Fields */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Reminder Level */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Reminder Level
          </label>

          <select
            value={reminderLevel}
            onChange={(e) => setReminderLevel(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>1st Reminder</option>
            <option>2nd Reminder</option>
            <option>Final Reminder</option>
          </select>
        </div>

        {/* Reminder Date */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Reminder Date
          </label>

          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subject */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Subject
          </label>

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Payment Reminder"
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Message */}

      <div className="mt-6">

        <label className="block text-sm font-medium mb-2">
          Message
        </label>

        <div className="border rounded-xl overflow-hidden">

          {/* Toolbar */}

          <div className="flex items-center justify-between border-b bg-gray-50 px-3 py-2">

            <div className="flex gap-4 text-gray-600">

              <button type="button">
                <i className="bi bi-type-bold"></i>
              </button>

              <button type="button">
                <i className="bi bi-type-italic"></i>
              </button>

              <button type="button">
                <i className="bi bi-type-underline"></i>
              </button>

              <button type="button">
                <i className="bi bi-list-ul"></i>
              </button>

              <button type="button">
                <i className="bi bi-list-ol"></i>
              </button>

              <button type="button">
                <i className="bi bi-link-45deg"></i>
              </button>

            </div>

            {/* Insert Variable */}

            <select className="border rounded-lg px-3 py-1 text-sm">

              <option>Insert Variable</option>

              <option>{`{member_name}`}</option>

              <option>{`{flat_no}`}</option>

              <option>{`{due_amount}`}</option>

              <option>{`{due_date}`}</option>

            </select>

          </div>

          {/* Textarea */}

          <textarea
            rows={9}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-none outline-none p-4"
          />

        </div>

        {/* Character Count */}

        <div className="text-right text-xs text-gray-500 mt-2">
          {message.length}/1000 Characters
        </div>

      </div>

    </div>
  );
};