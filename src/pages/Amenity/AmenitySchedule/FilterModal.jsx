import React, { useState, useEffect } from "react";

const FilterModal = ({
  open,
  onClose,
  filters,
  onApply,
}) => {
  const [filterData, setFilterData] = useState({
    status: "all",
    bookingType: "all",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    if (filters) {
      setFilterData({
        status: filters.status || "all",
        bookingType: filters.bookingType || "all",
        fromDate: filters.fromDate || "",
        toDate: filters.toDate || "",
      });
    }
  }, [filters]);

  if (!open) return null;

  const handleChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setFilterData({
      status: "all",
      bookingType: "all",
      fromDate: "",
      toDate: "",
    });
  };

  const handleApply = () => {
    onApply(filterData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-5">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b border-[#E8EDF5] px-6 py-5">

          <div>

            <h2 className="text-[22px] font-bold text-[#16216C]">
              Filter Schedule
            </h2>

            <p className="text-sm text-[#64748B] mt-1">
              Apply filters to booking schedule
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        {/* Body */}

        <div className="p-6 space-y-5">

          {/* Status */}

          <div>

            <label className="block text-sm font-medium text-[#16216C] mb-2">
              Booking Status
            </label>

            <select
              name="status"
              value={filterData.status}
              onChange={handleChange}
              className="w-full h-11 border border-[#D7DFEA] rounded-xl px-4 outline-none focus:border-[#2563EB]"
            >
              <option value="all">All</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="maintenance">Maintenance</option>
              <option value="available">Available</option>
            </select>

          </div>

          {/* Booking Type */}

          <div>

            <label className="block text-sm font-medium text-[#16216C] mb-2">
              Booking Type
            </label>

            <select
              name="bookingType"
              value={filterData.bookingType}
              onChange={handleChange}
              className="w-full h-11 border border-[#D7DFEA] rounded-xl px-4 outline-none focus:border-[#2563EB]"
            >
              <option value="all">All</option>
              <option value="personal">Personal</option>
              <option value="event">Event</option>
              <option value="maintenance">Maintenance</option>
            </select>

          </div>

          {/* Date */}

          <div className="grid grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-medium text-[#16216C] mb-2">
                From
              </label>

              <input
                type="date"
                name="fromDate"
                value={filterData.fromDate}
                onChange={handleChange}
                className="w-full h-11 border border-[#D7DFEA] rounded-xl px-4 outline-none focus:border-[#2563EB]"
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-[#16216C] mb-2">
                To
              </label>

              <input
                type="date"
                name="toDate"
                value={filterData.toDate}
                onChange={handleChange}
                className="w-full h-11 border border-[#D7DFEA] rounded-xl px-4 outline-none focus:border-[#2563EB]"
              />

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-between border-t border-[#E8EDF5] px-6 py-5">

          <button
            onClick={handleReset}
            className="px-6 h-11 rounded-xl border border-[#D7DFEA] hover:bg-gray-50"
          >
            Reset
          </button>

          <div className="flex gap-3">

            <button
              onClick={onClose}
              className="px-6 h-11 rounded-xl border border-[#D7DFEA] hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleApply}
              className="px-6 h-11 rounded-xl bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
            >
              Apply Filter
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FilterModal;