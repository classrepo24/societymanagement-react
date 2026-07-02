import React, { useState } from "react";

export const DateRange = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [error, setError] = useState("");

  const handleStartDateChange = (e) => {
    const value = e.target.value;

    if (endDate && value > endDate) {
      setError("Start Date cannot be greater than End Date");
    } else {
      setError("");
    }

    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;

    if (startDate && value < startDate) {
      setError("End Date cannot be earlier than Start Date");
    } else {
      setError("");
    }

    setEndDate(value);
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex items-center h-12 rounded-lg overflow-hidden border ${
          error
            ? "border-red-500"
            : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"
        }`}
      >
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className="w-1/2 h-full px-3 outline-none"
        />

        <span className="px-2 text-gray-400">—</span>

        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className="w-1/2 h-full px-3 outline-none"
        />
      </div>

      {error && (
        <p className="absolute top-14 left-0 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};