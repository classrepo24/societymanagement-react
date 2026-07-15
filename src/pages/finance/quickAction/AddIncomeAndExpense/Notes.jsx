import React, { useState } from "react";

export const Notes = () => {
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      {/* Heading */}
      <h2 className="text-xl font-bold text-[#1E2A5A] mb-4">
        Notes <span className="font-normal">(Optional)</span>
      </h2>

      {/* Textarea */}
      <textarea
        rows={4}
        maxLength={500}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add any additional notes..."
        className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />

      {/* Character Counter */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">
          {notes.length}/500 characters
        </span>
      </div>

    </div>
  );
};