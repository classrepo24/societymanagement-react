import React, { useState, useEffect } from "react";

const BookingModal = ({
  open,
  onClose,
  amenity,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    resident: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    notes: "",
  });

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0");
      const day = String(
        selectedDate.getDate()
      ).padStart(2, "0");

      setFormData((prev) => ({
        ...prev,
        bookingDate: `${year}-${month}-${day}`,
      }));
    }
  }, [selectedDate]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#E8EDF5] px-6 py-5">

          <div>

            <h2 className="text-[22px] font-bold text-[#16216C]">
              New Booking
            </h2>

            <p className="text-sm text-[#64748B] mt-1">
              Create a new amenity booking
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















                      {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Resident */}
            <div>
              <label className="block text-sm font-medium text-[#16216C] mb-2">
                Resident
              </label>

              <select
                name="resident"
                value={formData.resident}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] outline-none focus:border-[#2563EB]"
              >
                <option value="">Select Resident</option>
                <option>John Smith</option>
                <option>Emma Wilson</option>
                <option>David Lee</option>
                <option>Sophia Brown</option>
              </select>
            </div>

            {/* Amenity */}
            <div>
              <label className="block text-sm font-medium text-[#16216C] mb-2">
                Amenity
              </label>

              <input
                type="text"
                value={amenity?.name || ""}
                readOnly
                className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] bg-[#F8FAFC]"
              />
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Booking Date */}
            <div>
              <label className="block text-sm font-medium text-[#16216C] mb-2">
                Booking Date
              </label>

              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-[#16216C] mb-2">
                Start Time
              </label>

              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] outline-none focus:border-[#2563EB]"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-[#16216C] mb-2">
                End Time
              </label>

              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] outline-none focus:border-[#2563EB]"
              />
            </div>

          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-medium text-[#16216C] mb-2">
              Purpose
            </label>

            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Enter booking purpose"
              className="w-full h-11 px-4 rounded-xl border border-[#D7DFEA] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[#16216C] mb-2">
              Notes
            </label>

            <textarea
              rows={4}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes..."
              className="w-full rounded-xl border border-[#D7DFEA] p-4 resize-none outline-none focus:border-[#2563EB]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#E8EDF5] px-6 py-5">

          <button
            onClick={onClose}
            className="px-6 h-11 rounded-xl border border-[#D7DFEA] hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 h-11 rounded-xl bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
          >
            Save Booking
          </button>

        </div>

      </div>

    </div>
  );
};

export default BookingModal;
        