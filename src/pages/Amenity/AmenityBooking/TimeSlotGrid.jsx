import React from "react";
const TimeSlotGrid = ({
  timeSlots,
  selectedDate,
  selectedSlot,
  setSelectedSlot,
  error,
  isSpecialTiming,
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return {
          card: "border-[#BBF7D0] bg-[#F0FDF4] hover:border-[#22C55E]",
          badge: "bg-[#DCFCE7] text-[#15803D]",
          icon: "bi-check-circle-fill text-[#22C55E]",
        };

      case "booked":
        return {
          card: "border-[#FECACA] bg-[#FEF2F2] opacity-70 cursor-not-allowed",
          badge: "bg-[#FEE2E2] text-[#DC2626]",
          icon: "bi-x-circle-fill text-[#EF4444]",
        };

      case "maintenance":
        return {
          card: "border-[#CBD5E1] bg-[#F8FAFC] opacity-70 cursor-not-allowed",
          badge: "bg-[#E2E8F0] text-[#475569]",
          icon: "bi-tools text-[#64748B]",
        };

      default:
        return {
          card: "border-[#E2E8F0]",
          badge: "",
          icon: "",
        };
    }
  };
console.log(
  "TimeSlots received:",
  JSON.stringify(timeSlots, null, 2)
);
  
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">

      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E2E8F0]">

        <h2 className="text-[20px] font-bold text-[#0F172A]">
          Select Time Slot
        </h2>

        <p className="text-[14px] text-[#64748B] mt-1">
          Choose an available slot for booking.
        </p>

      </div>
      {isSpecialTiming && (
  <div className="mt-3 rounded-xl border border-purple-200 bg-purple-50 p-3">
    <div className="flex items-center gap-2">
      <i className="bi bi-stars text-purple-600"></i>

      <span className="font-semibold text-purple-700">
        Special Timing Active
      </span>
    </div>

    <p className="mt-1 text-sm text-purple-600">
      Custom timings are applied for this date.
    </p>
  </div>
)}

      <div className="p-6">

        {/* Legend */}

        <div className="flex flex-wrap gap-5 mb-6">

          <div className="flex items-center gap-2 text-[14px] text-[#334155]">
            <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
            Available
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#334155]">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
            Booked
          </div>

          <div className="flex items-center gap-2 text-[14px] text-[#334155]">
            <span className="w-3 h-3 rounded-full bg-[#94A3B8]" />
            Maintenance
          </div>

        </div>
        

        {/* Slots */}

        <div className="grid grid-cols-2 gap-4">
            
{(timeSlots || []).map((slot) => {

  const now = new Date();

  const isToday =
    selectedDate &&
    new Date(selectedDate).toDateString() === now.toDateString();

  const slotStartTime = slot.time.split(" - ")[0];

  const slotDateTime = new Date(
    `${selectedDate.toDateString()} ${slotStartTime}`
  );

  const isPastSlot = isToday && slotDateTime <= now;

  const displayStatus =
    isPastSlot ? "booked" : slot.status;

  const style =
    getStatusColor(displayStatus);

  const isSelected =
    selectedSlot?.id === slot.id;

  return (

              <button
                key={slot.id}
disabled={
  slot.status !== "available" || isPastSlot
}                onClick={() => setSelectedSlot(slot)}
                className={`
                  rounded-2xl
                  border
                  p-5
                  text-left
                  transition-all
                  duration-200

                  ${style.card}

                  ${
                    isSelected
                      ? "!border-[#2563EB] !bg-[#EFF6FF] ring-2 ring-[#BFDBFE]"
                      : ""
                  }
                `}
              >

                <div className="flex items-start justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <i className={`bi ${style.icon}`} />

                      <h4 className="text-[16px] font-semibold text-[#0F172A]">
                        {slot.time}
                      </h4>

                    </div>

                    <p className="mt-3 text-[15px] font-semibold text-[#2563EB]">
                      ₹ {slot.price}
                    </p>

                  </div>

                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-[12px]
                      font-semibold
                      capitalize
                      ${style.badge}
                    `}
                  >
                   {isPastSlot ? "Expired" : slot.status}
                  </span>

                </div>

              </button>

            );
          })}
          {error && (
  <p className="text-sm text-red-500 mt-3">
    {error}
  </p>
)}

        </div>

      </div>

    </div>
  );
};

export default TimeSlotGrid;