import React, { useMemo, useState } from "react";


const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
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

 export const BookingCalendar = ({
  selectedDate,
  setSelectedDate,
  amenity
}) => {

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date()
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const totalDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const previousMonthDays = new Date(
    year,
    month,
    0
  ).getDate();

  const calendarDays = useMemo(() => {

    const days = [];

    // Previous Month

    for (let i = firstDay - 1; i >= 0; i--) {

      days.push({
        date: previousMonthDays - i,
        current: false,
      });

    }

    // Current Month

    for (let i = 1; i <= totalDays; i++) {

      const fullDate = new Date(
        year,
        month,
        i
      );

      days.push({
        date: i,
        current: true,
        fullDate,
      });

    }

    // Next Month

    let next = 1;

    while (days.length < 42) {

      days.push({
        date: next,
        current: false,
      });

      next++;

    }

    return days;

  }, [
    firstDay,
    previousMonthDays,
    totalDays,
    year,
    month,
  ]);

  const previousMonth = () => {

    setCurrentMonth(
      new Date(year, month - 1)
    );

  };

  const nextMonth = () => {

    setCurrentMonth(
      new Date(year, month + 1)
    );

  };

  const isSameDate = (d1, d2) => {

    if (!d1 || !d2) return false;

    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );

  };

  const isPast = (date) => {

    if (!date) return false;

    const compare = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return compare < current;

  };
  const isDayUnavailable = (date) => {

  if(!date) return false;

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });


  const availability = amenity?.weeklyAvailability?.find(
    (item) => item.day === day
  );
  


  return availability?.status !== "Open";

};

const isBlockedDate = (date) => {

  if(!date) return false;

  const dateString =
    `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;


  return amenity?.availabilitySettings?.blockedDates?.some(
    (item)=> item.date === dateString
  );

};



const isSpecialDate = (date)=>{

if(!date) return false;

const dateString =
`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;


return amenity?.availabilitySettings?.specialTimings?.some(
(item)=>{

if(item.dateType==="Single Date"){
return item.fromDate === dateString;
}

return (
dateString >= item.fromDate &&
dateString <= item.toDate
);

}
);

};


  const isBeyondAdvanceLimit = (date) => {
    

  if(!date) return false;

  const maxDate = new Date();

  maxDate.setDate(
    today.getDate() + Number(
  amenity?.advanceBookingDays?.split(" ")[0] || 0
)
  );





  const compareDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );


  const limitDate = new Date(
    maxDate.getFullYear(),
    maxDate.getMonth(),
    maxDate.getDate()
  );


  return compareDate > limitDate;


  

};

    return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#E2E8F0]">
        <h2 className="text-[20px] font-bold text-[#0F172A]">
          Select Booking Date
        </h2>

        <p className="text-[14px] text-[#64748B] mt-1">
          Choose your preferred booking date.
        </p>
      </div>

      <div className="p-6">
        {/* Month Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition"
          >
            <i className="bi bi-chevron-left text-[#334155]" />
          </button>

          <h3 className="text-[18px] font-semibold text-[#0F172A]">
            {monthNames[month]} {year}
          </h3>

          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] transition"
          >
            <i className="bi bi-chevron-right text-[#334155]" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-[13px] font-semibold text-[#64748B]"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((item, index) => {

         const disabled =
  !item.current ||
  isPast(item.fullDate) ||
  isBeyondAdvanceLimit(item.fullDate) ||
  isDayUnavailable(item.fullDate) ||
  isBlockedDate(item.fullDate);

            const selected = isSameDate(
              selectedDate,
              item.fullDate
            );

            const todayDate = isSameDate(
              today,
              item.fullDate
            );

            return (
              <button
                key={index}
                disabled={disabled}
                onClick={() =>
                  !disabled &&
                  setSelectedDate(item.fullDate)
                }
                className={`
                  h-11
                  rounded-xl
                  text-[14px]
                  font-medium
                  transition-all

                  ${
                    !item.current
                      ? "text-[#CBD5E1]"
                      : ""
                  }

                  ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-[#EFF6FF]"
                  }

                  ${
                    todayDate
                      ? "border border-[#2563EB]"
                      : "border border-transparent"
                  }

${
  isSpecialDate(item.fullDate)
    ? "border border-orange-400"
    : ""
}


                  ${
                    selected
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "text-[#0F172A]"
                  }
                `}
              >
                {item.date}
              </button>
            );
          })}
        </div>

   
      </div>
    </div>
  );
};

