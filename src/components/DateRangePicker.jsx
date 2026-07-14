import React, { useRef } from "react";

const DateRangePicker = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  error,
}) => {
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

  const formatDate = (date) => {
    if (!date) return "Start Date";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full">

      <div className="relative flex items-center h-12 px-4 bg-white border border-[#CBD5E1] rounded-xl">

        <i className="bi bi-calendar3 text-[#64748B] mr-3"></i>

        <div className="flex items-center gap-1 flex-1">

  {!fromDate && !toDate ? (
    <button
      type="button"
      onClick={() => fromInputRef.current?.showPicker()}
      className="text-[15px] text-[#94A3B8] hover:text-[#1E40AF]"
    >
      Select Date
    </button>
  ) : (
    <>
      <button
        type="button"
        onClick={() => fromInputRef.current?.showPicker()}
        className="text-[15px] font-medium text-[#111827] hover:text-[#1E40AF]"
      >
        {fromDate ? formatDate(fromDate) : "Select"}
      </button>

      <span className="mx-2 text-[#94A3B8]">-</span>

      <button
        type="button"
        onClick={() => toInputRef.current?.showPicker()}
        className="text-[15px] font-medium text-[#111827] hover:text-[#1E40AF]"
      >
        {toDate ? formatDate(toDate) : "Date"}
      </button>
    </>
  )}

</div>

        {/* Hidden From Input */}
        <input
          ref={fromInputRef}
          type="date"
          value={fromDate}
          
          onChange={(e) => setFromDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
        />

        {/* Hidden To Input */}
        <input
          ref={toInputRef}
          type="date"
          value={toDate}
          
          onChange={(e) => setToDate(e.target.value)}
          className="absolute opacity-0 pointer-events-none"
        />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}

    </div>
  );
};

export default DateRangePicker;