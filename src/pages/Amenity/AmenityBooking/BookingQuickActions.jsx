import React from "react";

const BookingQuickActions = ({
  onConfirm,
  onReset,
  isBlocked,
}) => {
  return (
    <>
      {/* Quick Actions Card */}

      <div
        className="
        bg-white
        border border-[#E2E8F0]
        rounded-2xl
        shadow-sm
        p-5 sm:p-6
      "
      >
        <h2
          className="
          text-[20px]
          sm:text-[22px]
          font-bold
          text-[#0F172A]
          mb-6
        "
        >
          Quick Actions
        </h2>

        <div className="space-y-3">
          {/* Check Availability */}

          <button
            className="
            w-full
            flex
            items-center
            justify-between
            p-4
            rounded-xl
            border border-[#E2E8F0]
            hover:bg-[#F8FAFC]
            transition
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#EFF6FF]
                flex
                items-center
                justify-center
                "
              >
                <i className="bi bi-calendar-check text-[#2563EB] text-lg"></i>
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Check Availability
                </p>

                <p className="text-xs text-[#64748B] mt-1">
                  View amenity availability calendar
                </p>
              </div>
            </div>

            <i className="bi bi-chevron-right text-[#64748B]"></i>
          </button>

          {/* Booking History */}

          <button
            className="
            w-full
            flex
            items-center
            justify-between
            p-4
            rounded-xl
            border border-[#E2E8F0]
            hover:bg-[#F8FAFC]
            transition
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#EFF6FF]
                flex
                items-center
                justify-center
                "
              >
                <i className="bi bi-clock-history text-[#2563EB] text-lg"></i>
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Booking History
                </p>

                <p className="text-xs text-[#64748B] mt-1">
                  View past bookings of this amenity
                </p>
              </div>
            </div>

            <i className="bi bi-chevron-right text-[#64748B]"></i>
          </button>

          {/* Download Guidelines */}

          <button
            className="
            w-full
            flex
            items-center
            justify-between
            p-4
            rounded-xl
            border border-[#E2E8F0]
            hover:bg-[#F8FAFC]
            transition
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-[#EFF6FF]
                flex
                items-center
                justify-center
                "
              >
                <i className="bi bi-file-earmark-pdf text-[#2563EB] text-lg"></i>
              </div>

              <div className="text-left">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Download Guidelines
                </p>

                <p className="text-xs text-[#64748B] mt-1">
                  Download amenity rules (PDF)
                </p>
              </div>
            </div>

            <i className="bi bi-chevron-right text-[#64748B]"></i>
          </button>
        </div>
      </div>

      {/* Booking Action Buttons Card */}

      <div
        className="
        bg-white
        border border-[#E2E8F0]
        rounded-2xl
        shadow-sm
        p-5 sm:p-6
        mt-5
        "
      >
        <div
          className="
          flex
          flex-col-reverse
          sm:flex-row
          justify-end
          gap-3
          "
        >
          {/* Confirm Booking */}

          <button
       
  onClick={onConfirm}
  disabled={isBlocked}
  className={`
  w-full
  sm:w-auto
  px-6
  h-11
  rounded-xl
  text-sm
  font-semibold
  flex
  items-center
  justify-center
  gap-2
  transition
  ${
    isBlocked
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
  }
  `}
>
            <i className="bi bi-check-circle"></i>
            Confirm Booking
          </button>

          {/* Reset */}

          <button
            onClick={onReset}
            className="
            w-full
            sm:w-auto
            px-6
            h-11
            rounded-xl
            border border-[#E2E8F0]
            text-[#475569]
            text-sm
            font-semibold
            hover:bg-[#F8FAFC]
            transition
            "
          >
            <i className="bi bi-arrow-counterclockwise mr-2"></i>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingQuickActions;
