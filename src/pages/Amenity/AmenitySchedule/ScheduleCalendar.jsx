import React, { useState } from "react";

const ScheduleCalendar = ({
  selectedDate,
  setSelectedDate,
  amenity,
  bookings = []
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonthDays = new Date(year, month, 0).getDate();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
console.log("All Bookings =>", bookings);
console.log("Last Booking =>", bookings[bookings.length - 1]);
const bookedDates = bookings
  .filter((booking) => {

  
    if (booking.status === "Cancelled") {
      return false;
    }


    if (Number(booking.amenityId) !== Number(amenity?.id)) {
      return false;
    }

    const date = new Date(booking.bookingDate);

    return (
      date.getMonth() === month &&
      date.getFullYear() === year
    );
  })
  .map((booking) => {
    return new Date(booking.bookingDate).getDate();
  });;

const maintenanceDates =
  amenity?.availabilitySettings?.blockedDates?.map(
    (date)=> new Date(date).getDate()
  ) || [];


const availableDates = [];

  const hasBlueDot = (day) => bookedDates.includes(day);

  const hasGreenDot = (day) => availableDates.includes(day);

  const hasRedDot = (day) => maintenanceDates.includes(day);

  const isSelected = (day) => {
    if (!selectedDate) return day === 16;

    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const calendarDays = [];

  // Previous Month Dates
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      current: false,
    });
  }

  // Current Month Dates
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      current: true,
    });
  }

  // Next Month Dates
  while (calendarDays.length < 42) {
    calendarDays.push({
      day: calendarDays.length - (firstDay + daysInMonth) + 1,
      current: false,
    });
  }
  console.log(bookings);
    return (
    <div className="bg-white border border-[#E8EDF5] rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <button
          onClick={previousMonth}
          className="text-[#16216C] text-lg hover:text-blue-600 transition"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <h2 className="text-[18px] font-bold text-[#16216C]">
          {months[month]} {year}
        </h2>

        <button
          onClick={nextMonth}
          className="text-[#16216C] text-lg hover:text-blue-600 transition"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

      </div>

      {/* Week Names */}
      <div className="grid grid-cols-7 mb-5">

        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-[13px] font-semibold text-[#16216C]"
          >
            {day}
          </div>
        ))}

      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-y-5">

        {calendarDays.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >

            {item.current ? (
              <button
                onClick={() =>
                  setSelectedDate(
                    new Date(year, month, item.day)
                  )
                }
                className={`w-10 h-10 rounded-full text-[15px] font-semibold transition-all duration-200
                  ${
                    isSelected(item.day)
                      ? "bg-[#1D4ED8] text-white shadow-md"
                      : "text-[#16216C] hover:bg-blue-50"
                  }`}
              >
                {item.day}
              </button>
            ) : (
              <span className="w-10 h-10 flex items-center justify-center text-[15px] text-[#B8C0D9]">
                {item.day}
              </span>
            )}

            {item.current && (
              <div className="h-3 flex items-center justify-center mt-1">

                {hasBlueDot(item.day) && (
                  <span className="w-[5px] h-[5px] rounded-full bg-[#1D4ED8]"></span>
                )}

                {hasGreenDot(item.day) && (
                  <span className="w-[5px] h-[5px] rounded-full bg-[#16A34A]"></span>
                )}

                {hasRedDot(item.day) && (
                  <span className="w-[5px] h-[5px] rounded-full bg-[#EF4444]"></span>
                )}

              </div>
            )}

          </div>
        ))}

      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-8 mt-8">

        <div className="flex items-center gap-2">
          <span className="w-[7px] h-[7px] rounded-full bg-[#16A34A]"></span>
          <span className="text-[13px] font-medium text-[#16216C]">
            Available
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[7px] h-[7px] rounded-full bg-[#1D4ED8]"></span>
          <span className="text-[13px] font-medium text-[#16216C]">
            Booked
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-[7px] h-[7px] rounded-full bg-[#EF4444]"></span>
          <span className="text-[13px] font-medium text-[#16216C]">
            Maintenance
          </span>
        </div>

      </div>

    </div>
  );
};

export default ScheduleCalendar;